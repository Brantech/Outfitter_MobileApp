import {AsyncStorage, Image, TouchableOpacity} from "react-native";
import React, {Component} from "react";
import ClosetItem from "./ClosetItem";

export default class Garment extends Component {
    onPress() {
        try {
            AsyncStorage.getItem('accessToken').then((token) => {
                var req = new XMLHttpRequest();
                req.onreadystatechange = () => {
                    if(req.readyState === 4 && req.status === 200) {
                        let res = JSON.parse(req.responseText);

                        let garment = null;
                        for(let i = 0; i < res.data.garments.length; i++) {
                            if(res.data.garments[i]._id === this.props.garment._id) {
                                garment = res.data.garments[i];
                                break;
                            }
                        }

                        let clean = this.props.parent.state.clean;
                        clean.push(<ClosetItem key={(new Date()).getTime()} id={(new Date()).getTime()}
                                               parent={this.props.parent} garment={garment}/>);

                        this.props.parent.setState({clean: clean});
                    }
                };
                req.open("POST", global.apiURL + 'api/users/garments/', true);
                req.setRequestHeader("Content-Type", "application/json");
                req.setRequestHeader("x-access-token", token);
                req.send(JSON.stringify({
                    _id: this.props.garment._id,
                    category: this.props.garment.category,
                    imageSource: this.props.garment.imageSource,
                    tags: ["clean"],
                }))
            })
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <TouchableOpacity key={i} style={{width: "50%"}} onPress={() => this.onPress()}>
                <Image style={{width: "100%", height: global.DEVICE_WIDTH * .9 * .94 * .5}}
                       source={{uri: this.props.garment.imageSource}}/>
            </TouchableOpacity>
        )
    }
}