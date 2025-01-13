import { BrowserRouter as Router } from "react-router";
import Header from "./components/header";
import AppRoutes from "./routes";
function App() {
  return (
    <Router>
      <Header />
      <AppRoutes />
    </Router>
  );
}

export default App;
