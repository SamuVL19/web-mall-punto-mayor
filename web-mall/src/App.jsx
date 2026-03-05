import { Routes, Route } from 'react-router-dom'
import LocalDetail from './pages/LocalDetail'
import Home from './pages/Home'
import Layout from './components/Layout'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/local/:slug" element={<LocalDetail />} />
      </Routes>
    </Layout>
  )
}

export default App
