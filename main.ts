import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";

const app = new Hono();

app.get("/*", async (c) => {
    const url = c.req.path.substring(1, c.req.path.length);
    const headers = c.req.headers;

    const sendHeaders = new Headers(headers)
    // mask
    sendHeaders.delete("x-real-ip")
    sendHeaders.delete("x-forwarded-for")

    const resp = await fetch(url, sendHeaders as any);

    return resp;
});

Deno.serve(app.fetch);
