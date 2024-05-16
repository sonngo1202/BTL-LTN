import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import GestureControl from './components/GestureControl';
import ButtonControl from './components/ButtonControl';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/gesture-control' element={<GestureControl/>}></Route>
        <Route path='/button-control' element={<ButtonControl/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
