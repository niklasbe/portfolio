import ProjectList from './components/ProjectList';
import ResourceBox from './components/ResourceBox';
import projectsJson from './projects.json';

function App() {

  return (
    <div>

      <ProjectList projectList={projectsJson} />
      <ResourceBox />
    </div>
  )
}

export default App
