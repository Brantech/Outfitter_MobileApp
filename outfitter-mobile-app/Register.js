import React from 'react';
import { StyleSheet, Text, View, TextInput, ToastAndroid, TouchableHighlight } from 'react-native';
import { mainContainer, ScreenEnum } from './MainContainer';

const styles = StyleSheet.create({
    containerOther: {
        flex: 2,
        backgroundColor: 'white',
    },

    halfContainer: {
        flexDirection: 'row',
    },

    fullContainerInput: {
        height: 48,
        width: '98%',
        paddingHorizontal: '1%',
        marginHorizontal: '1%',
        marginVertical: 10,
        fontSize: 24,
        color: 'black',
    },

    halfContainerInput: {
        height: 48,
        width: '46%',
        paddingHorizontal: '1%',
        marginHorizontal: '1%',
        fontSize: 24,
        color: 'black',
    },

    buttonWrap: {
        position: 'absolute',
        flexDirection: 'row',
        bottom: 0,
        width: '100%'
    },

    backButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        height: 100,
        width: '50%',
    },

    registerButton: {
        backgroundColor: '#8bc34a',
        justifyContent: 'center',
        height: 100,
        width: '50%',
    },

    buttonText: {
        color: 'white',
        fontSize: 48,
        textAlign: 'center',
    }
});

export class Register extends React.Component {

    constructor(props){
        super(props);
        this.register = this.register.bind(this);
        this.state = {first: '', last: '', user: '', email1: '', email2: '', pass1: '', pass2: ''};
        }

    back() {
        mainContainer.displayScreen(ScreenEnum.Login);
    }

    register() {
        ToastAndroid.show(`fn: ${this.state.first} ln: ${this.state.last} usr: ${this.state.user} em1: ${this.state.email1} em2: ${this.state.email2} pw1: ${this.state.pass1} pw2: ${this.state.pass2}`, ToastAndroid.SHORT);
        // TODO: Validate the fields
    }

    render() {
        return (
            <View style={styles.containerOther}>
                <View style={styles.halfContainer}>
                    <TextInput 
                        style={styles.halfContainerInput} 
                        placeholder="Name" 
                        placeholderTextColor="#90a4ae"
                        textContentType="name"
                        onSubmitEditing={() => {this.lnInput.focus()}}
                        blurOnSubmit={false}
                        onChangeText={(input) => {this.setState({first: input})}}
                    />
                    <TextInput 
                        style={styles.halfContainerInput} 
                        placeholder="Last Name" 
                        textContentType="familyName"
                        placeholderTextColor="#90a4ae"
                        ref={(input) => {this.lnInput = input}}
                        onSubmitEditing={() => {this.unInput.focus()}}
                        onChangeText={(input) => {this.setState({last: input})}}
                    />
                </View>
                <TextInput 
                        style={styles.fullContainerInput} 
                        placeholder="Username" 
                        textContentType="username"
                        placeholderTextColor="#90a4ae"
                        ref={(input) => {this.unInput = input}}
                        onSubmitEditing={() => {this.em1Input.focus()}}
                        onChangeText={(input) => {this.setState({user: input})}}
                    />
                <TextInput 
                    style={styles.fullContainerInput} 
                    placeholder="Email"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    secureTextEntry={true}
                    placeholderTextColor="#90a4ae"
                    ref={(input) => {this.em1Input = input}}
                    onSubmitEditing={() => {this.em2Input.focus()}}
                    onChangeText={(input) => {this.setState({email1: input})}}
                />
                <TextInput 
                    style={styles.fullContainerInput} 
                    placeholder="Re-Type Email"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    secureTextEntry={true}
                    placeholderTextColor="#90a4ae"
                    ref={(input) => {this.em2Input = input}}
                    onSubmitEditing={() => {this.pw1Input.focus()}}
                    onChangeText={(input) => {this.setState({email2: input})}}
                />
                <TextInput 
                    style={styles.fullContainerInput} 
                    placeholder="Pasword"
                    textContentType="password"
                    secureTextEntry={true}
                    placeholderTextColor="#90a4ae"
                    ref={(input) => {this.pw1Input = input}}
                    onSubmitEditing={() => {this.pw2Input.focus()}}
                    onChangeText={(input) => {this.setState({pass1: input})}}
                />
                <TextInput 
                    style={styles.fullContainerInput} 
                    placeholder="Re-Type Pasword"
                    textContentType="password"
                    secureTextEntry={true}
                    placeholderTextColor="#90a4ae"
                    ref={(input) => {this.pw2Input = input}}
                    onChangeText={(input) => {this.setState({pass2: input})}}
                />
                <View style={styles.buttonWrap}>
                    <TouchableHighlight
                        style={styles.backButton}
                        onPress={this.back}
                    >
                        <Text style={styles.buttonText}>Back</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.registerButton}
                        onPress={this.register}
                    >
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}