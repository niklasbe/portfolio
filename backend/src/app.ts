import { Hono } from "hono";
import { cors } from "hono/cors"

import { Project, ProjectFormData } from "@shared/types";

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

// GET endpoint to retrieve a project by ID
app.get("/api/projects/:id", (c) => {
	const id: string = c.req.param('id');

	// Fetch the project from the database
	const projectRow = db.prepare('SELECT * FROM projects WHERE id = ?').get(id);

	// Check if the project exists
	if (!projectRow) {
		// 404 NOT FOUND
		c.status(404);
		return c.json({ message: 'Project not found' });
	}

	// Parse the database values into a Project object
	const project: Project = {
		...projectRow,
		technologies: JSON.parse(projectRow.technologies),
		public: Boolean(projectRow.public)
	};

	// 200 OK
	c.status(200);
	return c.json(project);
});

// DELETE endpoint to delete a project by ID
app.delete("/api/projects/:id", (c) => {
	const id: string = c.req.param('id');

	// Delete the project from the database
	const info = db.prepare('DELETE FROM projects WHERE id = ?').run(id);

	if (info.changes === 0) {
		// 404 NOT FOUND
		c.status(404);
		return c.json({ message: 'Project not found' });
	}

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

	const technologiesString = JSON.stringify(body.technologies.split(','));

	const project: Project = {
		id: crypto.randomUUID(),
		title: body.title,
		createdAt: new Date().toISOString(),
		description: body.description,
		technologies: JSON.parse(technologiesString),
		publishedAt: new Date().toISOString(),
		public: false,
		status: 'draft'
	};

	console.log('New project:', project);


	const info = db.prepare('INSERT INTO projects (id, title, createdAt, description, technologies, publishedAt, public, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)').run(
		project.id,
		project.title,
		project.createdAt,
		project.description,
		technologiesString,
		project.publishedAt,
		project.public ? 1 : 0,
		project.status
	);

	if (info.changes === 0) {
		// 500 INTERNAL SERVER ERROR
		c.status(500);
		return c.json({ message: 'Failed to add project' });
	}

	// Return response
	// 201 CREATED
	c.status(201);
	return c.json({ message: 'Project added successfully', project });
});


export default app;