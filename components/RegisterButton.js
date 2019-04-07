import React, {Component} from 'react';
import {Animated, Easing, Image, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import spinner from '../assets/images/loading.gif';
import {Auth} from 'aws-amplify';
import aws_exports from '../aws-exports';

Auth.configure(aws_exports);

const MARGIN = 40;

export default class RegisterButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
        };

        this.buttonAnimated = new Animated.Value(0);
        this.growAnimated = new Animated.Value(0);
        this._onPress = this._onPress.bind(this);
    }

    _onPress() {
        if (this.state.isLoading) return;

        if (
            this.props.fname() === "" || this.props.lname() === "" ||
            this.props.username() === "" ||
            this.props.password() === "" || this.props.password2() === "" ||
            this.props.email() === "" || this.props.email2() === "" ||
            this.props.email() !== this.props.email2() ||
            this.props.password() !== this.props.password2()
        ) {
            return;
        }

        this.setState({isLoading: true});
        Animated.timing(this.buttonAnimated, {
            toValue: 1,
            duration: 200,
            easing: Easing.linear,
        }).start();

        const payload = {
            username: this.props.username(),
            password: this.props.password(),
            attributes: {
                email: this.props.email(),
                family_name: this.props.lname(),
                name: this.props.fname()
            }
        };

        Auth.signUp(payload)
            .then(data => {
                this.props.parent.setState({mode: 0});

                var req = new XMLHttpRequest();
                req.open("POST", global.apiURL + 'users/', true);
                req.setRequestHeader("Content-Type", "application/json");
                req.send(JSON.stringify({
                    uid: data['userSub'],
                    username: data['user']['username']
                }));
            })
            .catch(err => {
                console.log(err);
                this.setState({isLoading: false});
                this.buttonAnimated.setValue(0);
                this.growAnimated.setValue(0);
            });
    }

    render() {
        const changeWidth = this.buttonAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [global.DEVICE_WIDTH - MARGIN, MARGIN],
        });
        const changeScale = this.growAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [1, MARGIN],
        });

        return (
            <View style={styles.container}>
                <Animated.View style={{width: changeWidth}}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this._onPress}
                        activeOpacity={1}>
                        {this.state.isLoading ? (
                            <Image source={spinner} style={styles.image}/>
                        ) : (
                            <Text style={styles.text}>Register</Text>
                        )}
                    </TouchableOpacity>
                    <Animated.View
                        style={[styles.circle, {transform: [{scale: changeScale}]}]}
                    />
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0d7496',
        height: MARGIN,
        borderRadius: 20,
        zIndex: 100,
    },
    circle: {
        height: MARGIN,
        width: MARGIN,
        marginTop: -MARGIN,
        borderWidth: 1,
        borderColor: '#0d7496',
        borderRadius: 100,
        alignSelf: 'center',
        zIndex: 99,
        backgroundColor: '#0d7496',
    },
    text: {
        color: 'white',
        backgroundColor: 'transparent',
    },
    image: {
        width: 24,
        height: 24,
    },
});