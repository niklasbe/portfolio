import ProjectList from './components/ProjectList';
import ResourceBox from './components/ResourceBox';
import projectsJson from './projects.json';



function App() {
	const email = "email here";

	return (
		<div className='bg-zinc-900 h-screen'>

			<ProjectList projectList={projectsJson} />
			<ResourceBox email={email} />
		</div>
	)
}

export default App
