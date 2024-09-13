

import { useState, type FormEvent } from 'react';
import projects from './projects.json';


// Define Project interface
interface Project {
	id: number,
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

function NewProjectForm() {
  
  const addFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const projectData = Object.fromEntries(formData);
    console.log(formData.get("name"));
    /*const name = form.name;
    const description = form.description.value;
    const technologies = form.technologies.value.split(",").map((technology: string) => technology.trim());
    */
    console.log(JSON.stringify(projectData));
  };

  return (
    <>
      {/* Form to add a new project */}
      <div className="xl:w-1/4">
        <form className="bg-white shadow-md rounded-lg p-6"
          onSubmit={addFormSubmit}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Add New Project</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              name="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Project Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              name="description"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              placeholder="Project Description"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="technologies">
              Technologies
            </label>
            <input
              name="technologies"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="technologies"
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
  return (
    <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Projects</h1>
        <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <Project key={project.id} {...project} />
          ))}
        </div>
        <NewProjectForm />
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
