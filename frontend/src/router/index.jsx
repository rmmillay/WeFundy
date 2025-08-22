import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';

import Layout from './Layout';
import Fundraisers from '../components/Splash';
// import FundCreate from '../components/FundraiserCUD';
// import Donations

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [

      { 
        path: "/",
        element: <Fundraisers />,
      }, 
      // { 
      //   path: "/:fundId",
      //   element: <FundraiserId />,
      // }, 
      // { 
      //   path: "/createFund",
      //   element: <FundCreate />,
      // }, 

      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      //{
      //   path: "/donations",
      //   element: <Donations />, 
      // },
      // {
      //   path: "/donations/:id",
      //   element: <DonationId />,
      // },
    ],
  },

]);
