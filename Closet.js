import React, {Component} from 'react';
import {
    View, 
    ScrollView, 
    Text, 
    TouchableOpacity,
    Dimensions,
    Image
} from 'react-native';

export default class Closet extends Component {
    constructor () {
        super()
    }

    render() {
        var clean = [];
        var dirty = [];

        for(var i = 0; i < 10; i++) {
            clean.push(<Item key={i} src="./assets/images/clothingSample.jpg"/>);
        }
        for(var i = 0; i < 10; i++) {
            dirty.push(<Item key={i} src="./assets/images/clothingSample.jpg"/>);
        }
        
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

                <View style={{backgroundColor: "#4285F4", height: 80.0, width: "100%", flexDirection: "row", padding: 0}}>
                    <View style={style.buttonWrap}>
                        <TouchableOpacity style={style.button}>
                            <Text style={style.buttonText}>Closet</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={style.buttonWrap}>
                        <TouchableOpacity style={style.button}>
                            <Text style={style.buttonText}>Outfit</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={style.buttonWrap}>
                        <TouchableOpacity style={style.button}>
                            <Text style={style.buttonText}>History</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={style.buttonWrap}>
                        <TouchableOpacity style={style.button}>
                            <Text style={style.buttonText}>Feed</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={style.buttonWrap}>
                        <TouchableOpacity style={style.button}>
                            <Text style={style.buttonText}>Profile</Text>
                        </TouchableOpacity>
                    </View>
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
                <Image style={{width: "100%", height: "100%"}} source={{uri: "http://www.tucacasbeachhotel.com/images/fc-Icon_mg14/Icon-One-Thousand-Underground-Tee-0001.jpg"}}/>
            </View>
        );
    }
}

const style = {
    buttonWrap: {
        flex: 1, 
        height: "100%", 
        backgroundColor: "white", 
        borderWidth: 1,
        borderColor: "gainsboro",
    },

    button: {
        height: "100%",
        width: "100%",
        alignContent: "center",
        justifyContent: "center",
    },

    buttonText: {
        textAlign: "center",
    },

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