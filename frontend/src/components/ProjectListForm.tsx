
import React, { useState } from 'react';
import { Project } from '../types';

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
                <form className="bg-white shadow-md rounded-lg p-6" onSubmit={handleSubmit}>
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
                            required
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
                            required
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
                            required
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

export default ProjectForm;