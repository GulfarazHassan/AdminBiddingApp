import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, CameraRoll, ImageBackground, Alert,
  Button, TouchableOpacity, TextInput, Dimensions, ActivityIndicator, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Label_Field2 from '../others/Label_Field2'
import ImagePickerComponent from '../others/ImagePickerComponent';
import {requestCameraPermission} from '../others/AndroidPermissions';
import { connectFirebase, saveDataWithoutDocId, uploadImage } from '../../backend/firebase/utility';
import {_retrieveData} from '../../backend/AsyncFuncs';
import GlobalConst from '../../config/GlobalConst';
import ImageResizer from 'react-native-image-resizer';



export default class NewListingScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = ({
      loader: false,
      data: [],
      title: '',
      original_price: '',
      min_price: '',
      remaining_time: '',
      points_required: '',
      imageName: '',
      imageUrl: '',
      imageType: '',
      uploadProgress: '-2'
    });
    this.getUserData = this.getUserData.bind(this);
    this.uploadListing = this.uploadListing.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }

  componentDidMount(){
    connectFirebase();
    //this.getUserData();
  }

  async getUserData(){
    let userId = await _retrieveData(GlobalConst.STORAGE_KEYS.userId);
    let userName = await _retrieveData(GlobalConst.STORAGE_KEYS.userName);
    this.setState({userId: userId, userName: userName});
  }


  async uploadListing(){
    jsonObject = {
      title: this.state.title,
      original_price: this.state.original_price,
      min_price: this.state.min_price,
      remaining_time: this.state.remaining_time,
      active: true,
      sold: false,
      sold_price: '0',
      points_required: this.state.points_required,
      imageUrl: ''
    }

    await this.setState({ loader: true });
    let docRef = await saveDataWithoutDocId('Listings', jsonObject);
    await this.uploadImage(docRef);
    this.setState({loader: false});
  }


  async uploadImage(docRef){
    let resizedImage = await ImageResizer.createResizedImage(this.state.imageUrl, Dimensions.get('window').width, Dimensions.get('window').height/3, 'JPEG', 70);
      // response.uri is the URI of the new image that can now be displayed, uploaded...
      // response.path is the path of the new image
      // response.name is the name of the new image with the extension
      // response.size is the size of the new image
    await this.setState({
      imageName: resizedImage.name,
      imageUrl: resizedImage.uri,
    });

    await uploadImage(this.state.imageUrl, this.state.imageType,
    'Listings', this.state.imageName, 'Listings', docRef);

    let that = this;
    let iteratorNum = 0;

    let refreshId = setInterval(function() {
      iteratorNum += 1;
      _retrieveData(GlobalConst.STORAGE_KEYS.imageUploadProgress).then((data) => {
        that.setState({uploadProgress: data});
        if(data == '100') {
          clearInterval(refreshId);
          Alert.alert( '', 'Profile is updated',
            [ {text: 'OK', onPress: () => that.props.navigation.goBack()} ] );
        }
        if(data == '-2') {
          clearInterval(refreshId);
          Alert.alert( '', 'Something went wrong',
            [ {text: 'OK', onPress: () => that.props.navigation.goBack()} ] );
        }
        if(iteratorNum == 120) {
          clearInterval(refreshId);
          Alert.alert( '', 'Picture uploading taking too long. Please upload a low resolution picture',
            [ {text: 'OK', onPress: () => that.props.navigation.goBack()} ] );
        }
      })
    }, 1000);

  }

  async changeState(text, key){
   text.then((text) => this.setState({[key]: text}) );
 }

 async onChangeImage(text){
   this.setState({
     imageName: text.fileName,
     imageUrl: Platform.OS === 'ios' ? text.uri : text.path,
     imageType: text.type
   });
 }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.container}>

        <View style={styles.imageContainer}>
          <ImageBackground style={styles.backgroundImage} source={require('../../assets/upload_image.jpg')}>
            <ImagePickerComponent onChange={(imageData) => this.onChangeImage(imageData)}/>
          </ImageBackground>
        </View>

        <View style={styles.fieldsAreaContainer}>

          <View style={styles.fieldContainer}>
            <Label_Field2 label={'Title'} onChange={(text) => this.changeState(text, 'title')} placeholder={'e.g. used watch'} textInputHeight={50}/>
          </View>
          <View style={styles.fieldContainer}>
            <Label_Field2 label={'Original Price'} onChange={(text) => this.changeState(text, 'original_price')} placeholder={'e.g. 50'} textInputHeight={50}/>
          </View>
          <View style={styles.fieldContainer}>
            <Label_Field2 label={'Min Price'} onChange={(text) => this.changeState(text, 'min_price')} placeholder={'e.g. 5'} textInputHeight={50}/>
          </View>
          <View style={styles.fieldContainer}>
            <Label_Field2 label={'Remaining Time'} onChange={(text) => this.changeState(text, 'remaining_time')} placeholder={'e.g. 300 minutes'} textInputHeight={50}/>
          </View>
          <View style={styles.fieldContainer}>
            <Label_Field2 label={'Points Required'} onChange={(text) => this.changeState(text, 'points_required')} placeholder={'e.g. 10'} textInputHeight={50}/>
          </View>
          <View style={styles.pickupButtonContainer}>
            {this.state.uploadProgress != '-2' ? <Text style={styles.loadingText}>Upload Completed: {this.state.uploadProgress}%</Text>
              : null }
            <Button
              onPress={() => this.uploadListing()}
              title="Share"
            />

            {this.state.loader ? <ActivityIndicator size="large" color="#0000ff" /> : null}
          </View>

        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    height: Dimensions.get('window').height/3,
    width: '100%',
  },
  fieldsAreaContainer:{
    flex: 0.4,
    margin: 5,
  },
  fieldContainer: {
    flex: 0.2,
    marginVertical: 5,
  },
  pickupButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingVertical: 10,
    marginHorizontal: 20
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
  },
  contentText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  }
});
