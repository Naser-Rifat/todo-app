import { useRoutes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";

function App() {
  const routes = [
    {
      path: "/",
      element: <Home />,
    },
  ];

  const allRoutes = useRoutes(routes);
  return <div>{allRoutes}</div>;
}

export default App;
