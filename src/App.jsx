/*import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import AnimaisAdotados from './pages/AnimaisAdotados';
import Noticias from './pages/Noticias';
import Contato from './pages/Contato';
import AnimalDetalhes from './components/AnimalDetalhes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/animaisAdotados" element={<AnimaisAdotados />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/animal/:id" element={<AnimalDetalhes />} />
      </Routes>
    </Router>
  );
}

export default App;
*/

import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import AnimaisAdotados from './pages/AnimaisAdotados';
import Noticias from './pages/Noticias';
import Contato from './pages/Contato';
import AnimalDetalhes from './components/AnimalDetalhes';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/animaisAdotados" element={<AnimaisAdotados />} />
      <Route path="/noticias" element={<Noticias />} />
      <Route path="/contato" element={<Contato />} />
      <Route path="/animal/:id" element={<AnimalDetalhes />} />
    </Routes>
  );
}

export default App;
