
import React, { useState } from 'react';

export type ProjectFormData = {
    title: string;
    description: string;
    technologies: string;
};

type ProjectFormProps = {
    onAddProject: (project: ProjectFormData) => void;
};

function ProjectForm({ onAddProject }: ProjectFormProps) {

    const [formData, setFormData] = useState<ProjectFormData>({
        title: '',
        description: '',
        technologies: ''
    });


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Create a new project object
        const projectData: ProjectFormData = {
            title: formData.title,
            description: formData?.description,
            technologies: formData?.technologies
        };

        // Call the onAddProject function from the parent component
        onAddProject(projectData);

        // Clear the form after submission
        setFormData({
            title: '',
            description: '',
            technologies: ''
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
                        <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="form-title">
                            Name
                        </label>
                        <input
                            name="title"
                            className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 bg-zinc-700 text-gray-200 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                            id="form-title"
                            value={formData.title}
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Project Name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="form-description">
                            Description
                        </label>
                        <textarea
                            name="description"
                            className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 bg-zinc-700 text-gray-200 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                            value={formData.description}
                            onChange={handleInputChange}
                            id="form-description"
                            placeholder="Project Description"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="form-technologies">
                            Technologies
                        </label>
                        <input
                            name="technologies"
                            className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 bg-zinc-700 text-gray-200 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                            value={formData.technologies}
                            onChange={handleInputChange}
                            id="form-technologies"
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