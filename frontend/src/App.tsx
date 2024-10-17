import ProjectList from './components/ProjectList';
import ResourceBox from './components/ResourceBox';
import Header from './components/Header';

const student = {
	name: "Firstname Lastname",
	degree: "Bachelor IT",
	points: 180,
	email: "email@here",
	experiences: [
		{
			title: "Experience 1",
		},
		{
			title: "Experience 2",
		},
		{
			title: "Experience 3",
		},
	],
};

function App() {
	return (
		<div className='min-h-screen'>
			<Header {...student} />
			<ProjectList />
			<ResourceBox />
		</div>
	)
}

export default App
