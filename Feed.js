import React, {Component} from 'react';
import {
    View,
    Dimensions,
    Text,
    ScrollView
} from 'react-native';
import FeedItem from './components/FeedItem';

var profile = require("./assets/images/cage.jpg")
var deviceWidth = Dimensions.get('window').width;

export default class Feed extends Component {
    render() {
        return (
            <View style={{width: "100%", height: "100%"}}>
                <View style={{backgroundColor: "#4285F4", paddingTop: 35, paddingBottom: 15, paddingLeft: "3%", paddingRight: "3%", flexDirection: "row"}}>
                    <Text style={{textAlign: "center", color: "white", fontSize: 25, flex: 1}}>Feed</Text>
                </View>

                <ScrollView style={{flex: 1, paddingTop: "3%", paddingBottom: "5%"}}>
                    <FeedItem wearer={"CageMaster594"} rating={3}/>
                    <FeedItem wearer={"CageMaster594"} rating={3}/>
                    <FeedItem wearer={"CageMaster594"} rating={3}/>
                    <FeedItem wearer={"CageMaster594"} rating={3}/>
                    <FeedItem wearer={"CageMaster594"} rating={3}/>
                </ScrollView>
            </View>
        )
    }
}