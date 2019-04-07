import {Image, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import {Component, React} from "react";

let shirt = require("../assets/images/clothingSample.jpg");
let pants = require("../assets/images/jeans.jpg");

export default class OutfitItem extends Component {
    state = {
        modalVisible: false
    };

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
                                    height: "40%",
                                    backgroundColor: "white",
                                    borderRadius: 10,
                                    borderWidth: 1
                                }}>
                                    <View style={{flex: 1, flexDirection: "row"}}>
                                        <Image style={{width: "50%", height: "100%"}} source={shirt}/>
                                        <Image style={{width: "50%", height: "100%"}} source={pants}/>
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
                                        <TouchableOpacity>
                                            <View style={innerStyle.popupButton}>
                                                <Text style={{
                                                    color: "white",
                                                    textAlign: "center",
                                                    fontSize: 16
                                                }}>Share</Text>
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
                               source={shirt}/>
                        <Image style={{width: global.DEVICE_WIDTH * 0.23 - 2, height: global.DEVICE_WIDTH * 0.23 - 15}}
                               source={pants}/>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}