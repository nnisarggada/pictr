import type { APIRoute } from "astro";
import { folder } from "@utils";
import fs from "fs";
import path from "path";
import ExifParser from "exif-parser";

export const GET: APIRoute = async ({ request }) => {
  const fileName = new URL(request.url).searchParams.get("fileName");

  if (!fileName) {
    return new Response("File name is required", { status: 400 });
  }

  const filePath = path.join(folder, fileName);

  try {
    const fileData = fs.readFileSync(filePath);
    const base64Data = Buffer.from(fileData).toString("base64");
    const parser = ExifParser.create(fileData);
    parser.enableBinaryFields(true);
    parser.enableTagNames(true);
    parser.enableImageSize(true);
    parser.enableReturnTags(true);

    const result = parser.parse();

    const file = {
      filename: fileName,
      data: base64Data,
      tags: result.tags,
    };

    return new Response(JSON.stringify(file), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(`File '${fileName}' not found`, { status: 404 });
  }
};
