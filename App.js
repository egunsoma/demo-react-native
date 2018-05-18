import React, { Component } from 'react';
import { Text, View, Image, Dimensions, ActivityIndicator } from 'react-native';

const { width, height } = Dimensions.get('window');
const API_KEY = 'hhC6Wfz0AxJX2AlnngU76lfIiwehn6haFGGi9KQa'
const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`

export default class App extends Component {

  state = {
    loading: true
  }

  componentWillMount() {
    fetch(API_URL)
      .then(resp => resp.json())
      .then(json => {
        console.log('Received APOD is ', json)
        this.setState({
          apod: json, loading: false
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{ 
          flex: 1, 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    return (
      <View style={{ 
        flex: 1, 
        justifyContent: 'center'}}>
        <Image 
          style={{width, height: width } }
          source={{ uri: this.state.apod.url}}/>
        <Text>{this.state.apod.title}</Text>
      </View>
    );
  }
}