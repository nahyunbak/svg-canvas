import "./App.css";
import Canvas from "./components/Canvas";
import Nav from "./components/Nav";
import Tool from "./components/Tool";

function App() {
  return (
    <div className="App">
      <Tool />
      <Nav />
      <Canvas />
    </div>
  );
}

export default App;
