// Libraries/Packages
import { Routes, Route } from 'react-router-dom'

// Components
import Users from './components/Users'
import Profile from './components/Users/Profile'
import './App.css'


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="user/:id" element={<Profile />} />
        <Route path="*" element={<Users />} />
      </Routes>
    </>
  )
}

export default App
