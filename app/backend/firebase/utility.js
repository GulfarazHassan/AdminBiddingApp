import firebase from 'firebase';
import firestore from 'firebase/firestore';
import {_storeData} from '../../backend/AsyncFuncs';
import GlobalConst from '../../config/GlobalConst';
import RNFetchBlob from 'react-native-fetch-blob';
import {Platform} from 'react-native';


export function connectFirebase(){
 // Initialize Firebase
 var config = {
     apiKey: "AIzaSyAi7l-UWom7qaHYd_88qYHOypv3QZtZguo",
     authDomain: "bidding-app-9befe.firebaseapp.com",
     databaseURL: "https://bidding-app-9befe.firebaseio.com",
     projectId: "bidding-app-9befe",
     storageBucket: "bidding-app-9befe.appspot.com",
     messagingSenderId: "853252409972",
     appId: "1:853252409972:web:341652a907a4bc4a"
 };
 if (!firebase.apps.length) {
   firebase.initializeApp(config);
 }
}


export async function getAllOfCollection(collection){
  let data = [];
  let docId = '';
  let querySnapshot = await firebase.firestore().collection(collection).get();
  querySnapshot.forEach(function(doc) {
    if (doc.exists) {
      docId = doc.id;
      data.push(doc.data());
    } else {
      console.log('No document found!');
    }
  });
  return [data, docId];
}

export function getData(collection, doc, objectKey){
  // check if data exists on the given path
  if(objectKey === undefined){
    return firebase.firestore().collection(collection).doc(doc).get().then(function(doc) {
      if (doc.exists) {
        return doc.data();
      } else{
        return false;
      }
    })
  }
  else{
    return firebase.firestore().collection(collection).doc(doc).get().then(function(doc) {
      if (doc.exists && (doc.data()[objectKey] != undefined) ) {
        return ( doc.data()[objectKey] );
      } else{
        return false;
      }
    })
  }
}

export async function saveData(collection, doc, jsonObject){
  firebase.firestore().collection(collection).doc(doc).set(jsonObject, { merge: true })
  .then(function() {
      console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });
}

export async function saveDataWithoutDocId(collection, jsonObject){
  let docRef = await firebase.firestore().collection(collection).doc();
  await docRef.set(jsonObject, { merge: true });
  console.log("Document successfully written!");
  return docRef;
}

export async function addToArray(collection, doc, array, value){
  firebase.firestore().collection(collection).doc(doc).update({
    [array]: firebase.firestore.FieldValue.arrayUnion(value)
  });
}


export async function uploadImage(imgUri, mime = 'image/jpeg', imagePath, name, databaseCollection, docRef) {
  //blob
  const Blob = RNFetchBlob.polyfill.Blob;
  const fs = RNFetchBlob.fs;
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
  window.Blob = Blob;

  const uploadUri = Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
  const imageRef = firebase.storage().ref(imagePath + '/' + name);

  let readingFile = await fs.readFile(uploadUri, 'base64');
  let blob = await Blob.build(readingFile, { type: `${mime};BASE64` });

  let uploadTask = imageRef.put(blob, { contentType: mime, name: name });

  let progress = 0;
  //Listen for state changes, errors, and completion of the upload.
  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
    function(snapshot) {
      // console.log('Bytes transferred ' + snapshot.bytesTransferred);
      // console.log('Total bytes ' + snapshot.totalBytes);
      // var progress = ( (snapshot.bytesTransferred / snapshot.totalBytes) * 100 );
      if(progress < 30)
        progress += 10;
      else if(progress >= 30)
        progress += 5;
      else if(progress >= 85)
        progress += 1;
      else if(progress >= 95)
        progress += 0.1;

      _storeData(GlobalConst.STORAGE_KEYS.imageUploadProgress, progress.toString());
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED:
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING:
          console.log('Upload is running');
          break;
      }
    },
    function(error) {
      console.log(error);
      _storeData(GlobalConst.STORAGE_KEYS.imageUploadProgress, '-1');
    },
    function() {
      // Upload completed successfully, now we can get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log('File available at', downloadURL);
        saveData(databaseCollection, docRef.id, {imageUrl: downloadURL}).then(() => {
          _storeData(GlobalConst.STORAGE_KEYS.imageUploadProgress, '100');
        });

    });
  });

}


export async function downloadImage(folder, imageName){
  var storageRef = firebase.storage().ref();
  var pathRef = storageRef.child(folder + '/' + imageName);

  let url = await pathRef.getDownloadURL()
  return url;
}
