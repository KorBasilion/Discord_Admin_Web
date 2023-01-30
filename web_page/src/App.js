import { Route, Routes } from 'react-router-dom'
import Sidebar from './components/sidebar/Sidebar'
import Home from './pages/home/Home'
import Pinned from './pages/pinned/Pinned'
import './app.css'

function App() {
    return <div className="App">
            <div className="container" id="containerID">
                <Sidebar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/pinned" element={<Pinned />} />
                </Routes>
            </div>
        </div>
}

export default App