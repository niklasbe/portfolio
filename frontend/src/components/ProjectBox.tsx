import { Project } from '../types';

function ProjectBox(props: Project) {
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


export default ProjectBox;