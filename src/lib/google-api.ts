"use server";

import { google } from 'googleapis';
import { db } from '@/db';
import { eq, sql, inArray } from 'drizzle-orm';
import { siteSettings } from '@/db/schema';
/**
 * Simple cache for settings to avoid redundant queries in same execution
 */
let settingsCache: Record<string, string> = {};

/**
 * Helper to get multiple setting values from the database in one query
 */
async function getSettings(keys: string[]): Promise<Record<string, string>> {
    // Check cache first
    const missingKeys = keys.filter(k => !settingsCache[k]);

    if (missingKeys.length > 0) {
        // Use inArray for cleaner and working query with Drizzle
        const res = await db.select()
            .from(siteSettings)
            .where(inArray(siteSettings.settingKey, missingKeys));

        res.forEach(s => {
            settingsCache[s.settingKey] = s.settingValue || "";
        });
    }

    const result: Record<string, string> = {};
    keys.forEach(k => {
        result[k] = settingsCache[k] || "";
    });
    return result;
}

async function getSetting(key: string): Promise<string | null> {
    if (settingsCache[key]) return settingsCache[key];
    const res = await db.select().from(siteSettings).where(eq(siteSettings.settingKey, key)).limit(1);
    const val = res[0]?.settingValue || null;
    if (val) settingsCache[key] = val;
    return val;
}

/**
 * Initialize Google Auth Client using Service Account
 */
async function getGoogleAuth() {
    const settings = await getSettings([
        'google_service_account_email',
        'google_service_account_key'
    ]);

    const email = settings.google_service_account_email;
    const key = settings.google_service_account_key;

    if (!email || !key) {
        return null;
    }

    // Standardize key formatting (replace escaped newlines if they exist)
    const formattedKey = key.replace(/\\n/g, '\n');

    return new google.auth.JWT({
        email,
        key: formattedKey,
        scopes: [
            'https://www.googleapis.com/auth/analytics.readonly',
            'https://www.googleapis.com/auth/webmasters.readonly'
        ]
    });
}

/**
 * Fetch GA4 Real-time Data
 */
export async function getGA4RealTimeData() {
    const propertyId = await getSetting('google_ga4_property_id');
    const auth = await getGoogleAuth();

    if (!auth || !propertyId) return null;

    try {
        const analyticsdata = google.analyticsdata({ version: 'v1beta', auth });
        const res = await analyticsdata.properties.runRealtimeReport({
            property: `properties/${propertyId}`,
            requestBody: {
                metrics: [{ name: 'activeUsers' }],
                dimensions: [{ name: 'minutesAgo' }],
            }
        });

        // Format for Recharts
        const data = res.data.rows?.map(row => ({
            minute: `${row.dimensionValues?.[0].value} min ago`,
            users: parseInt(row.metricValues?.[0].value || '0')
        })) || [];

        return data.reverse(); // Show chronological 
    } catch (error) {
        console.error("GA4 Error:", error);
        return null;
    }
}

/**
 * Fetch GSC Performance Data
 */
export async function getGSCPerformanceData(days = 7) {
    const auth = await getGoogleAuth();
    const siteUrl = await getSetting('google_gsc_site_url');

    if (!auth || !siteUrl) return null;

    try {
        const searchconsole = google.searchconsole({ version: 'v1', auth });

        const endDate = new Date().toISOString().split('T')[0];
        const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

        const res = await searchconsole.searchanalytics.query({
            siteUrl,
            requestBody: {
                startDate,
                endDate,
                dimensions: ['date'],
                rowLimit: 100
            }
        });

        return res.data.rows?.map(row => ({
            date: row.keys?.[0],
            clicks: row.clicks,
            impressions: row.impressions,
            position: row.position
        })) || [];

    } catch (error) {
        console.error("GSC Error:", error);
        return null;
    }
}

/**
 * Fetch Page KPIs (Views and Clicks)
 */
export async function getPageKPIs(pathPrefix: string) {
    const settings = await getSettings([
        'google_ga4_property_id',
        'google_gsc_site_url'
    ]);
    const propertyId = settings.google_ga4_property_id;
    const siteUrl = settings.google_gsc_site_url;
    const auth = await getGoogleAuth();

    if (!auth || !propertyId || !siteUrl) return null;

    try {
        const analyticsdata = google.analyticsdata({ version: 'v1beta', auth });
        const searchconsole = google.searchconsole({ version: 'v1', auth });

        const endDate = 'today';
        const startDate = '30daysAgo';

        // 1. Get GA4 Page Views
        const gaRes = await analyticsdata.properties.runReport({
            property: `properties/${propertyId}`,
            requestBody: {
                dateRanges: [{ startDate, endDate }],
                dimensions: [{ name: 'pagePath' }],
                metrics: [{ name: 'screenPageViews' }],
                dimensionFilter: {
                    filter: {
                        fieldName: 'pagePath',
                        stringFilter: { matchType: 'BEGINS_WITH', value: pathPrefix }
                    }
                }
            }
        });

        const gaData = gaRes.data.rows?.reduce((acc: any, row) => {
            acc[row.dimensionValues?.[0].value || ''] = parseInt(row.metricValues?.[0].value || '0');
            return acc;
        }, {}) || {};

        return gaData;
    } catch (error) {
        console.error("KPI Error:", error);
        return null;
    }
}
