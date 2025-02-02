import React from 'react';
import { createRoot } from 'react-dom/client';


import App from './components/App';
import Login from './components/Login';
import ErrorPage from './components/ErrorPage';
import ListeningTab from "./components/ListeningTab";

import { useNavigate, BrowserRouter } from 'react-router-dom';


import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Player from './components/Player';



const router = createBrowserRouter([

    {
        path: '/',
        element: <Login />,
        errorElement: <ErrorPage />
    },
    {
        path: '/dashboard',
        element: <App />
    },
    {
        path: '/play',
        element: <ListeningTab />
    }


]);


createRoot(document.getElementById('root')).render(



    <RouterProvider router={router} />


)

/*

* StrictMode deactivated, because it restricted the Web Playback to be played.

*/