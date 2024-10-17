
import { useState, useEffect } from 'react';
import ProjectBox from './ProjectBox';
import ProjectForm from './ProjectListForm';

import { Project, ApiResponsePOST } from "@shared/types";
import { ProjectFormData } from './ProjectListForm';


const ProjectFlexbox = ({ projects, onDelete }: { projects: Project[], onDelete: (id: string) => void }) => {
    if (projects.length === 0) {
        return <p className="flex-grow text-lg text-gray-50">No projects found</p>;
    }

    return (
        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
                <ProjectBox key={project.id} project={project} onDelete={onDelete} />
            ))}
        </div>

    )
};

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

    const onDelete = async (id: string) => {
        // DELETE request to the server
        try {
            const response = await fetch(`http://localhost:3000/api/projects/${id}`, {
                method: 'DELETE'
            });

            const data = await response.json();

            // If the response is not OK, show an alert with the error message
            if (!response.ok) {
                alert(data.message);
                throw new Error(data.message);
            }
            // If the response is OK, remove the project from the state
            setProjects(prevProjects => prevProjects.filter(project => project.id !== id));
            console.log(data);

        } catch (error) {
            console.error(error);
        }
    };

    const handlePOSTRequest = async (newProjectData: ProjectFormData) => {
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
        <div className="container mx-auto px-4 py-12 rounded-lg shadow-lg ">
            <h1 className="text-3xl font-bold text-gray-50 mb-8">My Projects</h1>
            <div className="flex flex-col xl:flex-row gap-6">
                <ProjectFlexbox projects={projects} onDelete={onDelete} />

                <ProjectForm onAddProject={handlePOSTRequest} />

            </div>
        </div>
    )
};



export default ProjectList;