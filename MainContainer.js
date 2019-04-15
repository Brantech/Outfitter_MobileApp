import React, {Component} from 'react';
import {Font} from 'expo';
import Survey from './pages/Survey';
import LoginRegister from './pages/LoginRegister';
import Closet from './pages/Closet';
import Outfits from './pages/Outfits';
import NavWrap from './NavWrap';
import Profile from './pages/Profile';
import Feed from './pages/Feed';
import Dimensions from 'Dimensions';
import History from "./pages/History";


const apiURL = "http://3.211.39.88:3000/";
const DEVICE_WIDTH = Dimensions.get('window').width;

export default class MainContainer extends Component {

    constructor(props) {
        super(props);

        global.ScreenEnum = {Login: 1, Survey: 2, Closet: 3, Outfits: 4, History: 5, Feed: 6, Profile: 7};
        global.apiURL = apiURL;
        global.DEVICE_WIDTH = DEVICE_WIDTH;

        this.state = {
            fontLoaded: false,
            screen: global.ScreenEnum.Login
        };
    }

    async componentDidMount() {
        await Font.loadAsync({
            'bella-fashion': require('./assets/font/bella-fashion.ttf')
        });

        this.setState({fontLoaded: true});
    }

    displayScreen(screen) {
        this.setState({screen: screen});
    }

    render() {
        let widget;
        switch (this.state.screen) {
            case global.ScreenEnum.Login:
                widget = <LoginRegister nav={this}/>;
                break;
            case global.ScreenEnum.Survey:
                widget = <Survey nav={this}/>;
                break;
            case global.ScreenEnum.Closet:
                widget = <NavWrap nav={this} content={<Closet/>} selected={0}/>;
                break;
            case global.ScreenEnum.Outfits:
                widget = <NavWrap nav={this} content={<Outfits/>} selected={1}/>;
                break;
            case global.ScreenEnum.History:
                widget = <NavWrap nav={this} content={<History />} selected={2}/>;
                break;
            case global.ScreenEnum.Feed:
                widget = <NavWrap nav={this} content={<Feed/>} selected={3}/>;
                break;
            case global.ScreenEnum.Profile:
                widget = <NavWrap nav={this} content={<Profile main={this}/>} selected={4}/>;
                break;
        }

        return (
            widget
        );
    }
}