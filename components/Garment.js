import {AsyncStorage, Image, TouchableOpacity} from "react-native";
import React, {Component} from "react";
import ClosetItem from "./ClosetItem";

export default class Garment extends Component {
    onPress() {
        try {
            AsyncStorage.getItem('idToken').then((token) => {
                var req = new XMLHttpRequest();
                req.open("POST", global.apiURL + 'wardrobe/' + token, true);
                req.onreadystatechange = () => {
                    if(req.readyState === 4 && req.status === 200) {
                        let res = JSON.parse(req.responseText);

                        if(res.success) {
                            let clean = this.props.parent.state.clean;
                            clean.push(<ClosetItem key={(new Date()).getTime()} id={(new Date()).getTime()}
                                                   parent={this.props.parent} garment={res.data}/>);

                            this.props.parent.setState({clean: clean});
                        }
                    }
                };
                req.setRequestHeader("Content-Type", "application/json");
                req.send(JSON.stringify({
                    garment_id: this.props.garment._id,
                    src: this.props.garment.src,
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
                       source={{uri: this.props.garment.src}}/>
            </TouchableOpacity>
        )
    }
}