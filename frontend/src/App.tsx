import ProjectList from './components/ProjectList';
import ResourceBox from './components/ResourceBox';



function App() {
	const email = "email here";

	return (
		<div className='bg-zinc-900 h-screen'>

			<ProjectList />
			<ResourceBox email={email} />
		</div>
	)
}

export default App
