//The main component that acts as the entry point for the React

/*
App.js file sets up the main application component. 
It imports necessary components such as HomePage, PageDetails, CreatePage, EditPage, BackOffice, 
and Navbar. It also imports the checkAuth function from the authentication service.
Within the useEffect hook, it calls the checkAuth function to check the authentication status of the 
user and sets the isAuthenticated state accordingly.
The App component uses the Router component from react-router-dom to define the routing for different paths. 
It includes routes for the homepage, page details, back office, create page, and edit page.
The Navbar component is rendered at the top and receives the isAuthenticated state as a prop.
*/

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/PostList';
import Footer from "./components/Footer";
import PageDetails from './components/FrontOffice/PageDetail';
import CreatePage from './pages/CreatePage/CreatePage';
import EditPage from './/pages/EditPage/EditPage';
import CreatePageForm from './components/Backoffice/CreatePageForm';
import EditPageForm from './components/Backoffice/EditPageForm';
import PageList from './components/Backoffice/PageList';
import Navbar from './components/Navbar';
import { checkAuth } from './Services/auth';
import LoginForm from '../src/components/Auth/LoginForm'
import LogoutButton from '../src/components/Auth/LogoutButton'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const authData = await checkAuth();
        setIsAuthenticated(authData.isAuthenticated);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchAuthStatus();
  }, []);

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route exact path="/" element={<HomePage/>} />
        <Route exact path="/create" element={<CreatePage/>} />
        <Route exact path="/login" element={<LoginForm/>} /> 
        <Route exact path="/logout" element={<LogoutButton/>} /> 
        <Route path="/pages/:id" element={<PageDetails/>} />

   
        <Route
          path="/backoffice"
          render={(props) => <BackOffice {...props} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/create-page"
          render={(props) => <CreatePage {...props} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/edit-page/:id"
          render={(props) => <EditPage {...props} isAuthenticated={isAuthenticated} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
