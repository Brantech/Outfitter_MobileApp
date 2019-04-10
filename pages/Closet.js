import React, {Component} from 'react';
import {
    AsyncStorage,
    Image,
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import ClosetItem from "../components/ClosetItem";
import Garment from "../components/Garment";
import {Icon} from "react-native-elements";

let addIco = require("../assets/images/add.png");

export default class Closet extends Component {
    state = {
        modalVisible: false,
        modalMode: 0,
    };

    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            modalMode: 0,
            ready: false,
            clean: [],
            dirty: [],
            tops: [],
            bottoms: [],
            start: 0,
            end: 5
        }
    }

    async init() {
        this.setState({ready: true});

        let self = this;
        let garments = new XMLHttpRequest();
        garments.onreadystatechange = () => {
            if (garments.readyState === 4 && garments.status === 200) {

                res = JSON.parse(garments.responseText);
                tops = [];
                bottoms = [];

                for (i = 0; i < res['data'].length; i++) {
                    if (res['data'][i]['type'] === 'top')
                        tops.push(res['data'][i]);

                    if (res['data'][i]['type'] === 'bottom')
                        bottoms.push(res['data'][i]);
                }

                self.setState({tops: tops, bottoms: bottoms})
            }
        };
        garments.open("GET", global.apiURL + 'garments/', true);
        garments.send(null);

        AsyncStorage.getItem('idToken').then((token) => {
            let wardrobe = new XMLHttpRequest();
            wardrobe.onreadystatechange = () => {
                if (wardrobe.readyState === 4 && wardrobe.status === 200) {
                    res = JSON.parse(wardrobe.responseText);

                    if (res.success) {
                        var clean = [];
                        var dirty = [];

                        for (var i = 0; i < res.data.length; i++) {
                            var item = <ClosetItem key={i} id={i} parent={this} garment={res.data[i]}/>;

                            if (res.data[i].tags.includes("clean")) {
                                clean.push(item);
                            } else {
                                dirty.push(item);
                            }
                        }

                        this.setState({clean: clean, dirty: dirty});
                    }
                }
            };
            wardrobe.open("GET", global.apiURL + "wardrobe/" + token, true);
            wardrobe.send(null)
        })
    }

    decrement() {
        if (this.state.start === 0) {
            return;
        }

        if (this.state.end - this.state.start !== 5) {
            if (this.state.modalMode === 0) {
                this.setState({
                    start: Math.max(this.state.end - this.state.tops.length % 6 - 5, 0),
                    end: this.state.end - this.state.tops.length % 6
                })
            } else {
                this.setState({
                    start: Math.max(this.state.end - this.state.bottoms.length % 6 - 5, 0),
                    end: this.state.end - this.state.bottoms.length % 6
                })
            }
        } else {
            this.setState({start: Math.max(this.state.start - 6, 0), end: this.state.end - 6})
        }
    }

    increment() {

        if (this.state.modalMode === 0 && this.state.end < this.state.tops.length - 1) {
            this.setState({start: this.state.start + 6, end: Math.min(this.state.end + 6, this.state.tops.length - 1)})
        } else if (this.state.modalMode === 1 && this.state.end < this.state.bottoms.length - 1) {
            this.setState({
                start: this.state.start + 6,
                end: Math.min(this.state.end + 6, this.state.bottoms.length - 1)
            })
        }
    }

    remove(item) {
        if(item.props.garment.tags.includes("clean")) {
            let clean = this.state.clean.filter(x => x.props.id !== item.props.id);
            this.setState({clean: clean})
        } else {
            let dirty = this.state.dirty.filter(x => x.props.id !== item.props.id);
            this.setState({dirty: dirty})
        }
    }

    move(item) {
        let clean = this.state.clean;
        let dirty = this.state.dirty;

        if(item.props.garment.tags.includes("clean")) {
            clean.push(<ClosetItem key={(new Date()).getTime()} id={(new Date()).getTime()} parent={this} garment={item.props.garment}/>);
            dirty = dirty.filter(x => x.props.id !== item.props.id);
        } else {
            clean = clean.filter(x => x.props.id !== item.props.id);
            dirty.push(<ClosetItem key={(new Date()).getTime()} id={(new Date()).getTime()} parent={this} garment={item.props.garment}/>);
        }
        this.setState({clean: clean, dirty: dirty});
    }

    render() {
        if (!this.state.ready) {
            this.init();
        }

        let innerStyle = {
            enabledPopupButton: {
                backgroundColor: "#4285F4",
                width: "100%",
                height: 50,
                justifyContent: "center",
            },
            disabledPopupButton: {
                width: "100%",
                height: 50,
                justifyContent: "center",
                borderWidth: 1,
                borderColor: "#4285F4"
            },
            enabledText: {
                color: "white",
                textAlign: "center",
                fontSize: 16,
            },
            disabledText: {
                color: "black",
                textAlign: "center",
                fontSize: 16,
            }
        };

        clothes = [];
        if (this.state.modalMode === 0 && this.state.tops.length !== 0) {
            for (i = this.state.start; i < this.state.end + 1 && this.state.tops.length; i++) {
                clothes.push(<Garment key={i} parent={this} garment={this.state.tops[i]}/>)
            }
        } else if (this.state.bottoms.length !== 0) {
            for (i = this.state.start; i < this.state.end + 1 && this.state.bottoms.length; i++) {
                clothes.push(<Garment key={i} parent={this} garment={this.state.bottoms[i]}/>)
            }
        }

        return (
            <View style={{width: "100%", height: "100%"}}>
                <View style={{
                    backgroundColor: "#4285F4",
                    flexDirection: 'row',
                    alignItems: "center",
                    height: "8%",
                    paddingLeft: "3%",
                    paddingRight: "3%"
                }}>
                    <Icon name="add" color="#4285F4"/>

                    <Text style={{textAlign: "center", color: "white", fontSize: 25, flex: 1}}>Closet</Text>

                    <TouchableOpacity style={{justifyContent: "center"}} onPress={() => this.setState({modalVisible: true})}>
                        <Icon name="add" color="white"/>
                    </TouchableOpacity>
                </View>

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
                                    width: "90%",
                                    height: "85%",
                                    backgroundColor: "white",
                                    borderRadius: 10,
                                    borderWidth: 1
                                }}>
                                    <View style={{flexDirection: "row"}}>
                                        <TouchableOpacity style={{width: "50%"}} onPress={() => {
                                            this.setState({modalMode: 0, start: 0, end: 5})
                                        }}>
                                            <View
                                                style={this.state.modalMode === 0 ? innerStyle.enabledPopupButton : innerStyle.disabledPopupButton}>
                                                <Text
                                                    style={this.state.modalMode === 0 ? innerStyle.enabledText : innerStyle.disabledText}>Tops</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{width: "50%"}} onPress={() => {
                                            this.setState({modalMode: 1, start: 0, end: 5})
                                        }}>
                                            <View
                                                style={this.state.modalMode === 1 ? innerStyle.enabledPopupButton : innerStyle.disabledPopupButton}>
                                                <Text
                                                    style={this.state.modalMode === 1 ? innerStyle.enabledText : innerStyle.disabledText}>Bottoms</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{flex: 1, width: "100%"}}>
                                        <View style={{flexDirection: "row", flexWrap: "wrap", flex: 1}}>
                                            {clothes}
                                        </View>
                                        <View style={{flexDirection: "row", alignItems: "center"}}>
                                            <TouchableOpacity style={{width: "25%"}} onPress={() => {
                                                this.decrement()
                                            }}>
                                                <View style={{
                                                    backgroundColor: "#4285F4",
                                                    height: 45,
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                }}>
                                                    <Text style={{color: "white", textAlign: "center"}}>Prev</Text>
                                                </View>
                                            </TouchableOpacity>

                                            <Text style={{flex: 1, textAlign: "center"}}>
                                                <Text>{Math.floor((this.state.start + 1) / 6) + 1}</Text>
                                                <Text> / </Text>
                                                <Text>{this.state.modalMode === 0 ? Math.floor(this.state.tops.length / 6) + 1 : Math.floor(this.state.bottoms.length / 6) + 1}</Text>
                                            </Text>

                                            <TouchableOpacity style={{width: "25%"}} onPress={() => {
                                                this.increment()
                                            }}>
                                                <View style={{
                                                    backgroundColor: "#4285F4",
                                                    height: 45,
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                }}>
                                                    <Text style={{color: "white", textAlign: "center"}}>Next</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

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
                        {this.state.clean}
                    </ScrollView>
                    <ScrollView style={style.itemList}>
                        {this.state.dirty}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const style = {

    itemList: {
        height: "100%",
        width: "50%",
        borderRightColor: "gainsboro",
        borderRightWidth: 1,
    },
};