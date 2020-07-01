import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";

import Register from '../pages/Register';
import HomePage from '../pages/HomePage';

import LoginPage from '../pages/LoginPage';
import RestListings from '../pages/RestListings';
import RestDetails from '../pages/RestDetails';
import PendingReservations from '../pages/PendingReservations'
import InvoicePage from '../pages/InvoicePage';
import Payreceived from '../pages/Payreceived';
import LoadingScreen from '../pages/LoadingScreen';

const RootStack = createStackNavigator({
    LoadingScreen: {
        screen: LoadingScreen
    },
    LoginPage: {
        screen: LoginPage
    },
    Register: {
        screen: Register
    },
    HomePage: {
        screen: HomePage
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