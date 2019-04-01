import React, {Component} from 'react';
import {
    View, 
    Text,
    TouchableOpacity,
} from 'react-native';
import {Icon} from "react-native-elements";

export default class NavWrap extends Component {
    render() {
        return (
            <View style={{height: "100%", width: "100%"}}>
                <View style={{flex: 1}}>
                    {this.props.content}
                </View>
                <View style={{backgroundColor: "#4285F4", height: 80.0, width: "100%", flexDirection: "row", padding: 0}}>
                    <View style={this.props.selected === 0 ? style.buttonWrapActive : style.buttonWrap}>
                        <TouchableOpacity style={style.button} onPress={() => this.nav.displayScreen(global.ScreenEnum.Closet)}>
                            <Icon name="layers" color="white" iconStyle={{fontSize: 52}}/>
                            <Text style={style.buttonText}>Closet</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={this.props.selected === 1 ? style.buttonWrapActive : style.buttonWrap}>
                        <TouchableOpacity style={style.button} onPress={() => this.nav.displayScreen(global.ScreenEnum.Outfits)}>
                            <Icon name="style" color="white" iconStyle={{fontSize: 52}}/>
                            <Text style={style.buttonText}>Outfits</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={this.props.selected === 2 ? style.buttonWrapActive : style.buttonWrap}>
                        <TouchableOpacity style={style.button}>
                            <Icon name="history" color="white" iconStyle={{fontSize: 48}}/>
                            <Text style={style.buttonText}>History</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={this.props.selected === 3 ? style.buttonWrapActive : style.buttonWrap}>
                        <TouchableOpacity style={style.button} onPress={() => this.nav.displayScreen(global.ScreenEnum.Feed)}>
                            <Icon name="comment" color="white" iconStyle={{fontSize: 48}}/>
                            <Text style={style.buttonText}>Feed</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={this.props.selected === 4 ? style.buttonWrapActive : style.buttonWrap}>
                        <TouchableOpacity style={style.button} onPress={() => this.nav.displayScreen(global.ScreenEnum.Profile)}>
                            <Icon name="account-circle" color="white" iconStyle={{fontSize: 48}}/>
                            <Text style={style.buttonText}>Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const style = {
    buttonWrap: {
        flex: 1, 
        height: "100%", 
        backgroundColor: "#4285F4", 
        borderWidth: 1,
        borderColor: "gainsboro",
    },

    buttonWrapActive: {
        flex: 1, 
        height: "100%", 
        backgroundColor: "#5692f5", 
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
        color: "white"
    },
}