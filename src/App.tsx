import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Switch } from 'react-router-dom';

import OrganisationProfile from 'components/pages/OrganisationProfile';

import AddAnimal from './components/pages/AddAnimal';
import AnimalProfile from './components/pages/AnimalProfile';
import Home from './components/pages/Home';
import Login from './components/pages/LogIn';
import Search from './components/pages/Search';
import SignUp from './components/pages/SignUp';
import UserProfile from './components/pages/UserProfile';
import UserSettings from './components/pages/UserSettings';
import NavBar from './components/shared/Navbar/NavBar';

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/signup' component={SignUp} />
        <Route path='/login' component={Login} />
        <Route path='/users/:username' component={UserProfile} />
        <Route path='/organisation/:name' component={OrganisationProfile} />
        <Route path='/users/:nickname/settings' component={UserSettings} />
        <Route path='/add-animal' component={AddAnimal} />
        <Route path='/search' component={Search} />
        <Route path='/animal/:_id' component={AnimalProfile} />
      </Switch>
      <Toaster />
    </>
  );
}

export default App;
