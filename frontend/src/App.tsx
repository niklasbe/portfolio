import ProjectList from './components/ProjectList';
import ResourceBox from './components/ResourceBox';
import projectsJson from './projects.json';



function App() {
	const email = "email here";

	return (
		<div>

			<ProjectList projectList={projectsJson} />
			<ResourceBox email={email} />
		</div>
	)
}

export default App
