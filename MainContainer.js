import React, {Component} from 'react';
import {Font} from 'expo';
import Survey from './Survey';
import Login from './Login';
import Closet from './Closet';
import Outfits from './Outfits';
import NavWrap from './NavWrap';
import Profile from './Profile';

export var ScreenEnum = {Login: 1, Survey: 2, Closet: 3, Outfits: 4, Profile: 7};

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
                widget = <NavWrap content={<Closet/>} selected={0}/>
                break;
            case ScreenEnum.Outfits:
                widget = <NavWrap content={<Outfits />} selected={1}/>
                break;
            case ScreenEnum.Profile:
                widget = <NavWrap content={<Profile />}  selected={4}/>
        }

        return (
            widget
        );
    }
}