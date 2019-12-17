import {AsyncStorage, Image, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import React, {Component} from "react";

export default class ClosetItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false
        };
    }

    move() {
        let index = this.props.garment.tags.indexOf("clean");

        if(index > -1) {
            this.props.garment.tags.splice(index, 1);
            this.props.garment.tags.push("dirty");
        } else {
            this.props.garment.tags.splice(this.props.garment.tags.indexOf("dirty"), 1);
            this.props.garment.tags.push("clean");
        }

        AsyncStorage.getItem('accessToken').then((token) => {
            let req = new XMLHttpRequest();
            req.onreadystatechange = () => {
                if (req.readyState === 4 && req.status === 200) {
                    let res = JSON.parse(req.responseText);

                    this.setState({modalVisible: false});
                    this.props.parent.move(this);
                }
            };
            req.open("PUT", global.apiURL + "api/users/garments/" + this.props.garment._id);
            req.setRequestHeader("Content-Type", "application/json");
            req.setRequestHeader("x-access-token", token);
            req.send(JSON.stringify({tags: this.props.garment.tags}));
        });
    }

    delete() {
        AsyncStorage.getItem('accessToken').then((token) => {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    res = JSON.parse(xhr.responseText);

                    if(res.success) {
                        this.setState({modalVisible: false});
                        this.props.parent.remove(this);
                    }
                }
            };
            xhr.open("DELETE", global.apiURL + "api/users/garments/" + this.props.garment._id);
            xhr.setRequestHeader("x-access-token", token);
            xhr.send(null);
        })
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this.setState({modalVisible: true})}>
                <View style={{height: global.DEVICE_WIDTH / 2 - 30, margin: 15, marginBottom: 0,}}>
                    <Image style={{width: "100%", height: "100%"}} source={{uri: this.props.garment.imageSource}}/>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => null}
                    >
                        <TouchableWithoutFeedback onPressOut={(e) => this.setState({modalVisible: false})}>
                            <View style={{
                                width: "100%",
                                height: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: 'rgba(0,0,0,0.5)'
                            }}>
                                <View style={{backgroundColor: "white", width: "80%", justifyContent: "center", alignItems: "center"}}>
                                    <TouchableOpacity style={{width: "85%", marginTop: 15, marginBottom: 10}} onPress={() => this.move()}>
                                        <View style={{backgroundColor: "#4285F4", borderRadius: 15, borderWidth: 1, borderColor: "#4285F4"}}>
                                            <Text style={{color: "white", textAlign: "center", fontSize: 36}}>
                                                <Text>Mark as </Text>
                                                <Text>{this.props.garment.tags.includes("clean") ? "Dirty" : "Clean"}</Text>
                                            </Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{width: "85%", marginBottom: 15}} onPress={() => this.delete()}>
                                        <View style={{backgroundColor: "red", borderRadius: 15, borderWidth: 1, borderColor: "red"}}>
                                            <Text style={{color: "white", textAlign: "center", fontSize: 36}}>Delete</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                </View>
            </TouchableOpacity>
        );
    }
}