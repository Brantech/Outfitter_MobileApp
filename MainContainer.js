import React, {Component} from 'react';
import {Font} from 'expo';
import Survey from './Survey';
import Login from './Login';
import Closet from './Closet';

export var ScreenEnum = {Login: 1, Survey: 2, Closet: 3};

export var widgetWrap;


export default class MainContainer extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            fontLoaded: false,
            screen: ScreenEnum.Login
        };

        widgetWrap = this;
    }

    async componentDidMount() {
        await Font.loadAsync({
            'bella-fashion': require('./assets/font/bella-fashion.ttf')
        });

        this.setState({ fontLoaded: true });
    }

    displayScreen(screen) {
        this.setState({screen: screen});
    }

    render() {
        var widget;
        switch(this.state.screen) {
            case ScreenEnum.Login:
                widget = <Login/>
                break;
            case ScreenEnum.Survey:
                widget = <Survey/>
                break;
            case ScreenEnum.Closet:
                widget = <Closet/>
                break;
        }

        return (
            widget
        );
    }
}