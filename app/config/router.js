import React from "react";
import {
  createMaterialTopTabNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
  createDrawerNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import { DrawerActions } from "react-navigation-drawer";
import Icon from "react-native-vector-icons/FontAwesome";

import ActiveListingsScreen from "../components/listings/ActiveListingsScreen";
import CreateListingScreen from "../components/listings/CreateListingScreen";

import PlaceholderScreen from "../components/PlaceholderScreen";

console.disableYellowBox = true;

export const ActiveListingsStack = createStackNavigator({
  Activelistings: {
    screen: ActiveListingsScreen,
    navigationOptions: {
      // title: 'Active Listings',
      header: null
    }
  },
  CreateListing: {
    screen: CreateListingScreen,
    navigationOptions: {
      title: "Create a New Listing",
      header: null
    }
  }
});

//***************APP TAB NAVIGATOR*********************
const RootTabNav = createBottomTabNavigator(
  {
    Lisitings: {
      screen: ActiveListingsStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name='list-alt' color={tintColor} size={24} />
        )
      }
    },
    Placeholder: {
      screen: PlaceholderScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name='folder' color={tintColor} size={24} />
        )
      }
    }
  },
  {
    initialRouteName: "Lisitings",
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: "#F8F8F8", // active icon color
      style: {
        backgroundColor: "#171F33" // TabBar background
      },
      labelStyle: {
        fontSize: 15
      }
    }
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      App: RootTabNav
    },
    {
      initialRouteName: "App"
    }
  )
);
