import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import Home from './components/Home/Home';
import Colleges from './components/Colleges/Colleges';
import Admission from './components/Admission/Admission';
import MyCollege from './components/MyCollege/MyCollege';
import PrivateRoutes from './components/AuthProviders/PrivateRoutes/PrivateRoutes';
import Login from './components/RegistrationPage/Login/Login';
import SignUp from './components/RegistrationPage/SignUp/SignUp';
import AuthProvider from './components/AuthProviders/AuthProvider/AuthProvider';
import { HelmetProvider } from 'react-helmet-async';
import CollegesDetails from './components/Colleges/CollegesDetails';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import AddColleges from './components/Admin/PostAdmin/AddColleges/AddColleges';
import AddGallery from './components/Admin/PostAdmin/AddGallery/AddGallery';
import AdmissionForm from './components/Admission/AdmissionForm';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>error </h1>,
    children: [
      {
        path: "/",
        element: <Home />
      },


      {
        path: "/Colleges",
        element: <Colleges />
      },

      {
        path: "/CollegesDetails",
        element: <PrivateRoutes><CollegesDetails /></PrivateRoutes>
      },


      {
        path: "/Admission",
        element: <Admission />
      },

      {
        path: "/AdmissionForm/:id",
        element: <AdmissionForm />,
        loader: ({ params }) => fetch(`http://localhost:5000/newCollageAdd/${params.id}`)
      },
      


      {
        path: "/MyCollege",
        element: <MyCollege />
      },


      {
        path: "/login",
        element: <Login />
      },

      {
        path: "/signup",
        element: <SignUp />
      },

    ],
  },

  {
    path: 'Dashboard',
    errorElement: "error page",
    element: <PrivateRoutes> <Dashboard></Dashboard> </PrivateRoutes>,

    children: [

      {
        path: "AddColleges",
        element: <AddColleges />
      },


      {
        path: "AddGallery",
        element: <AddGallery />
      },
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);


reportWebVitals();
