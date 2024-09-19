import { Hono } from "hono";
import { cors } from "hono/cors"

import { Project } from "@shared/types";
import projects from "./projects.json";


const app = new Hono();

// cors middleware to allow cross-origin requests
app.use("/*", cors());

app.get("/", (c) => c.text("Hello, World!"));

// GET endpoint to retrieve all projects
app.get("/api/projects", (c) => c.json(projects));

// POST endpoint to add a new project
app.post('/api/projects', async (c) => {
	const body = await c.req.json();

	// Parse technologies string into array
	const technologies = body.technologies ? (body.technologies as string).split(',').map(tech => tech.trim()) : [];

	// Create new project object
	const project: Project = {
		id: crypto.randomUUID(),
		title: body.name as string,
		createdAt: new Date().toISOString(),
		description: body.description as string,
		technologies
	};

	projects.push(project);
	console.log('Project added:', project);



	// Return response
	// 201 CREATED
	c.status(201);
	// TODO: Add error handling
	return c.json({ message: 'Project added successfully', project: body });
});


export default app;