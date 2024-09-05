import { Hono } from 'hono';
import { serveStatic } from 'hono/serve-static';
import projects from './projects.json';


interface Project {
  id: number;
  name: string;
  description: string;
  technologies: string[];
}

let tmpProjects: Project[] = []; 


// Hono setup
const app = new Hono();
function renderPage(projects: Project[]) {
  const projectsCard = projects.map(project => `
    <div class="project-item">
      ${project.name} - ${project.description} - <i>Technologies: ${project.technologies}</i>
    </div>
  `).join('');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Projects Dashboard</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f0f0f0;
            }
            header {
                background-color: #d0d0d0;
                padding: 20px;
            }
            h1 {
                margin: 0;
            }
            .container {
                display: flex;
                padding: 20px;
                gap: 20px;
            }
            .projects-list {
                flex: 2;
                background-color: #ffffff;
                border: 2px solid #999;
                padding: 20px;
            }
            .project-item {
                background-color: #e0e0e0;
                border: 1px solid #999;
                padding: 10px;
                margin-bottom: 10px;
            }
            .add-project-form {
                flex: 1;
                background-color: #ffffff;
                border: 2px solid #999;
                padding: 20px;
            }
            form {
                display: flex;
                flex-direction: column;
            }
            label, input, textarea {
                margin-bottom: 10px;
            }
            button {
                background-color: #4CAF50;
                color: white;
                border: none;
                padding: 10px;
                cursor: pointer;
            }
        </style>
    </head>
    <body>
        <header>
            <h1>Projects Dashboard</h1>
        </header>
        <div class="container">
            <div class="projects-list">
                <h2>Projects List</h2>
                <div id="projects-container">
                    ${projectsCard}
                </div>
            </div>
            <div class="add-project-form">
                <h2>Add New Project</h2>
                <form id="add-project-form" method="POST" action="/api/projects">
                    <label for="project-name">Project Name:</label>
                    <input type="text" id="project-name" name="name" required>
                    
                    <label for="project-description">Description:</label>
                    <textarea id="project-description" name="description" required></textarea>
                    
                    <label for="technologies">Due Date:</label>
                    <input type="text" id="project-technologies" 
                        placeholder="Separate technologies by comma (e.g. Node, Java)"
                        name="technologies" required>
                    
                    <button type="submit">Add Project</button>
                </form>
            </div>
        </div>
    </body>
    </html>
  `
}

app.get('/', (c) => {
  return c.html(renderPage(projects))
});


app.get('/api/projects', (c) => {
  return c.json(projects);
});

app.post('/api/projects', async (c) => {
  const body = await c.req.parseBody();
  let technologies: string[] = [];
  // split body.technologies by comma
  if (body.technologies) {
    technologies = (body.technologies as string).split(',').map(tech => tech.trim());
  }
  
  projects.push({
    id: projects.length + 1,
    name: body.name as string,
    description: body.description as string,
    technologies: technologies as string[]
  })
  return c.redirect('/')
});

export default app;