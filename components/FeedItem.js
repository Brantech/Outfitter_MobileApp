import React, {Component} from 'react';
import {Image, Text, TouchableWithoutFeedback, View,} from 'react-native';
import {Icon} from 'react-native-elements';

let shirt = require("../assets/images/clothingSample.jpg");
let pants = require("../assets/images/jeans.jpg");

export default class FeedItem extends Component {

    render() {
        rating = [];

        let i;
        for (i = 0; i < this.props.rating; i++) {
            rating.push(<Icon key={i} name="star" color="yellow" size={global.DEVICE_WIDTH * 0.9 * 0.20}/>);
        }

        while (rating.length !== 5) {
            rating.push(<Icon key={i} name="star-border" color="black" size={global.DEVICE_WIDTH * 0.9 * 0.20}/>);
            i = i + 1;
        }

        return (
            <TouchableWithoutFeedback elevation={10} style={{padding: 1}}>
                <View elevation={5} style={{
                    marginLeft: "5%",
                    width: "90%",
                    marginBottom: 10,
                    height: global.DEVICE_WIDTH * 0.7,
                    backgroundColor: "white",
                    borderWidth: 1,
                    borderRadius: 10
                }}>
                    <View style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "5%"
                    }}>
                        <Image resizeMode={"contain"} style={{width: "45%", marginRight: "10%"}} source={shirt}/>
                        <Image resizeMode={"contain"} style={{width: "45%"}} source={pants}/>
                    </View>
                    <View style={{flex: 1, paddingTop: "3%"}}>
                        <Text style={{textAlign: "center"}}>
                            <Text>Worn by '</Text>
                            <Text style={{textDecorationLine: "underline"}}>{this.props.wearer}</Text>
                            <Text>'</Text>
                        </Text>
                        <View style={{flexDirection: "row"}}>
                            {rating}
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}