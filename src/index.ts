import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";
import { promises } from "fs";

import projects from "./projects.json";

interface Project {
  id: number,
  name: string,
  description: string,
  technologies: string[]
};


const app = new Hono();

// Serve static files
app.use('/*', serveStatic({ root: './src/public' }));

app.get("/api/projects", (c) => {
  return c.json(projects);
})

app.post('/api/projects', async (c) => {
  console.log('POST /api/projects');
  const body = await c.req.json();


  let technologies: string[] = [];

  // Splits the technologies string into an array of strings
  if (body.technologies) {
    technologies = (body.technologies as string).split(',').map(tech => tech.trim());
  }

  let project: Project = {
    id: projects.length + 1,
    name: body.name as string,
    description: body.description as string,
    technologies: technologies as string[]
  }

  projects.push(project);
  console.log('Project added:', project);
  return c.redirect('/')
});

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})