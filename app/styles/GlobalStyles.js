import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  listCardInnerContainer:{
    flex: 1,
  },
  listCardContainer: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#adadad',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 5,
    marginVertical: 8,
    marginHorizontal: 10,
    backgroundColor: '#aaaaaa',
  },
  header: {
    flex: 0.2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 5,
    backgroundColor: '#f7f7f7',
  },
  titleContainer:{
    flex: 1,
    marginBottom: 10,
  },
  priceContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shareIconContainer:{
    flex: 0.1,
  },
  imageContainer: {
    flex: 0.5,
    backgroundColor: '#aaaaaa',
  },
  footerContainer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
    backgroundColor: '#aaaaaa',
  },
  buttonContainer:{
    flex: 0.1,
    marginHorizontal: 20
  },
  backgroundImage: {
    height: 200,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentText: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    transform: [{ rotate: '20deg'}],
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  priceText: {
    fontSize: 15,
    textAlign: 'center',
  },
  footerText: {
    fontSize: 15,
  },
});
