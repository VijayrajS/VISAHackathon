import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";

import Register from '../pages/Register';
import Welcome from '../pages/Welcome';
// import Restbooking from '../pages/Restbooking';

import FirstPage from '../pages/FirstPage';
import RestListings from '../pages/RestListings';
import RestDetails from '../pages/RestDetails';
import PendingReservations from '../pages/PendingReservations'
import InvoicePage from '../pages/InvoicePage';
import Payreceived from '../pages/Payreceived';
import MainScreen from '../pages/MainScreen';

const RootStack = createStackNavigator({
    MainScreen: {
        screen: MainScreen
    },
    FirstPage: {
        screen: FirstPage
    },
    Register: {
        screen: Register
    },
    Welcome: {
        screen: Welcome
    },
    RestListings: {
        screen: RestListings
    },
    RestDetails: {
        screen: RestDetails
    },
    PendingReservations: {
        screen: PendingReservations
    },

    InvoicePage: {
        screen: InvoicePage
    },

    Payreceived: {
        screen: Payreceived
    }

});

export default createAppContainer(RootStack);