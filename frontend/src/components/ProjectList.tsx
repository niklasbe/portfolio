
import { useState, useEffect } from 'react';
import { Project } from '../types';
import ProjectBox from './ProjectBox';
import ProjectForm from './ProjectListForm';



type ProjectListProps = {
    projectList: Project[];
};


const ProjectList = ({ projectList }: ProjectListProps) => {
    const [projects, setProjects] = useState<Project[]>([]);

    // Load projects from JSON file

    useEffect(() => {
        setProjects(projectList);
    }, [projectList]);

    const handleAddProject = (newProjectData: Project) => {
        setProjects(prevProjects => [
            ...prevProjects,
            {
                ...newProjectData
            }]
        );
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