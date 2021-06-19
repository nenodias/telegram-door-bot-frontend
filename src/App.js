import './App.css';
import Apartamentos from './components/Apartamentos';

function App() {
  return (
    <div className="App">
      <div className="container">
        <header className="column">
          <h1>Porteiro</h1>
        </header>
        <main>
          <Apartamentos />
        </main>
      </div>
    </div>
  );
}

export default App;
