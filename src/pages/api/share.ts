import type { APIRoute } from "astro";
import { shareFile } from "@utils";
import fs from "fs";

export const GET: APIRoute = async ({ request }) => {
  const fileName = new URL(request.url).searchParams.get("fileName");

  if (!fileName) {
    return new Response("File name is required", { status: 400 });
  }

  const id =
    Date.now().toString(36) + Math.random().toString(36).substring(2, 8);

  try {
    const data = JSON.parse(fs.readFileSync(shareFile, "utf8"));
    data[id] = fileName;

    fs.writeFileSync(shareFile, JSON.stringify(data, null, 2));

    return new Response(JSON.stringify(id), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(`File '${fileName}' not found`, { status: 404 });
  }
};
