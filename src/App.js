import logo from './logo.svg';
import './css/App.css';
import HomePage from './components/HomePage';
import Header from './components/Header';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListPage from './components/ListPage';

function App() {

  const router = createBrowserRouter([{
    path: "/",
    element: <><Header /><HomePage /></>
  }, {
    path: "/List",
    element: <><Header /><ListPage /></>
  }])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
