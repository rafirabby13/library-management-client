import { Outlet, useLocation } from 'react-router'
import { Navbar } from './pages/home/Navbar'
import AllBooks from './pages/AllBooks'
import { Footer } from './components/Footer'

function App() {

  const location = useLocation()


  return (
    <div >
      <div className='mb-10'>
        <Navbar />
      </div>
      <div className='max-w-[85%] mx-auto'>
        {
          location.pathname == '/' && <AllBooks />

        }
      </div>
      <div className='max-w-[85%] mx-auto min-h-screen'>
        <Outlet />
      </div>

      <div className='mt-20'>
        <Footer />
      </div>


    </div>
  )
}

export default App
