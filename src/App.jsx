import { useRoutes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignIn from "./pages/signIn";

function App() {
  const routes = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/sign-in",
      element: <SignIn />,
    },
  ];

  const allRoutes = useRoutes(routes);
  return <div>{allRoutes}</div>;
}

export default App;
