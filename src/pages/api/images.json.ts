import type { APIRoute } from "astro";
import { folder } from "@utils";
import fs from "fs";
import path from "path";

export const GET: APIRoute = async () => {
  const folderPath = folder;
  try {
    const files = fs.readdirSync(folderPath);
    const imageFiles = files.filter((file: string) => {
      const extname = path.extname(file).toLowerCase();
      return (
        extname === ".jpg" ||
        extname === ".jpeg" ||
        extname === ".png" ||
        extname === ".gif" ||
        extname === ".bmp"
      );
    });

    const responseData = {
      message: "List of image files:",
      files: imageFiles.map((file: string) => {
        const filePath = path.join(folderPath, file);
        const data = fs.readFileSync(filePath);
        const base64Data = Buffer.from(data).toString("base64");
        return {
          filename: file,
          data: base64Data,
        };
      }),
    };

    return new Response(JSON.stringify(responseData));
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
