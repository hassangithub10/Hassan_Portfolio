import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";
import sharp from "sharp";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;
        const type = formData.get("type") as string || "general";

        if (!file) {
            return NextResponse.json({ error: "No file received." }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const newFilename = `${filename}-${uniqueSuffix}.webp`;

        // Organize by Year/Month
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const relativeDir = `/uploads/${year}/${month}`;
        const uploadDir = path.join(process.cwd(), "public", relativeDir);

        await mkdir(uploadDir, { recursive: true });

        // Sharp processing
        let imagePipeline = sharp(buffer);

        if (type === "project") {
            // Enforce 2.18:1 aspect ratio. 
            // We'll resize to a standard width (e.g. 1200px) and calculate height, 
            // or we can crop. Let's resize/crop to cover.
            // 1200 / 2.18 ~= 550
            imagePipeline = imagePipeline.resize(1200, 550, {
                fit: 'cover',
                position: 'center'
            });
        } else if (type === "blog") {
            // Standardize blog entries too if needed, but maybe just limit width
            imagePipeline = imagePipeline.resize(1200, null, {
                withoutEnlargement: true
            });
        }

        // Convert to WebP
        imagePipeline = imagePipeline.webp({ quality: 80 });

        const finalPath = path.join(uploadDir, newFilename);
        await imagePipeline.toFile(finalPath);

        const fileUrl = `${relativeDir}/${newFilename}`;

        return NextResponse.json({
            success: true,
            url: fileUrl,
            message: "File uploaded successfully"
        });

    } catch (error) {
        console.error("Upload Error:", error);
        return NextResponse.json({ error: "Failed to upload file." }, { status: 500 });
    }
}
