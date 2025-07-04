import { Outlet, useLocation} from 'react-router'
import { Navbar } from './pages/home/Navbar'
import AllBooks from './pages/AllBooks'

function App() {

  const location = useLocation()


  return (
    <div className='space-y-10'>
      <Navbar />
      <div className='max-w-[85%] mx-auto'>
        {
          location.pathname == '/' && <AllBooks />

        }
      </div>
      <div className='max-w-[85%] mx-auto'>
        <Outlet />
      </div>


    </div>
  )
}

export default App
