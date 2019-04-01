import React, {Component} from 'react';
import Dimensions from 'Dimensions';
import {StyleSheet, View, Text, TouchableWithoutFeedback} from 'react-native';

export default class SignupSection extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    onPress={() => {this.props.parent.setState({mode: 1})}}
                >
                    <Text style={styles.text}>Create Account</Text>
                </TouchableWithoutFeedback>
                <Text style={styles.text}>Forgot Password?</Text>
            </View>
        );
    }
}

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        height: "25%",
        width: DEVICE_WIDTH,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    text: {
        color: 'white',
        backgroundColor: 'transparent',
    },
});
