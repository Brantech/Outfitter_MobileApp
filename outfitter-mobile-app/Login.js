import React from 'react';
import { StyleSheet, Text, View, TextInput, ToastAndroid, TouchableHighlight } from 'react-native';
import { mainContainer, ScreenEnum } from './MainContainer';

/** Styles for the components */
const styles = StyleSheet.create({
    containerOther: {
        flex: 2,
        backgroundColor: 'white',
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
      backgroundColor: '#8bc34a',
      justifyContent: 'center',
      height: 100,
      width: '50%',
    },

    registerButton: {
      backgroundColor: 'red',
      justifyContent: 'center',
      height: 100,
      width: '50%',
    },

    buttonWrap: {
        position: 'absolute',
        flexDirection: "row",
        bottom: 0,
    },
    
    buttonText: {
      color: 'white',
      fontSize: 48,
      textAlign: 'center',
    }
  });

export class Login extends React.Component {

    constructor(props){
        super(props);
        this.login = this.login.bind(this);
        this.state = {user: '', pass: ''};
      }

    login(){
        ToastAndroid.show(`u: ${this.state.user} p: ${this.state.pass}`, ToastAndroid.SHORT);
    }

    register() {
        mainContainer.displayScreen(ScreenEnum.Register);
    }

    render() {
        return (
            <View style={styles.containerOther}>
                <TextInput 
                    style={styles.loginBoxes} 
                    placeholder="username" 
                    placeholderTextColor="#90a4ae"
                    textContentType="username"
                    onSubmitEditing={() => {this.pwInput.focus();}}
                    blurOnSubmit={false}
                    onChangeText={(user) => {this.setState({user})}}
                />
                <TextInput 
                    style={styles.loginBoxes} 
                    placeholder="password" 
                    textContentType="password"
                    secureTextEntry={true}
                    placeholderTextColor="#90a4ae"
                    ref={(input) => {this.pwInput = input;}}
                    onChangeText={(pass) => {this.setState({pass})}}
                />
                
                <View style={styles.buttonWrap}>
                    <TouchableHighlight
                        style={styles.registerButton}
                        onPress={this.register}
                    >
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={styles.loginButton}
                        onPress={this.login}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}