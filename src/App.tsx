import { Outlet } from 'react-router'
import { Navbar } from './pages/home/Navbar'

function App() {

  return (
    <div>
      <Navbar/>
      <Outlet/>
      
     
    </div>
  )
}

export default App
