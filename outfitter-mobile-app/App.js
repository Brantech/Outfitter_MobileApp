import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ToastAndroid } from 'react-native';

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
          style={{height:48, width:200, fontSize: 24}} 
          placeholder="username" 
          onChangeText={(user) => {this.setState({user})}}
          />
        <TextInput 
          style={{height:48, width:200, fontSize: 24}} 
          placeholder="password" 
          textContentType="password"
          secureTextEntry={true}
          onChangeText={(pass) => {this.setState({pass})}}
          />
        <Button 
          onPress={this.login} 
          title="Login"
          color="#841584"
          accessibilityLabel="Login"
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
