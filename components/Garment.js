import {AsyncStorage, Image, TouchableOpacity} from "react-native";
import React, {Component} from "react";

export default class Garment extends Component {
    onPress() {
        try {
            AsyncStorage.getItem('idToken').then((token) => {
                var req = new XMLHttpRequest();
                req.open("POST", global.apiURL + 'wardrobe/' + token, true);
                req.setRequestHeader("Content-Type", "application/json");
                req.send(JSON.stringify({
                    garment_id: this.props.garment._id,
                    tags: ["clean"],
                }))
            })
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        console.log(this.props.garment);
        return (
            <TouchableOpacity key={i} style={{width: "50%"}} onPress={() => this.onPress()}>
                <Image style={{width: "100%", height: global.DEVICE_WIDTH * .9 * .94 * .5}}
                       source={{uri: this.props.garment.src}}/>
            </TouchableOpacity>
        )
    }
}