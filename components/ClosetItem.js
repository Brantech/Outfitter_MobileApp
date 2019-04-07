import {Image, View} from "react-native";
import React, {Component} from "react";

export default class ClosetItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            src: ""
        };

        this.init();
    }

    init() {
        let garment = new XMLHttpRequest();
        garment.onreadystatechange = () => {
            if (garment.readyState === 4 && garment.status === 200) {
                res = JSON.parse(garment.responseText);
                console.log(res.data);
                this.setState({src: res.data.src});
            }
        };
        garment.open("GET", global.apiURL + "garments/" + this.props.garment.garment_id, true);
        garment.send(null)
    }

    render() {
        return (
            <View style={{height: global.DEVICE_WIDTH / 2 - 30, margin: 15, marginBottom: 0,}}>
                <Image style={{width: "100%", height: "100%"}} source={{uri: this.state.src}}/>
            </View>
        );
    }
}