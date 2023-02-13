import { ChackraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <ChackraProvider>
      <Router>
        <Navbar />
        <main></main>
      </Router>
    </ChackraProvider>
  );
}

export default App;
