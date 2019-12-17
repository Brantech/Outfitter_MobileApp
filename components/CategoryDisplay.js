import {Text, View} from "react-native";
import OutfitItem from "./OutfitItem";
import React, {Component} from "react";

export default class CategoryDisplay extends Component {
    render() {
        return (
            <View>
                <View style={{
                    marginTop: "2%",
                    marginBottom: "2%",
                    paddingBottom: "2%",
                    borderBottomColor: "gainsboro",
                    borderBottomWidth: 1
                }}>
                    <Text style={{textAlign: "center", fontSize: 20,}}>{this.props.category}</Text>
                </View>
                <View style={{flexDirection: "row"}}>
                    <OutfitItem/>
                    <OutfitItem/>
                </View>
            </View>
        )
    }
}