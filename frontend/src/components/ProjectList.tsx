
import { useState, useEffect } from 'react';
import ProjectBox from './ProjectBox';
import ProjectForm from './ProjectListForm';

import { Project } from "@shared/types";
import { ProjectFormData } from './ProjectListForm';




const ProjectList = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/projects')
            .then(res => res.json())
            .then(data => {
                setProjects(data);
            });
    }, []);

    const handleAddProject = (newProjectData: ProjectFormData) => {
        // Send a POST request to the server
        fetch('http://localhost:3000/api/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProjectData)
        })
            .then(res => {
                // Check if the response is successful
                if (!res.ok) {
                    throw new Error('Failed to add project');
                }
                return res.json();
            })
            .then(data => {
                setProjects(prevProjects => [
                    ...prevProjects,
                    data.project
                ]);
            });
    }
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-50 mb-8">My Projects</h1>
            <div className="flex flex-col xl:flex-row gap-6">
                <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map(project => (
                        <ProjectBox key={project.id} {...project} />
                    ))}
                </div>
                {
                    <ProjectForm onAddProject={handleAddProject} />
                }
            </div>
        </div>
    )
};



export default ProjectList;