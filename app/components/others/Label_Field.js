import React, {Component} from 'react';
import {StyleSheet, TextInput, View, Text, TouchableOpacity} from 'react-native';


export default class Label_Field extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = ({
      visible: false,
    });
  }

  render() {
    return (
      <View style={[styles.container, {flexDirection: this.props.flexDirection}]}>
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>{this.props.label}</Text>
          <TouchableOpacity style={styles.container} onPress={() => this.setState({ visible: true })}>
            <Text style={styles.text}>{this.props.text}</Text>
          </TouchableOpacity>
        </View>
        {this.state.visible ?
          <View style={styles.fieldContainer}>
            <TextInput
              placeholder={this.props.placeholder}
              style={[styles.textInput, {height: this.props.textInputHeight}]}
              numberOfLines = {this.props.noOfLines}
              onChangeText={(fieldValue) => this.setState({fieldValue})}
              value={this.state.fieldValue}
              ref={'fieldValue'}
            />
          </View>
          :
          null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  labelContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  fieldContainer: {
    flex: 1,
  },
  textInput: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#adadad',
    fontSize: 15,
    // minHeight: 50, //... For dynamic height
//    maxHeight: 200,
  },
  labelText: {
    fontSize: 20,
    padding: 5,
    fontWeight: 'bold',
  },
  text:{
    color: '#4d4dff',
    textDecorationLine: 'underline',
    fontSize: 20,
    padding: 5,
    paddingLeft: 0,
  }
});
