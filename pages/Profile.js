import React, {Component} from 'react';
import {Dimensions, Image, ScrollView, Text, View} from 'react-native';
import FeedItem from '../components/FeedItem';

var profile = require("../assets/images/cage.jpg");
var deviceWidth = Dimensions.get('window').width;

export default class Profile extends Component {
    render() {
        return (
            <View style={{width: "100%", height: "100%"}}>
                <View style={{
                    backgroundColor: "#4285F4",
                    paddingTop: 35,
                    paddingBottom: 15,
                    paddingLeft: "3%",
                    flexDirection: "row"
                }}>
                    <Text style={{textAlign: "center", color: "white", fontSize: 25, flex: 1}}>Profile</Text>
                </View>

                <View style={{flex: 1, paddingTop: 15}}>
                    <View style={{flexDirection: "row", marginLeft: "5%", marginRight: "5%"}}>
                        <Image source={profile} style={{
                            width: deviceWidth * 0.45,
                            height: deviceWidth * 0.45,
                            borderRadius: deviceWidth * 0.45 * 0.5
                        }}/>
                        <View style={{paddingLeft: 15, paddingRight: 15}}>
                            <Text style={{fontSize: 24}}>CageMaster594</Text>
                            <Text>This is my status message</Text>
                        </View>
                    </View>
                    <ScrollView style={{flex: 1, paddingTop: 15}}>
                        <FeedItem wearer={"CageMaster594"} rating={3}/>
                    </ScrollView>
                </View>
            </View>
        )
    }
}