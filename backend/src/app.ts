import { Hono } from "hono";
import { cors } from "hono/cors"

import { Project, ProjectFormData } from "@shared/types";
import projects from "./projects.json";





const app = new Hono();

// cors middleware to allow cross-origin requests
app.use("/*", cors());

app.get("/", (c) => c.text("Hello, World!"));

// GET endpoint to retrieve all projects
app.get("/api/projects", (c) => c.json(projects));

// POST endpoint to add a new project
app.post('/api/projects', async (c) => {
	const body: ProjectFormData = await c.req.json();

	// Check if request body is empty
	if (!body) {
		// 400 BAD REQUEST
		c.status(400);
		return c.json({ message: 'No data provided' });
	}

	// Parse technologies string into array
	const technologies = body.technologies ? (body.technologies as string).split(',').map(tech => tech.trim()) : [];

	// Create new project object
	const project: Project = {
		id: crypto.randomUUID(),
		title: body.title as string,
		createdAt: new Date().toISOString(),
		description: body.description as string,
		technologies
	};

	// Add project to projects array
	projects.push(project);

	// Validate if project was added
	if (!projects.includes(project)) {
		// 500 INTERNAL SERVER ERROR
		c.status(500);
		return c.json({ message: 'Failed to add project' });
	}
	console.log('Project added:', project);

	// Return response
	// 201 CREATED
	c.status(201);
	return c.json({ message: 'Project added successfully', project: project });
});


export default app;