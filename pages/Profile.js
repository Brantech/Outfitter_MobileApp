import React, {Component} from 'react';
import {AsyncStorage, Dimensions, Image, ScrollView, Text, View} from 'react-native';
import FeedItem from '../components/FeedItem';

var profile = require("../assets/images/cage.jpg");
var deviceWidth = Dimensions.get('window').width;

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            ready: false
        };

        this.init()
    }

    init() {
        let self = this;

        AsyncStorage.getItem('idToken').then((token) => {
            var req = new XMLHttpRequest();
            req.onreadystatechange = function () {
                if (req.readyState === 4 && req.status === 200) {
                    let res = JSON.parse(req.responseText);
                    if (res["success"]) {
                        self.setState({username: res.data.username, ready: true});
                    }
                }
            };
            req.open("GET", global.apiURL + 'users/' + token, true);
            req.send(null);
        })
    }

    render() {
        return (
            <View style={{width: "100%", height: "100%"}}>
                <View style={{
                    backgroundColor: "#4285F4",
                    height: "8%",
                    alignItems: "center",
                    paddingLeft: "3%",
                    paddingRight: "3%",
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
                            <Text style={{fontSize: 24}}>{this.state.username}</Text>
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