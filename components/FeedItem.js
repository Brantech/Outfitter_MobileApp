import {AsyncStorage, Image, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View, TextInput} from "react-native";
import React, {Component} from "react";
import {Icon} from "react-native-elements";

export default class FeedItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            ready1: false,
            ready2: false,
            top: {},
            bottom: {},
            text: props.outfit.category,
            myRating: 0,
            outfit: props.outfit
        };

        this.init();
    }

    init() {
        AsyncStorage.getItem('accessToken').then((token) => {
            let req = new XMLHttpRequest();
            req.onreadystatechange = () => {
                if(req.readyState === 4 && req.status === 200) {
                    let res = JSON.parse(req.responseText);

                    this.setState({top: res.data.imageSource, ready1: true});
                }
            };
            req.open("GET", global.apiURL + 'api/garments/' + this.props.outfit.garments[0], true);
            req.setRequestHeader("x-access-token", token);
            req.send(null);

            let req2 = new XMLHttpRequest();
            req2.onreadystatechange = () => {
                if(req2.readyState === 4 && req2.status === 200) {
                    let res = JSON.parse(req2.responseText);

                    this.setState({bottom: res.data.imageSource, ready2: true});
                }
            };
            req2.open("GET", global.apiURL + 'api/garments/' + this.props.outfit.garments[1], true);
            req2.setRequestHeader("x-access-token", token);
            req2.send(null);
        });
    }

    rate() {
        AsyncStorage.getItem('accessToken').then((token) => {
            let req = new XMLHttpRequest();
            req.onreadystatechange = () => {
                if(req.readyState === 4 && req.status === 200) {
                    let res = JSON.parse(req.responseText);

                    this.setState({outfit: res.data, modalVisible: false});
                } else if(req.readyState === 4) {
                    console.log(req.responseText)
                }
            };
            req.open("PUT", global.apiURL + 'api/users/rate/', true);
            req.setRequestHeader("x-access-token", token);
            req.setRequestHeader("Content-Type", "application/json");
            req.send(JSON.stringify({outfitId: this.state.outfit._id, owner: this.props.user, rating: this.state.myRating}));
        })
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
        };

        let rating = [];

        let i;
        for (i = 0; i < this.state.outfit.communityRating; i++) {
            rating.push(<Star key={i} type="star" parent={this} color="#FFD700" val={i + 1}/>);
        }

        while (rating.length !== 5) {
            rating.push(<Star key={i} type="star-border" parent={this} color="black" val={i + 1}/>);
            i = i + 1;
        }

        let myRating = [];
        for (i = 0; i < this.state.myRating; i++) {
            myRating.push(<TouchableStar key={i} type="star" parent={this} color="#FFD700" val={i + 1}/>);
        }

        while (myRating.length !== 5) {
            myRating.push(<TouchableStar key={i} type="star-border" parent={this} color="black" val={i + 1}/>);
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
                                    paddingBottom: 0,
                                    width: "70%",
                                    backgroundColor: "white",
                                    borderRadius: 10,
                                    borderWidth: 1
                                }}>

                                    <View style={{flexDirection: "row", marginBottom: global.DEVICE_WIDTH * 0.05}}>
                                        {myRating}
                                    </View>

                                    <View style={{flexDirection: "row"}}>
                                        <TouchableOpacity style={{marginRight: "4%"}} onPress={() => this.setState({modalVisible: false})}>
                                            <View style={{...innerStyle.halfButton, ...{backgroundColor: "red", borderColor: "red"}}}>
                                                <Text style={{
                                                    color: "white",
                                                    textAlign: "center",
                                                    fontSize: 16
                                                }}>Cancel</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{marginBottom: "4%"}} onPress={() => this.rate()}>
                                            <View style={innerStyle.halfButton}>
                                                <Text style={{
                                                    color: "white",
                                                    textAlign: "center",
                                                    fontSize: 16
                                                }}>Rate</Text>
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
                                   source={{uri: this.state.ready1 ? this.state.top : '/'}}/>
                            <Image style={{width: global.DEVICE_WIDTH * 0.46 - 2, height: global.DEVICE_WIDTH * 0.46}}
                                   source={{uri: this.state.ready2 ? this.state.bottom : '/'}}/>
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

class TouchableStar extends Component {
    render() {
        return (
            <TouchableOpacity onPress={() => this.props.parent.setState({myRating: this.props.val, rated: true})}>
                <Icon name={this.props.type} color={this.props.color} size={global.DEVICE_WIDTH * 0.7 * 0.94 * 0.195}/>
            </TouchableOpacity>
        )
    }
}