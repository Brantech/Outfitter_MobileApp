import React, {Component} from 'react';
import {
    View, 
    ScrollView, 
    Text, 
    Dimensions,
    Image
} from 'react-native';

var shirt = require("./assets/images/clothingSample.jpg");
var shirt2 = require("./assets/images/shirt2.jpg");
var pants = require("./assets/images/jeans.jpg");
var shorts = require("./assets/images/shorts.jpg");

export default class Closet extends Component {
    constructor () {
        super()
    }

    goToOutfits() {
        
    }

    render() {
        var clean = [];
        var dirty = [];

        clean.push(<Item key={0} src={shirt}/>);
        clean.push(<Item key={1} src={pants}/>);
        dirty.push(<Item key={0} src={shirt2}/>);
        dirty.push(<Item key={1} src={shorts}/>);
        
        return (
            <View style={{width: "100%", height: "100%"}}>
                <View style={{backgroundColor: "#4285F4", paddingTop: 35, paddingBottom: 15}}>
                    <Text style={{textAlign: "center", color: "white", fontSize: 25}}>Closet</Text>
                </View>

                <View style={{flexDirection: "row"}}>
                    <View style={{flex: 1, borderColor: "gainsboro", borderRightWidth: 1, borderBottomWidth: 1}}>
                        <Text style={{textAlign: "center", fontSize: 20}}>Clean</Text>
                    </View>
                    <View style={{flex: 1, borderColor: "gainsboro", borderBottomWidth: 1}}>
                        <Text style={{textAlign: "center", fontSize: 20}}>Dirty</Text>
                    </View>
                </View>

                <View style={{flexDirection: "row", flex: 1}}>
                    <ScrollView style={style.itemList}>
                        {clean}
                    </ScrollView>
                    <ScrollView style={style.itemList}>
                        {dirty}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

class Item extends Component {
    constructor(props) {
        super(props);

        this.state = {
            src: props.src,
        }
    }

    render() {
        var img = this.state.src;

        return (
            <View style={style.item}>
                <Image style={{width: "100%", height: "100%"}} source={this.props.src}/>
            </View>
        );
    }
}

const style = {

    itemList: {
        height: "100%", 
        borderRightColor: "gainsboro", 
        borderRightWidth: 1,
    },

    item: {
        height: Dimensions.get('window').width / 2 - 30, 
        margin: 15,
        marginBottom: 0,
    }
}