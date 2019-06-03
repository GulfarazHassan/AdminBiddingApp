import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  Button,
  SafeAreaView,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import styles from "../../styles/GlobalStyles";
import {
  connectFirebase,
  getAllOfCollection,
  getData
} from "../../backend/firebase/utility";

import CreateListening from "./CreateListingScreen";

export default class ActiveListingsScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      userName: "",
      userPoints: "",
      docId: "",
      data: []
    };
    this.loadListings = this.loadListings.bind(this);
    this.getUserData = this.getUserData.bind(this);
  }

  componentDidMount() {
    connectFirebase();
    this.props.navigation.addListener("willFocus", () => {
      this.loadListings();
      this.getUserData();
    });
  }

  async loadListings() {
    await this.toggleLoader();
    let listingsData = await getAllOfCollection("Listings");
    let activeListings = [];
    for (let i = 0; i < listingsData[0].length; i++) {
      if (listingsData[0][i].active) activeListings.push(listingsData[0][i]);
    }
    this.setState({ data: activeListings, docId: listingsData[1] });
    await this.toggleLoader();
  }

  async getUserData() {
    let userData = await getData("Users", "uHXxggPAzoJjHXasBapt");
    this.setState({ userName: userData.name, userPoints: userData.points });
  }

  toggleLoader() {
    this.setState({ loader: !this.state.loader });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text style={styless.welcome}>AdminAdd Products</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => navigate("CreateListing")}
            title='New listing'
            accessibilityLabel='new listing'
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styless = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
