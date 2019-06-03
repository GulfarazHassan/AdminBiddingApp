import React, {Component} from 'react';
import {StyleSheet, Modal, Text, SafeAreaView, TouchableHighlight, View, Alert, TouchableOpacity, Dimensions} from 'react-native';
//import Icon from 'react-native-vector-icons/FontAwesome';

export default class ModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      visible: false,
    });
  }

  setModalVisible(visible) {
    this.setState({visible: visible});
  }

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={() => this.setState({ visible: true })}>
        <View style={styles.textContainer}>
          <Text style={styles.labelText}>{this.props.label}</Text>
        </View>
        <View style={styles.container}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.visible}>
            <SafeAreaView style={styles.modalOuterContentContainer}>
              <View style={[styles.modalInnerContentContainer, {flex: 0.9}]}>
                <TouchableOpacity style={styles.close} onPress={() => {
                    this.setModalVisible(!this.state.visible);
                  }}>
                  <Text>Close</Text>
                </TouchableOpacity>
                <View style={styles.modalContent}>
                  {this.props.modalComponent}
                </View>
              </View>
            </SafeAreaView>
          </Modal>
        </View>
      </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 20
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  labelContainer: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
  },
  modalOuterContentContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalInnerContentContainer:{
//    flex: 0.5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#71a1ed',
    backgroundColor: '#ffffff',
  },
  close: {
    alignItems: "flex-end",
    padding: 10,
  },
  modalContent: {
    flex: 1,
  },
  labelText: {
    fontSize: 25,
    textAlign: 'center'
  }
})
