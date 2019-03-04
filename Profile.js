import React, {Component} from 'react';
import {
    View,
    ScrollView,
    Dimensions,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    Modal
} from 'react-native';
import { Icon } from 'react-native-elements';

var profile = require("./assets/images/cage.jpg")

var deviceWidth = Dimensions.get('window').width;

export default class Profile extends Component {
    render() {
        return (
            <View style={{width: "100%", height: "100%"}}>
                <View style={{backgroundColor: "#4285F4", paddingTop: 35, paddingBottom: 15, paddingLeft: "3%", paddingRight: "3%", flexDirection: "row"}}>
                    <Text style={{textAlign: "center", color: "white", fontSize: 25, flex: 1}}>Profile</Text>
                </View>

                <ScrollView style={{flex: 1}}>
                    <View style={{justifyContent: "center"}}>
                        <View>
                            <Image source={profile} style={{width: deviceWidth * 0.45, height: deviceWidth * 0.45, borderRadius: deviceWidth * 0.45 * 0.5}}/>
                        </View>
                        <View>
                            <Text style={{fontSize: 24, textAlign: "center"}}>CageMaster594</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}