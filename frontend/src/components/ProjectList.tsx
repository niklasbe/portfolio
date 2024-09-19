
import { useState, useEffect } from 'react';
import ProjectBox from './ProjectBox';
import ProjectForm from './ProjectListForm';

import { Project, ApiResponsePOST } from "@shared/types";
import { ProjectFormData } from './ProjectListForm';




const ProjectList = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    // Fetch all projects from the server
    useEffect(() => {
        fetch('http://localhost:3000/api/projects')
            .then(res => res.json())
            .then(data => {
                setProjects(data);
            });
    }, []);

    const handleFetch = async (newProjectData: ProjectFormData) => {
        try {
            const response = await fetch('http://localhost:3000/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProjectData)
            });

            const data: ApiResponsePOST = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            console.log(data);


            setProjects(prevProjects => [
                ...prevProjects,
                data.project
            ]);

        } catch (error) {
            console.error(error);
        }
    };
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
                    <ProjectForm onAddProject={handleFetch} />
                }
            </div>
        </div>
    )
};



export default ProjectList;