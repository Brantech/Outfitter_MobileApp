import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ToastAndroid, TouchableHighlight } from 'react-native';

export default class App extends React.Component {
  
  constructor(props){
    super(props);
    this.login = this.login.bind(this);
    this.state = {user: '', pass: ''};
  }

  login(){
    ToastAndroid.show(`u: ${this.state.user} p: ${this.state.pass}`, ToastAndroid.SHORT);
  }

  render() {
    return (
      <View style={styles.container}>
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdd835',
    justifyContent: 'center',
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
    backgroundColor: '#64b5f6',
    justifyContent: 'center',
    height: 100,
    width: '100%',
    alignSelf: 'stretch',
    bottom: 0
  },
  
  loginText: {
    color: 'white',
    fontSize: 48,
    textAlign: 'center',
  }
});
