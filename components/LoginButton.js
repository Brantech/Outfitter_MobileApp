import React, {Component} from 'react';
import Dimensions from 'Dimensions';
import {Animated, AsyncStorage, Easing, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import spinner from '../assets/images/loading.gif';
import {Auth} from 'aws-amplify';
import aws_exports from '../aws-exports';

Auth.configure(aws_exports);

const DEVICE_WIDTH = Dimensions.get('window').width;
const MARGIN = 40;

export default class LoginButton extends Component {
    constructor() {
        super();

        this.state = {
            isLoading: false,
        };

        this.buttonAnimated = new Animated.Value(0);
        this.growAnimated = new Animated.Value(0);
        this._onPress = this._onPress.bind(this);
    }

    _onPress() {
        if (this.state.isLoading) return;

        this.setState({isLoading: true});
        Animated.timing(this.buttonAnimated, {
            toValue: 1,
            duration: 200,
            easing: Easing.linear,
        }).start();

        Auth.signOut().catch(err => console.log(err));

        Auth.signIn({
            username: this.props.usrField(),
            password: this.props.pwdField(),
        }).then(user => this.progressLogIn(user.signInUserSession))
            .catch(err => {
                console.log(err);
                this.setState({isLoading: false});
                this.buttonAnimated.setValue(0);
                this.growAnimated.setValue(0);
            });
    }

    progressLogIn(session) {
        try {
            AsyncStorage.setItem('accessToken', session["accessToken"]["jwtToken"]);
            AsyncStorage.setItem('idToken', session["idToken"]["jwtToken"]);
            AsyncStorage.setItem('refreshToken', session["refreshToken"]["token"]);

            Auth.currentUserInfo().then(info => {
                global.user = info;

                let req = new XMLHttpRequest();
                req.open("POST", global.apiURL + 'api/users/', true);
                req.setRequestHeader("Content-Type", "application/json");
                req.setRequestHeader("x-access-token", session['accessToken']['jwtToken']);
                req.send(JSON.stringify({username: info.username}));
            });
        } catch (error) {
            console.error(error)
        }

        this._onGrow();

        this.props.nav.displayScreen(global.ScreenEnum.Survey);
    }

    _onGrow() {
        Animated.timing(this.growAnimated, {
            toValue: 1,
            duration: 200,
            easing: Easing.linear,
        }).start();
    }

    render() {
        const changeWidth = this.buttonAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [DEVICE_WIDTH - MARGIN, MARGIN],
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
                        onPress={() => this._onPress()}
                        activeOpacity={1}>
                        {this.state.isLoading ? (
                            <Image source={spinner} style={styles.image}/>
                        ) : (
                            <Text style={styles.text}>LOGIN</Text>
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
        justifyContent: 'flex-end',
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
