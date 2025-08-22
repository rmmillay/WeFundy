import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import Fundraisers from '../components/Splash/Fundraisers';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { 
        path: "/",
        element: <Fundraisers />,
      }, 
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
    ],
  },

]);
