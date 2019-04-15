import {AsyncStorage, Image, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View, TextInput} from "react-native";
import React, {Component} from "react";
import {Icon} from "react-native-elements";

export default class OutfitItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            modal2Visible: false,
            shared: props.outfit.shared,
            top: {},
            bottom: {},
            text: props.outfit.category
        };

    }

    wear() {
        AsyncStorage.getItem('accessToken').then((token) => {
            let req = new XMLHttpRequest();
            req.onreadystatechange = () => {
                if(req.readyState === 4 && req.status === 200) {
                    var res = JSON.parse(req.responseText);

                    this.setState({modalVisible: false});
                }
            };
            req.open("POST", global.apiURL + 'api/users/outfits/wear/' + this.props.outfit._id, true);
            req.setRequestHeader("x-access-token", token);
            req.send(null);
        });
    }

    share() {
        AsyncStorage.getItem('accessToken').then((token) => {
            let req = new XMLHttpRequest();
            req.onreadystatechange = () => {
                if(req.readyState === 4 && req.status === 200) {
                    let res = JSON.parse(req.responseText);

                    this.setState({shared: res.data.outfits[res.modifiedOutfit].shared});
                }
            };
            req.open("PUT", global.apiURL + 'api/users/outfits/' + this.props.outfit._id, true);
            req.setRequestHeader("x-access-token", token);
            req.setRequestHeader("Content-Type", "application/json");
            req.send(JSON.stringify({shared: !this.state.shared}));
        });
    }

    setCategory() {
        AsyncStorage.getItem('accessToken').then((token) => {
            let req = new XMLHttpRequest();
            req.onreadystatechange = () => {
                if(req.readyState === 4 && req.status === 200) {
                    let res = JSON.parse(req.responseText);

                    let categories = {All: true, Uncategorized: true,};
                    for(let i in res.data.outfits) {
                        if(res.data.outfits[i].category != null && res.data.outfits[i].category.trim() !== "") {
                            categories[res.data.outfits[i].category] = true;
                        }
                    }

                    this.setState({modal2Visible: false});
                    this.props.parent.setState({outfits: res.data.outfits, profile: res.data, categories: Object.keys(categories).sort()});
                }
            };
            req.open("PUT", global.apiURL + 'api/users/outfits/' + this.props.outfit._id, true);
            req.setRequestHeader("x-access-token", token);
            req.setRequestHeader("Content-Type", "application/json");
            req.send(JSON.stringify({category: this.state.text == null ? "" : this.state.text}));
        });
    }

    delete() {
        AsyncStorage.getItem('accessToken').then((token) => {
            let req = new XMLHttpRequest();
            req.onreadystatechange = () => {
                if(req.readyState === 4 && req.status === 200) {
                    let res = JSON.parse(req.responseText);

                    let outfits = this.props.parent.state.outfits;

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
                width: global.DEVICE_WIDTH * 0.92,
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: 'white',
                borderColor: "gainsboro",
                borderWidth: 1,
                borderRadius: 10,
                marginBottom: global.DEVICE_WIDTH * 0.03
            }
        };

        const innerStyle = {
            halfButton: {
                backgroundColor: "#4285F4",
                width: global.DEVICE_WIDTH * 0.7 * 0.94 * 0.46,
                height: 50,
                justifyContent: "center",
                borderColor: "#4285F4",
                borderRadius: 25,
                borderWidth: 1
            },
            fullButton: {
                backgroundColor: "#4285F4",
                width: global.DEVICE_WIDTH * 0.7 * 0.92,
                height: 50,
                justifyContent: "center",
                borderColor: "#4285F4",
                borderRadius: 25,
                borderWidth: 1
            }
        };

        let rating = [];

        let i;
        for (i = 0; i < this.props.outfit.rating; i++) {
            rating.push(<Star key={i} type="star" parent={this} color="#FFD700" val={i + 1}/>);
        }

        while (rating.length !== 5) {
            rating.push(<Star key={i} type="star-border" parent={this} color="black" val={i + 1}/>);
            i = i + 1;
        }

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
                                    width: "70%",
                                    //height: "50%",
                                    backgroundColor: "white",
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    text: "",
                                }}>
                                    <View style={{flexDirection: "row", marginBottom: "4%"}}>
                                        <Image style={{width: "50%", height: global.DEVICE_WIDTH * 0.7 * 0.94 * 0.5}} source={{uri: this.props.top.imageSource}}/>
                                        <Image style={{width: "50%", height: global.DEVICE_WIDTH * 0.7 * 0.94 * 0.5}} source={{uri: this.props.bottom.imageSource}}/>
                                    </View>
                                    <View style={{
                                        //flex: 1,
                                        flexDirection: "row",
                                        flexWrap: "wrap",
                                        width: "100%",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                        <TouchableOpacity style={{marginBottom: global.DEVICE_WIDTH * 0.02, marginRight: "4%"}} onPress={() => this.wear()}>
                                            <View style={innerStyle.halfButton}>
                                                <Text style={{
                                                    color: "white",
                                                    textAlign: "center",
                                                    fontSize: 16
                                                }}>Wear</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{marginBottom: global.DEVICE_WIDTH * 0.02}} onPress={() => this.share()}>
                                            <View style={innerStyle.halfButton}>
                                                <Text style={{
                                                    color: "white",
                                                    textAlign: "center",
                                                    fontSize: 16
                                                }}>{this.state.shared ? "Unshare" : "Share"}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{marginBottom: global.DEVICE_WIDTH * 0.03}} onPress={() => this.setState({modal2Visible: true})}>
                                            <View style={innerStyle.fullButton}>
                                                <Text style={{
                                                    color: "white",
                                                    textAlign: "center",
                                                    fontSize: 16
                                                }}>Category</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity  onPress={() => this.delete()}>
                                            <View style={{...innerStyle.fullButton, ...{backgroundColor: "red", borderColor: "red"}}}>
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

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modal2Visible}
                    onRequestClose={() => null}
                >
                    <TouchableWithoutFeedback onPressOut={(e) => this.setState({modal2Visible: false})}>
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
                                    backgroundColor: "white",
                                    borderRadius: 10,
                                    borderWidth: 1
                                }}>
                                    <TextInput
                                        style={{height: 50, backgroundColor: "gainsboro", borderColor: "black", borderWidth: 1, marginBottom: global.DEVICE_WIDTH * 0.02, paddingLeft: "3%", paddingRight: "3%"}}
                                        onChangeText={(text) => this.setState({text: text})}
                                        value={this.state.text}
                                    />

                                    <View style={{flexDirection: "row", flexWrap: "wrap", width: "100%"}}>
                                        <TouchableOpacity style={{marginRight: "4%"}} onPress={() => this.setState({modal2Visible: false})}>
                                            <View style={{...innerStyle.halfButton, ...{backgroundColor: "red", borderColor: "red"}}}>
                                                <Text style={{
                                                    color: "white",
                                                    textAlign: "center",
                                                    fontSize: 16
                                                }}>Cancel</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{marginBottom: "4%"}} onPress={() => this.setCategory()}>
                                            <View style={innerStyle.halfButton}>
                                                <Text style={{
                                                    color: "white",
                                                    textAlign: "center",
                                                    fontSize: 16
                                                }}>Set</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

                <TouchableOpacity onPress={() => this.setState({modalVisible: true})}>
                    <View style={style.itemImageWrap} elevation={5}>
                        <View style={{flexDirection: "row"}}>
                            <Image style={{width: global.DEVICE_WIDTH * 0.46 - 2, height: global.DEVICE_WIDTH * 0.46}}
                                   source={{uri: this.props.top.imageSource}}/>
                            <Image style={{width: global.DEVICE_WIDTH * 0.46 - 2, height: global.DEVICE_WIDTH * 0.46}}
                                   source={{uri: this.props.bottom.imageSource}}/>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            {rating}
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

class Star extends Component {
    render() {
        return (
            <Icon name={this.props.type} color={this.props.color} size={global.DEVICE_WIDTH * 0.94 * 0.20}/>
        )
    }
}