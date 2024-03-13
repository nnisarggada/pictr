import type { APIRoute } from "astro";
import { folder, shareFile } from "@utils";
import fs from "fs";
import path from "path";

export const GET: APIRoute = async ({ params }) => {
  const id = params.id;
  const data = JSON.parse(fs.readFileSync(shareFile, "utf8"));

  if (!id || data[id] === undefined) {
    return new Response(null, { status: 302, headers: { Location: "/404" } });
  }

  const fileName = data[id];

  try {
    const data = JSON.parse(fs.readFileSync(shareFile, "utf8"));
    const fileName = data[id];

    if (!fileName) {
      return new Response("File not found", { status: 404 });
    }

    const filePath = path.join(folder, fileName);

    const fileStream = fs.createReadStream(filePath);
    const headers = {
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Content-Type": "application/octet-stream",
    };

    // @ts-ignore
    return new Response(fileStream, { headers });
  } catch (error) {
    console.error(error);
    return new Response(`File '${fileName}' not found`, { status: 404 });
  }
};
