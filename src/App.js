import logo from './logo.svg';
import './App.css';  // Importa el archivo de estilos globales
import Form from './components/moleculas/form/Form';  // Importa tu componente Form

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Bienvenido al Proyecto de Campo Eléctrico</h1>
        <p>Explora las maravillas de las matemáticas y gráficos interactivos.</p>
      </header>

      <main className="App-main">
        <Form /> {/* Aquí se incluye el formulario para ingresar las cargas */}
      </main>
    </div>
  );
}

export default App;
