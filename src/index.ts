import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";

import projects from "./projects.json";

// Define Project interface
interface Project {
  id: number,
  name: string,
  description: string,
  technologies: string[]
};

const app = new Hono();

// Serve static files from './src/public'
app.use('/*', serveStatic({ root: './src/public' }));

// GET endpoint to retrieve all projects
app.get("/api/projects", (c) => c.json(projects));

// POST endpoint to add a new project
app.post('/api/projects', async (c) => {
  const body = await c.req.json();

  // Parse technologies string into array
  const technologies = body.technologies ? (body.technologies as string).split(',').map(tech => tech.trim()) : [];

  // Create new project object
  const project: Project = {
    id: projects.length + 1,
    name: body.name as string,
    description: body.description as string,
    technologies
  };

  projects.push(project);
  console.log('Project added:', project);
  
  // Return response
  // TODO: Add error handling
  return c.json({message: 'Project added successfully', project: body});
});

// Start server
const port = 3000;
console.log(`Server is running on port ${port}`);
serve({
  fetch: app.fetch,
  port
});