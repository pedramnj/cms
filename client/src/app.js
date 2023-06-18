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
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './FrontOffice/HomePage';
import PageDetails from './FrontOffice/PageDetails';
import CreatePage from './Pages/CreatePage';
import EditPage from './Pages/EditPage';
import BackOffice from './BackOffice/BackOffice';
import Navbar from './Navbar';
import { checkAuth } from './Services/auth';

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
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/pages/:id" component={PageDetails} />
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
      </Switch>
    </Router>
  );
};

export default App;
