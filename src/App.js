import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer'
import Home from'./components/pages/Home'
import About from'./components/pages/About'
import NotFound from'./components/pages/NotFound'
import { GithubProvider } from './context/github/GithubContext'
import { AlertProvider } from './context/alert/AlertContext'
import Alert from './components/layout/AlertMessage'

function App() {
  return (
    <GithubProvider>
      <AlertProvider>
        <Router>
          <div className='flex flex-col justify-between h-screen'>
              <NavBar/>

              <main className='container mx-auto px-3 pb-12'>
                <Alert />
                <Routes>
                  <Route path='/' element={<Home />}/>
                  <Route path='/about' element={<About />}/>
                  <Route path='/notfound' element={<NotFound />}/>
                  <Route path='/*' element={<NotFound />}/>
                </Routes>
              </main>

              <Footer/>
          </div>
        </Router>
      </AlertProvider>
    </GithubProvider>
  )
}

export default App
