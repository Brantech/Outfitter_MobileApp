import React, {Component} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';

export default class SignupSection extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    onPress={() => {
                        this.props.parent.setState({mode: 1})
                    }}
                >
                    <Text style={styles.text}>Create Account</Text>
                </TouchableWithoutFeedback>
                <Text style={styles.text}>Forgot Password?</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: "25%",
        width: global.DEVICE_WIDTH,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    text: {
        color: 'white',
        backgroundColor: 'transparent',
    },
});
