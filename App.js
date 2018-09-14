/*Example of Making PDF from HTML in React Native*/
import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
export default class Example extends Component {
  state = {
      isPermitted: false,
      filePath: ''
    };
  constructor(props) {
    super(props);
    var that = this;
    async function requestExternalWritePermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'CameraExample App External Storage Write Permission',
            message:
              'CameraExample App needs access to Storage data in your SD Card ',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //If WRITE_EXTERNAL_STORAGE Permission is granted
          //changing the state to show Create PDF option
          that.setState({ isPermitted: true });
        } else {
          alert('WRITE_EXTERNAL_STORAGE permission denied');
        }
      } catch (err) {
        alert('Write permission err', err);
        console.warn(err);
      }
    }
    //Calling the External Write permission function
    requestExternalWritePermission();
  }
  async createPDF() {
    let options = {
      //Content to print
      html:
        '<h1 style="text-align: center;"><strong>Hello Guys</strong></h1><p style="text-align: center;">Here is an example of pdf Print in React Native</p><p style="text-align: center;"><strong>Team About React</strong></p>',
      //File Name
      fileName: 'test',
      //File directory
      directory: 'docs',
    };
    let file = await RNHTMLtoPDF.convert(options);
    console.log(file.filePath);
    this.setState({filePath:file.filePath});
  }
  render() {
    if (this.state.isPermitted) {
      return (
        <View style={styles.MainContainer}>
          <TouchableOpacity onPress={this.createPDF.bind(this)}>
          <View>
            <Image
              //We are showing the Image from online
              source={{
                uri:
                  'http://aboutreact.com/wp-content/uploads/2018/09/pdf.png',
              }}
              //You can also show the image from you project directory like below
              //source={require('./Images/facebook.png')}
              style={styles.ImageStyle}
            />
            <Text style={styles.text}>Create PDF</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.text}>{this.state.filePath}</Text>
        </View>
      );
    } else {
      return <ActivityIndicator />;
    }
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2F4F4F',
    borderWidth: 1,
    borderColor: '#000',
  },
  text: {
    color: 'white',
    textAlign:'center',
    fontSize: 25,
    marginTop:16,
  },
  ImageStyle: {
    height: 150,
    width: 150,
    resizeMode: 'stretch',
  },
});
