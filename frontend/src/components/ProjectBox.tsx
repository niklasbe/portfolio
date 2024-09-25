import { Project } from "@shared/types";

type ProjectBoxProps = {
    project: Project;
    onDelete: (id: string) => void;
};

function ProjectBox({ project, onDelete }: ProjectBoxProps) {

    const handleOnDelete = () => {
        onDelete(project.id);
    }

    return (
        <div className="bg-zinc-800 shadow-lg rounded-lg p-6 mb-6">

            <div className="flex justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-50 mb-2">{project.title}</h2>
                <button
                    className="ml-4 w-6 h-6 min-w-6 bg-red-500 hover:bg-red-600 text-white rounded-full focus:outline-none focus:ring-2
                     focus:ring-red-500 focus:ring-opacity-50 transition-colors"
                    onClick={handleOnDelete}>
                </button>
            </div>
            <p className="text-gray-200 mb-4">{project.description}</p>
            <h3 className="text-lg font-semibold text-gray-200 mb-2">Technologies:</h3>
            <ul className="list-disc list-inside">
                {project.technologies.map(technology => (
                    <li key={technology} className="text-gray-200">{technology}</li>
                ))}
            </ul>
        </div>
    );
}


export default ProjectBox;