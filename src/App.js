import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Screen/Home';
import Upload from './Screen/UploadData'

function App() {
   
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/upload" element={<Upload />}/>
      </Routes>
    </Router>
  );
}

export default App;
