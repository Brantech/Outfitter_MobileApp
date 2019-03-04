import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';

export default class Category extends Component {

    render() {
        return (
            <View style={{width: "100%"}}>
                <TouchableOpacity style={{
                        borderBottomWidth: 1, 
                        borderBottomColor: "black"}}
                        onPress={() => this.props.parent.openCategory(this)}>
                    <View style={style.wrap}>
                        <Text style={style.text}>{this.props.text}</Text>
                        <Icon name="navigate-next" iconStyle={{fontSize: 24}}/>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const style = {
    wrap: {
        width: "100%", 
        display: "flex", 
        flexDirection: "row", 
        alignItems: "center", 
        flexDirection: "row",
        paddingLeft: "3%",
        paddingRight: "3%"
    },

    text: {
        flex: 1, 
        fontSize: 20, 
        paddingTop: "3%", 
        paddingBottom: "3%"
    }
}