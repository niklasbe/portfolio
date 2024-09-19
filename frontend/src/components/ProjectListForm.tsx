
import React, { useState } from 'react';
import { Project } from '../types';

type ProjectFormProps = {
    onAddProject: (project: Project) => void;
};

function ProjectForm({ onAddProject }: ProjectFormProps) {

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

        // Split the technologies string into an array
        const technologiesArray = formData.projectTechnologies
            .split(',')
            .map(tech => tech.trim())
            .filter(tech => tech !== '');

        // Create a new project object
        const projectData: Project = {
            title: formData.projectName,
            description: formData.projectDescription,
            createdAt: new Date().toISOString(),
            id: crypto.randomUUID(),
            technologies: technologiesArray
        };

        // Call the onAddProject function from the parent component
        onAddProject(projectData);

        // Clear the form after submission
        setFormData({
            projectName: '',
            projectDescription: '',
            projectTechnologies: ''
        });

        console.log('Project added:', projectData);
    };

    return (
        <>
            {/* Form to add a new project */}
            <div className="xl:w-1/4">
                <form className="bg-zinc-800 shadow-md rounded-lg p-6" onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold text-gray-50 mb-4">Add New Project</h2>
                    <div className="mb-4">
                        <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="projectName">
                            Name
                        </label>
                        <input
                            name="projectName"
                            className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 bg-zinc-700 text-gray-200 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                            id="projectName"
                            value={formData.projectName}
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Project Name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="projectDescription">
                            Description
                        </label>
                        <textarea
                            name="projectDescription"
                            className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 bg-zinc-700 text-gray-200 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                            value={formData.projectDescription}
                            onChange={handleInputChange}
                            id="projectDescription"
                            placeholder="Project Description"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="projectTechnologies">
                            Technologies
                        </label>
                        <input
                            name="projectTechnologies"
                            className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 bg-zinc-700 text-gray-200 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                            value={formData.projectTechnologies}
                            onChange={handleInputChange}
                            id="projectTechnologies"
                            type="text"
                            placeholder="Technologies (comma separated)"
                            required
                        />
                    </div>
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Add Project
                    </button>
                </form>
            </div>
        </>
    );
}

export default ProjectForm;