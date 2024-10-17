import { Hono } from "hono";
import { cors } from "hono/cors"

import { Project, ProjectFormData } from "@shared/types";
import projects from "./projects.json";

import { databaseFile } from "./config";

const Database = require('better-sqlite3');
const db = new Database(databaseFile, { verbose: console.log });


const app = new Hono();

// cors middleware to allow cross-origin requests
app.use("/*", cors());

app.get("/", (c) => c.text("Hello, World!"));

// GET endpoint to retrieve all projects
app.get("/api/projects", (c) => {
	// Fetch all projects from the database
	// The technologies are stored as a JSON string in the database, so we need to parse them
	// and return them as an array in the response.
	const projects: Project[] = db.prepare('SELECT * FROM projects').all().map((row: any) => ({
		...row,
		technologies: JSON.parse(row.technologies),
		public: Boolean(row.public)
	}));

	return c.json(projects);
});

// DELETE endpoint to delete a project by ID
app.delete("/api/projects/:id", (c) => {
	const id: string = c.req.param('id');
	const index = projects.findIndex(project => project.id === id);

	if (index === -1) {
		// 404 NOT FOUND
		c.status(404);
		return c.json({ message: 'Project not found' });
	}

	projects.splice(index, 1);

	// 200 OK
	c.status(200);
	return c.json({ message: 'Project deleted successfully' });
});

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
		technologies: technologies,
		public: false,
		status: 'draft'
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