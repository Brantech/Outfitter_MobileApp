/**
 * Main Container for the UI
 */

import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ToastAndroid, TouchableHighlight } from 'react-native';
import { Header } from 'react-native-elements';

export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.state = {user: '', pass: ''};
  }

  login() {
    ToastAndroid.show(`u: ${this.state.user} p: ${this.state.pass}`, ToastAndroid.SHORT);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          placement="left"
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'Outfittr', style: { color: '#fff' } }}
          />
        <View style={styles.containerOther}>
          <TextInput 
            style={styles.loginBoxes} 
            placeholder="username" 
            placeholderTextColor="#90a4ae"
            onChangeText={(user) => {this.setState({user})}}
            />
          <TextInput 
            style={styles.loginBoxes} 
            placeholder="password" 
            textContentType="password"
            secureTextEntry={true}
            placeholderTextColor="#90a4ae"
            onChangeText={(pass) => {this.setState({pass})}}
            />
          <TouchableHighlight
            style={styles.loginButton}
            onPress={this.login}
            >
            <Text style={styles.loginText}>Login</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerOther: {
    flex: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },

  appHeader: {
    position: 'absolute',
    backgroundColor: '#424242',
    justifyContent: 'center',
    height: 50,
    width: '100%',
    alignSelf: 'stretch',
    top: 0
  },

  loginBoxes: {
    height: 48,
    width: 300,
    fontSize: 24,
    color: 'black',
    alignSelf: 'center'
  },

  loginButton: {
    position: 'absolute',
    backgroundColor: '#8bc34a',
    justifyContent: 'center',
    height: 100,
    width: '100%',
    alignSelf: 'stretch',
    bottom: 0
  },

  headerText: {
    color: 'white',
    fontSize: 24,
    marginLeft: 15,
  },
  
  loginText: {
    color: 'white',
    fontSize: 48,
    textAlign: 'center',
  }
});
