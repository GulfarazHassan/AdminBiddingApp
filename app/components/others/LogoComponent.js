import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';


export default class LogoComponent extends Component<Props> {
  render() {
    return (
      <View style={[styles.container, {height: this.props.logoHeight}]}>
          <View style={[styles.innerTopContainer, {height: this.props.logoHeight2}]}>
            <View style={styles.center}>
              <Text style={styles.pointsText}>{this.props.logoTopText}</Text>
            </View>
          </View>
          <View style={[styles.innerBottomContainer, , {height: this.props.logoHeight2}]}>
            <View style={styles.center}>
              <Text style={styles.pointsText}>{this.props.logoBottomText}</Text>
            </View>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderTopRightRadius: 50,
    borderTopLeftRadius: 150,
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 50,
    backgroundColor: '#3554ce',
  },
  innerTopContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderTopRightRadius: 100,
    borderTopLeftRadius: 50,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 100,
    margin: 20,
    backgroundColor: '#5b77a5',
  },
  innerBottomContainer:{
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 100,
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 50,
    margin: 3,
    backgroundColor: '#8eaee5',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20%',
  },
  pointsText:{
    fontSize: 15,
    fontWeight: 'bold',
  }
});
