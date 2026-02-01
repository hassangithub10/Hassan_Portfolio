"use client";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    Legend
} from "recharts";

/**
 * GA4 Real-time Traffic Component
 */
export function RealTimeChart({ data }: { data: any[] }) {
    if (!data || data.length === 0) {
        return (
            <div className="h-64 flex items-center justify-center text-white/20 text-sm italic">
                No real-time data available
            </div>
        );
    }

    return (
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#B0FC51" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#B0FC51" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis
                        dataKey="minute"
                        stroke="#ffffff40"
                        fontSize={10}
                        tickFormatter={(val) => val.split(' ')[0]}
                    />
                    <YAxis stroke="#ffffff40" fontSize={10} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #ffffff10', borderRadius: '8px' }}
                        itemStyle={{ color: '#B0FC51' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="users"
                        stroke="#B0FC51"
                        fillOpacity={1}
                        fill="url(#colorUsers)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

/**
 * GSC Performance Component
 */
export function PerformanceChart({ data }: { data: any[] }) {
    if (!data || data.length === 0) {
        return (
            <div className="h-64 flex items-center justify-center text-white/20 text-sm italic">
                No search performance data available
            </div>
        );
    }

    return (
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <XAxis
                        dataKey="date"
                        stroke="#ffffff40"
                        fontSize={10}
                        tickFormatter={(val) => new Date(val).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                    />
                    <YAxis yAxisId="left" stroke="#ffffff40" fontSize={10} />
                    <YAxis yAxisId="right" orientation="right" stroke="#ffffff40" fontSize={10} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #ffffff10', borderRadius: '8px' }}
                    />
                    <Legend />
                    <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="clicks"
                        stroke="#B0FC51"
                        strokeWidth={2}
                        dot={false}
                    />
                    <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="impressions"
                        stroke="#60a5fa"
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
