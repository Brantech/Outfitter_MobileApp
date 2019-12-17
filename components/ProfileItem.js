import {Image, TouchableOpacity, View} from "react-native";
import React, {Component} from "react";
import {Icon} from "react-native-elements";

export default class ProfileItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            top: "/",
            bottom: "/",
        };
    }

    render() {

        const style = {

            itemImageWrap: {
                width: global.DEVICE_WIDTH * 0.92,
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: 'white',
                borderColor: "gainsboro",
                borderWidth: 1,
                borderRadius: 10,
                marginBottom: global.DEVICE_WIDTH * 0.03
            }
        };

        let rating = [];

        let i;
        for (i = 0; i < this.props.outfit.communityRating; i++) {
            rating.push(<Star key={i} type="star" parent={this} color="#FFD700" val={i + 1}/>);
        }

        while (rating.length !== 5) {
            rating.push(<Star key={i} type="star-border" parent={this} color="black" val={i + 1}/>);
            i = i + 1;
        }

        return (
            <View>
                <View style={style.itemImageWrap} elevation={5}>
                    <View style={{flexDirection: "row"}}>
                        <Image style={{width: global.DEVICE_WIDTH * 0.46 - 2, height: global.DEVICE_WIDTH * 0.46}}
                               source={{uri: this.props.top.imageSource}}/>
                        <Image style={{width: global.DEVICE_WIDTH * 0.46 - 2, height: global.DEVICE_WIDTH * 0.46}}
                               source={{uri: this.props.bottom.imageSource}}/>
                    </View>
                    <View style={{flexDirection: "row"}}>
                        {rating}
                    </View>
                </View>
            </View>
        )
    }
}

class Star extends Component {
    render() {
        return (
            <Icon name={this.props.type} color={this.props.color} size={global.DEVICE_WIDTH * 0.94 * 0.20}/>
        )
    }
}