import path from "path";


const dir = path.join(import.meta.dir, "templates/dist");

const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);
    let filepath = url.pathname === "/" ? "index.html" : url.pathname.slice(1);
    const absolute = path.join(dir, filepath);
    try {
      const file = await Bun.file(absolute);
      if (await file.exists()) {
        return new Response(file);
      }
      return new Response("We couldn't find the file you were expecting.", { status: 404 });
    } catch (e) {
      return new Response("shit an error occured: " + e, { status: 500 });
    }
  },
});

console.log(`Listening on http://localhost:${server.port} ...`);