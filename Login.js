import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Font} from 'expo';
import Form from './components/Form';
import Wallpaper from './components/Wallpaper';
import ButtonSubmit from './components/ButtonSubmit';
import SignupSection from './components/SignupSection';

export default class Login extends Component {
    state = {
        fontLoaded: false,
    };

    async componentDidMount() {
        await Font.loadAsync({
            'bella-fashion': require('./assets/font/bella-fashion.ttf')
        });

        this.setState({ fontLoaded: true });
    }

    render() {
        return (
            <Wallpaper>
                <View style={{alignItems: 'center', flex: 1, paddingTop: 125, paddingBottom: 180}}>
                    {
                        this.state.fontLoaded ? (
                            <Text style={styles.titleText}> Outfittr </Text>
                        ) : null
                    }
                </View>
                <Form />
                <SignupSection />
                <ButtonSubmit />
            </Wallpaper>
        );
    }
}

const styles = StyleSheet.create({
    titleText: {
        fontFamily: 'bella-fashion',
        fontSize: 60,
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.15)',
        textShadowOffset: { width: -1, height: 0 },
        textShadowRadius: 100
    }
});