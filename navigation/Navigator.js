import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";

import Register from '../pages/Register';
import Welcome from '../pages/Welcome';
import Restbooking from '../pages/Restbooking';
import FirstPage from '../pages/FirstPage';
import RestListings from '../pages/RestListings';
import RestDetails from '../pages/RestDetails';

const RootStack = createStackNavigator({
    FirstPage: {
        screen: FirstPage
    },
    Register: {
        screen: Register
    },
    Welcome: {
        screen: Welcome
    },
    RestListings:{
        screen: RestListings
    },
    RestDetails: {
        screen: RestDetails
    },
    Restbooking: {
        screen: Restbooking
    },

});

export default createAppContainer(RootStack);