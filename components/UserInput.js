import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {StyleSheet, View, TextInput, Image} from 'react-native';

export default class UserInput extends Component {
    constructor(props) {
        super(props)

        this.state = {
            text: ""
        }
    }
    
    focus() {
        this.field.focus();
    }

    getText() {

        return this.state["text"]
    }

    render() {
        return (
            <View style={styles.inputWrapper}>
                <TextInput
                    ref={(input) => {this.field = input}}
                    style={styles.input}
                    placeholder={this.props.placeholder}
                    secureTextEntry={this.props.secureTextEntry}
                    autoCorrect={this.props.autoCorrect}
                    autoCapitalize={this.props.autoCapitalize}
                    returnKeyType={this.props.returnKeyType}
                    placeholderTextColor="white"
                    underlineColorAndroid="transparent"
                    onSubmitEditing={this.props.onSubmitEditing}
                    blurOnSubmit={false}
                    onChangeText={(text) => this.setState({text: text})}
                />
            </View>
        );
    }
}

UserInput.propTypes = {
    placeholder: PropTypes.string.isRequired,
    secureTextEntry: PropTypes.bool,
    autoCorrect: PropTypes.bool,
    autoCapitalize: PropTypes.string,
    returnKeyType: PropTypes.string,
};

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width: DEVICE_WIDTH - 40,
        height: 40,
        marginHorizontal: 20,
        //paddingLeft: 45,
        paddingLeft: 20,
        borderRadius: 20,
        color: '#ffffff',
    },
    inputWrapper: {
        marginBottom: 15
    },
    inlineImg: {
        position: 'absolute',
        zIndex: 99,
        width: 22,
        height: 22,
        left: 35,
        top: 9,
    },
});
