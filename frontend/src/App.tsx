

import { useEffect, useState } from 'react';
import projectsJson from './projects.json';




// Define Project interface
interface Project {
	id: string,
	name: string,
	description: string,
	technologies: string[]
};

function Project(props: Project) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{props.name}</h2>
      <p className="text-gray-600 mb-4">{props.description}</p>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Technologies:</h3>
      <ul className="list-disc list-inside">
        {props.technologies.map(technology => (
          <li key={technology} className="text-gray-600">{technology}</li>
        ))}
      </ul>
    </div>
  );
}

interface ProjectFormProps {
  onAddProject: (project: Project) => void;
};

function ProjectForm(props: ProjectFormProps) {
  
  const [formData, setFormData] = useState({
    projectName: '',
    projectDescription: '',
    projectTechnologies: ''
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    const technologiesArray = formData.projectTechnologies
      .split(',')
      .map(tech => tech.trim())
      .filter(tech => tech !== '');

    const projectData = {
      name: formData.projectName,
      description: formData.projectDescription,
      id: crypto.randomUUID(),
      technologies: technologiesArray
    };

    
    props.onAddProject(projectData);

    // Clear the form after submission
    setFormData({
      projectName: '',
      projectDescription: '',
      projectTechnologies: ''
    });
  };

  return (
    <>
      {/* Form to add a new project */}
      <div className="xl:w-1/4">
        <form className="bg-white shadow-md rounded-lg p-6"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Add New Project</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              name="projectName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="projectName"
              value={formData.projectName}
              onChange={handleInputChange}
              type="text"
              placeholder="Project Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              name="projectDescription"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.projectDescription}
              onChange={handleInputChange}
              id="projectDescription"
              placeholder="Project Description"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="technologies">
              Technologies
            </label>
            <input
              name="projectTechnologies"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.projectTechnologies}
              onChange={handleInputChange}
              id="projectTechnologies"
              type="text"
              placeholder="Technologies (comma separated)"
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Add Project
          </button>
        </form>
      </div>
    </>
  );
}

function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);

  // Load projects from JSON file
  useEffect(() => {
    setProjects(projectsJson);
  }, []);

  const handleAddProject = (newProjectData: Project) => {
    setProjects(prevProjects => [
      ...prevProjects,
      {
        ...newProjectData
      }]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Projects</h1>
        <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <Project key={project.id} {...project} />
          ))}
        </div>
        <ProjectForm onAddProject={handleAddProject}/>
      </div>
      </div>
  );
}

function Resources() {
  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Resources</h2>
        <div className="flex space-x-4">
          <a href="get.png" className="text-blue-500 content-center hover:text-blue-700" target="__blank">Get</a>

          <a href="post.png" className="text-blue-500 content-center hover:text-blue-700" target="__blank">Post</a>

          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => alert("Contact me")}>
            Contact
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {

  return (
    <div>
      
      <ProjectList />
      <Resources />
    </div>
  )
}

export default App
