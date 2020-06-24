import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";

import Register from '../pages/Register';
import Welcome from '../pages/Welcome';
import Restbooking from '../pages/Restbooking';

const RootStack = createStackNavigator({
    Register: {
        screen: Register
    },
    Welcome: {
        screen: Welcome
    },
    Restbooking: {
        screen: Restbooking
    }
});

export default createAppContainer(RootStack);