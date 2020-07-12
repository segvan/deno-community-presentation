import { serve } from "https://deno.land/std/http/server.ts";

const s = serve({ port: 8000 });
console.log("HTTP server is running on port 8000.");

for await (const req of s) {
  const path = getPath(req);

  try {
    req.respond({
      body: await listDir(path),
    });
  } catch (exc) {
    req.respond({
      body: exc.message,
      status: 400,
    });
  }
}

function getPath(req: any) {
  const qs = req.url.substring(req.url.indexOf("?"), req.url.length);
  const query = new URLSearchParams(qs);
  const path = query.get("path");

  return path;
}

async function listDir(path: string | null): Promise<string> {
  var result: string = "";

  path = path ? path : Deno.cwd();

  result += `\n     Directory: ${path}\n`;

  for await (const item of Deno.readDir(path)) {
    if (item.isDirectory) {
      result += `* ${item.name}\n`;
    } else if (item.isFile) {
      result += `- ${item.name}\n`;
    }
  }

  return result;
}
