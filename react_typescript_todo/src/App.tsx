import AddToDO from './components/AddToDO'
import NavBar from './components/NavBar'
import Todos from './components/Todos'
import "./App.css"

const App = () => {
  return (
    <main>
      <h1>TODO REACT + TYPESCRIPT</h1>
      <NavBar/>
      <AddToDO />
      <Todos/>
    </main>
  )
}

export default App