import "./App.css";
import { Home } from "./components/HomePage/Home";
import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "./AnimatedRoutes";

function App() {
  return (
    <>
      <Router>
        <AnimatedRoutes />
      </Router>
    </>
  );
}

export default App;
