import React, {Component} from 'react';
import {Image, Keyboard, KeyboardAvoidingView, StyleSheet, TouchableOpacity, View} from 'react-native';
import LoginButton from './LoginButton';


import UserInput from './UserInput';
import eyeImg from '../assets/images/eye_black.png';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPass: true,
            press: false,
        };
        this.showPass = this.showPass.bind(this);
    }

    showPass() {
        this.state.press === false
            ? this.setState({showPass: false, press: true})
            : this.setState({showPass: true, press: false});
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View behavior="padding">
                    <UserInput
                        ref={(input) => {
                            this.usernameField = input
                        }}
                        placeholder="Username"
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        returnKeyType={"next"}
                        onSubmitEditing={() => {
                            this.passwordField.focus()
                        }}
                    />
                    <UserInput
                        ref={(input) => {
                            this.passwordField = input
                        }}
                        secureTextEntry={this.state.showPass}
                        placeholder="Password"
                        returnKeyType={'done'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        onSubmitEditing={() => {
                            Keyboard.dismiss();
                            this.login._onPress();
                        }}
                    />
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.btnEye}
                        onPress={this.showPass}>
                        <Image source={eyeImg} style={styles.iconEye}/>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, justifyContent: "flex-end"}}>
                    <LoginButton
                        ref={(input) => {
                            this.login = input
                        }}
                        nav={this.props.nav}
                        usrField={() => this.usernameField.getText()}
                        pwdField={() => this.passwordField.getText()}/>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    btnEye: {
        position: 'absolute',
        top: 55,
        right: 28,
    },
    iconEye: {
        width: 25,
        height: 25,
        tintColor: 'rgba(0,0,0,0.2)',
    },
});
