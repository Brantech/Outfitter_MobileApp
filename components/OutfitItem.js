import {AsyncStorage, Image, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import React, {Component} from "react";

export default class OutfitItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            ready1: false,
            ready2: false,
            top: {},
            bottom: {}
        };

    }

    delete() {
        AsyncStorage.getItem('accessToken').then((token) => {
            let req = new XMLHttpRequest();
            req.onreadystatechange = () => {
                if(req.readyState === 4 && req.status === 200) {
                    let res = JSON.parse(req.responseText);

                    let outfits = this.props.parent.state.outfits;

                    console.log(outfits);
                    let index = 0;
                    for(let i = 0; i < outfits.length; i++) {
                        if(outfits[i]._id === this.props.outfit._id) {
                            index = i;
                        }
                    }

                    outfits.splice(index, 1);
                    this.props.parent.setState({outfits: outfits});
                    this.setState({modalVisible: false});
                }
            };
            req.open("DELETE", global.apiURL + 'api/users/outfits/' + this.props.outfit._id, true);
            req.setRequestHeader("x-access-token", token);
            req.send(null);
        });
    }

    render() {

        const style = {

            itemImageWrap: {
                width: global.DEVICE_WIDTH * 0.46,
                height: global.DEVICE_WIDTH * 0.23,
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: 'white',
                margin: "2%",
                borderColor: "gainsboro",
                borderWidth: 1,
                borderRadius: 10,
            }
        };

        const innerStyle = {
            popupButton: {
                backgroundColor: "#4285F4",
                width: global.DEVICE_WIDTH * 0.64 * 0.9,
                height: 50,
                justifyContent: "center",
                borderColor: "#4285F4",
                borderRadius: 25,
                borderWidth: 1
            },
            deleteButton: {
                backgroundColor: "red",
                width: global.DEVICE_WIDTH * 0.64 * 0.9,
                height: 50,
                justifyContent: "center",
                borderColor: "red",
                borderRadius: 25,
                borderWidth: 1
            }
        };

        return (
            <View>
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
                            <TouchableWithoutFeedback>
                                <View style={{
                                    padding: "3%",
                                    paddingBottom: 0,
                                    width: "70%",
                                    height: "50%",
                                    backgroundColor: "white",
                                    borderRadius: 10,
                                    borderWidth: 1
                                }}>
                                    <View style={{flex: 1, flexDirection: "row"}}>
                                        <Image style={{width: "50%", height: "100%"}} source={{uri: this.props.top.imageSource}}/>
                                        <Image style={{width: "50%", height: "100%"}} source={{uri: this.props.bottom.imageSource}}/>
                                    </View>
                                    <View style={{
                                        flex: 1,
                                        width: "100%",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                        <TouchableOpacity style={{marginBottom: "4%"}}>
                                            <View style={innerStyle.popupButton}>
                                                <Text style={{
                                                    color: "white",
                                                    textAlign: "center",
                                                    fontSize: 16
                                                }}>Wear</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{marginBottom: "4%"}}>
                                            <View style={innerStyle.popupButton}>
                                                <Text style={{
                                                    color: "white",
                                                    textAlign: "center",
                                                    fontSize: 16
                                                }}>Share</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.delete()}>
                                            <View style={innerStyle.deleteButton}>
                                                <Text style={{
                                                    color: "white",
                                                    textAlign: "center",
                                                    fontSize: 16
                                                }}>Delete</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

                <TouchableOpacity onPress={() => this.setState({modalVisible: true})}>
                    <View style={style.itemImageWrap}
                          elevation={5}>
                        <Image style={{width: global.DEVICE_WIDTH * 0.23 - 2, height: global.DEVICE_WIDTH * 0.23 - 15}}
                               source={{uri: this.props.top.imageSource}}/>
                        <Image style={{width: global.DEVICE_WIDTH * 0.23 - 2, height: global.DEVICE_WIDTH * 0.23 - 15}}
                               source={{uri: this.props.bottom.imageSource}}/>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}