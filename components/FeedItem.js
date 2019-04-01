import React, {Component} from 'react';
import {
    View,
    Dimensions,
    Text,
    TouchableWithoutFeedback,
    Image,
} from 'react-native';
import { Icon } from 'react-native-elements';

var shirt = require("../assets/images/clothingSample.jpg");
var pants = require("../assets/images/jeans.jpg");

var deviceWidth = Dimensions.get('window').width;

export default class FeedItem extends Component {

    render() {
        rating = []

        var i
        for(i = 0; i < this.props.rating; i++) {
            rating.push(<Icon key={i} name="star" color="yellow" size={deviceWidth * 0.9 * 0.20}/>)
        }

        while(rating.length != 5) {
            rating.push(<Icon key={i} name="star-border" color="black" size={deviceWidth * 0.9 * 0.20}/>)
            i = i + 1
        }

        return (
            <TouchableWithoutFeedback elevation={10} style={{padding: 1}}>
                <View elevation={5} style={{marginLeft: "5%", width: "90%", marginBottom: 10, height: deviceWidth * 0.7, backgroundColor: "white", borderWidth: 1, borderRadius: 10}}>
                    <View style={{flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", padding: "5%"}}>
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