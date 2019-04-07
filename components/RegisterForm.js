import React, {Component} from 'react';
import {Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, View} from 'react-native';


import UserInput from './UserInput';
import RegisterButton from './RegisterButton';

export default class RegisterForm extends Component {
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
                <ScrollView style={{flex: 1}}>
                    <UserInput
                        ref={(input) => {
                            this.firstName = input
                        }}
                        placeholder="First Name"
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        returnKeyType={"next"}
                        onSubmitEditing={() => this.lastName.focus()}
                    />
                    <UserInput
                        ref={(input) => {
                            this.lastName = input
                        }}
                        placeholder="Last Name"
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        returnKeyType={"next"}
                        onSubmitEditing={() => this.username.focus()}
                    />
                    <UserInput
                        ref={(input) => {
                            this.username = input
                        }}
                        placeholder="Username"
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        returnKeyType={"next"}
                        onSubmitEditing={() => this.email.focus()}
                    />
                    <UserInput
                        ref={(input) => {
                            this.email = input
                        }}
                        placeholder="Email"
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        returnKeyType={"next"}
                        onSubmitEditing={() => this.email2.focus()}
                    />
                    <UserInput
                        ref={(input) => {
                            this.email2 = input
                        }}
                        placeholder="Re-Type Email"
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        returnKeyType={"next"}
                        onSubmitEditing={() => this.password.focus()}
                    />
                    <UserInput
                        ref={(input) => {
                            this.password = input
                        }}
                        secureTextEntry={this.state.showPass}
                        placeholder="Password"
                        returnKeyType={'next'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        onSubmitEditing={() => this.password2.focus()}
                    />
                    <UserInput
                        ref={(input) => {
                            this.password2 = input
                        }}
                        secureTextEntry={this.state.showPass}
                        placeholder="Re-Type Password"
                        returnKeyType={'done'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        onSubmitEditing={() => {
                            Keyboard.dismiss();
                            this.register._onPress();
                        }}
                    />
                </ScrollView>
                <View style={{height: "25%"}}>
                    <RegisterButton
                        ref={(input) => {
                            this.register = input
                        }}
                        fname={() => this.firstName.getText()}
                        lname={() => this.lastName.getText()}
                        username={() => this.username.getText()}
                        email={() => this.email.getText()}
                        email2={() => this.email2.getText()}
                        password={() => this.password.getText()}
                        password2={() => this.password2.getText()}
                        parent={this.props.parent}
                    />
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
