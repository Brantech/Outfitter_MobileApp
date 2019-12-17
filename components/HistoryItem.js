import {Image, View, Text} from "react-native";
import React, {Component} from "react";

export default class HistoryItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            modal2Visible: false,
            ready1: false,
            ready2: false,
            shared: props.outfit.shared,
            top: {},
            bottom: {},
            text: props.outfit.category
        };

    }

    render() {
        const style = {

            itemImageWrap: {
                width: global.DEVICE_WIDTH * 0.46,
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: 'white',
                borderColor: "gainsboro",
                borderWidth: 1,
                borderRadius: 10,
                marginLeft: this.props.id % 2 === 1 ? global.DEVICE_WIDTH * 0.019 : 0,
                marginBottom: global.DEVICE_WIDTH * 0.02
            }
        };

        let date = this.props.outfit.dateWorn.substring(0, this.props.outfit.dateWorn.lastIndexOf("T")).split('-');
        if(date[0][0] === '0')
            date[0] = date[0][1];
        if(date[1][0] === '0')
            date[1] = date[1][1];

        return (
            <View>
                <View style={style.itemImageWrap} elevation={5}>
                    <View style={{flexDirection: "row"}}>
                        <Image style={{width: global.DEVICE_WIDTH * 0.23 - 2, height: global.DEVICE_WIDTH * 0.23 - 15}}
                               source={{uri: this.props.top.imageSource}}/>
                        <Image style={{width: global.DEVICE_WIDTH * 0.23 - 2, height: global.DEVICE_WIDTH * 0.23 - 15}}
                               source={{uri: this.props.bottom.imageSource}}/>
                    </View>
                    <View>
                        <Text style={{textAlign: "center"}}>{date[1] + '/' + date[2] + '/' + date[0]}</Text>
                    </View>
                </View>
            </View>
        )
    }
}