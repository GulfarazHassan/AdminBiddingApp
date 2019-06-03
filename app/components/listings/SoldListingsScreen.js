import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  Button,
  SafeAreaView,
  View,
  ImageBackground,
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

export default class ActiveListingsScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      docId: "",
      data: []
    };
    this.loadListings = this.loadListings.bind(this);
  }

  componentDidMount() {
    connectFirebase();
    this.props.navigation.addListener("willFocus", () => {
      this.loadListings();
    });
  }

  async loadListings() {
    await this.toggleLoader();
    let listingsData = await getAllOfCollection("Listings");
    let inactiveListings = [];
    for (let i = 0; i < listingsData[0].length; i++) {
      if (!listingsData[0][i].active) inactiveListings.push(listingsData[0][i]);
    }
    this.setState({ data: inactiveListings, docId: listingsData[1] });
    await this.toggleLoader();
  }

  toggleLoader() {
    this.setState({ loader: !this.state.loader });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        {this.state.loader ? (
          <ActivityIndicator size='large' color='#0000ff' />
        ) : null}
        <FlatList
          numColumns={2}
          data={this.state.data}
          extraData={this.state}
          onRefresh={() => this.loadListings()}
          refreshing={this.state.loader}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={styles.listCardContainer}>
              <View style={styles.listCardInnerContainer}>
                <View style={styles.header}>
                  <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{item.title}</Text>
                  </View>
                  <View style={styles.originalPriceContainer}>
                    <Text style={styles.priceText}>
                      Original Pirce: {item.original_price}
                    </Text>
                  </View>
                </View>

                <View style={styles.imageContainer}>
                  {item.sold ? (
                    <ImageBackground
                      style={styles.backgroundImage}
                      source={{ uri: item.imageUrl }}>
                      <Text style={[styles.contentText, { color: "green" }]}>
                        SOLD
                      </Text>
                    </ImageBackground>
                  ) : (
                    <ImageBackground
                      style={styles.backgroundImage}
                      source={{ uri: item.imageUrl }}>
                      <Text style={[styles.contentText, { color: "red" }]}>
                        NOT SOLD
                      </Text>
                    </ImageBackground>
                  )}
                </View>

                <View style={styles.footerContainer}>
                  {item.sold ? (
                    <View style={styles.priceContainer}>
                      <Text style={styles.footerText}>{item.sold_price}</Text>
                      <Text style={styles.footerText}>{item.min_price}</Text>
                    </View>
                  ) : (
                    <View style={styles.priceContainer}>
                      <Text style={styles.footerText}> </Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}
