import logo from './logo.svg';
import './App.css';
import Board from './components/Board.jsx';

function App() {
  return (
    <div>
      <h1 style = {{textAlign: "center"}}>Magnetic stones - demo</h1>
      <Board />
    </div>
  );
}

export default App;
