
import app from "./app";

import { serve } from "@hono/node-server";

import { port } from "./config";

console.log(`Server is running on port ${port}`);
serve({
	fetch: app.fetch,
	port
});