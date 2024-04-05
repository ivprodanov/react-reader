import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import './pages/styles.css'
import HomePage from './pages/HomePage';
import EvaluatePage from './pages/EvaluatePage';
import Header from './components/Header';
import ReadPage from './pages/ReadPage';

const Layout = () => (
  <>
    <Header/>
    <Outlet/>
  </>
)
const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <HomePage/>,
      },
      {
        path: "/eval",
        element: <EvaluatePage/>,
      },
      {
        path: "/read",
        element: <ReadPage/>,
      },
    ]
  }
  
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
