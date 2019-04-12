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
            offset: 0,
            start: 0,
            end: 5
        }
    }

    async init() {
        this.setState({ready: true});

        let self = this;
        AsyncStorage.getItem('accessToken').then((token) => {
            let wardrobe = new XMLHttpRequest();
            wardrobe.onreadystatechange = () => {
                if (wardrobe.readyState === 4 && wardrobe.status === 200) {
                    res = JSON.parse(wardrobe.responseText);

                    if (res.success) {
                        var clean = [];
                        var dirty = [];

                        for (var i = 0; i < res.data.garments.length; i++) {
                            var item = <ClosetItem key={i} id={i} parent={this} garment={res.data.garments[i]}/>;

                            if (res.data.garments[i].tags.includes("clean")) {
                                clean.push(item);
                            } else {
                                dirty.push(item);
                            }
                        }

                        this.setState({clean: clean, dirty: dirty});
                    }
                }
            };
            wardrobe.open("GET", global.apiURL + "api/users/garments/?limit=200", true);
            wardrobe.setRequestHeader("x-access-token", token);
            wardrobe.send(null);


            let garments = new XMLHttpRequest();
            garments.onreadystatechange = () => {
                if(garments.readyState === 4 && garments.status === 200) {
                    let res = JSON.parse(garments.responseText);

                    self.setState({tops: res.data});
                }
            };
            garments.open("GET", global.apiURL + 'api/garments/?limit=6&offset=' + this.state.offset + "&category=" + 'top', true);
            garments.setRequestHeader("x-access-token", token);
            garments.send(null);
        })
    }

    fetchGarments() {
        let self = this;
        AsyncStorage.getItem('accessToken').then((token) => {
            let garments = new XMLHttpRequest();
            garments.onreadystatechange = () => {
                if (garments.readyState === 4 && garments.status === 200) {
                    let res = JSON.parse(garments.responseText);

                    if (res.data.length !== 0) {
                        if (this.state.modalMode === 0) {
                            self.setState({tops: res.data});
                        } else {
                            self.setState({bottoms: res.data});
                        }
                    }
                }
            };
            garments.open("GET", global.apiURL + 'api/garments/?limit=6&offset=' + this.state.offset + "&category=" + (this.state.modalMode === 0 ? 'top' : 'bottom'), true);
            garments.setRequestHeader("x-access-token", token);
            garments.send(null);
        });
    }

    decrement() {
        let self = this;
        AsyncStorage.getItem('accessToken').then((token) => {
            let garments = new XMLHttpRequest();
            garments.onreadystatechange = () => {
                if (garments.readyState === 4 && garments.status === 200) {
                    let res = JSON.parse(garments.responseText);

                    if (res.data.length !== 0) {
                        if (this.state.modalMode === 0) {
                            self.setState({tops: res.data, offset: Math.max(this.state.offset - 6, 0)});
                        } else {
                            self.setState({bottoms: res.data, offset: Math.max(this.state.offset - 6, 0)});
                        }
                    }
                }
            };
            garments.open("GET", global.apiURL + 'api/garments/?limit=6&offset=' + (Math.max(this.state.offset - 6, 0)) + "&category=" + (this.state.modalMode === 0 ? 'top' : 'bottom'), true);
            garments.setRequestHeader("x-access-token", token);
            garments.send(null);
        });
    }

    increment() {
        let self = this;
        AsyncStorage.getItem('accessToken').then((token) => {
            let garments = new XMLHttpRequest();
            garments.onreadystatechange = () => {
                if (garments.readyState === 4 && garments.status === 200) {
                    let res = JSON.parse(garments.responseText);

                    if (res.data.length !== 0) {
                        if (this.state.modalMode === 0) {
                            self.setState({tops: res.data, offset: this.state.offset + 6});
                        } else {
                            self.setState({bottoms: res.data, offset: this.state.offset + 6});
                        }
                    }
                }
            };
            garments.open("GET", global.apiURL + 'api/garments/?limit=6&offset=' + (this.state.offset + 6) + "&category=" + (this.state.modalMode === 0 ? 'top' : 'bottom'), true);
            garments.setRequestHeader("x-access-token", token);
            garments.send(null);
        });
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
        if (this.state.modalMode === 0) {
            for (i = 0; i < this.state.tops.length; i++) {
                clothes.push(<Garment key={i} parent={this} garment={this.state.tops[i]}/>)
            }
        } else {
            for (i = 0; i < this.state.bottoms.length; i++) {
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
                    <TouchableWithoutFeedback onPressOut={  (e) => this.setState({modalVisible: false})   }>
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
                                            this.setState({modalMode: 0, offset: 0});
                                            this.fetchGarments();
                                        }}>
                                            <View
                                                style={this.state.modalMode === 0 ? innerStyle.enabledPopupButton : innerStyle.disabledPopupButton}>
                                                <Text
                                                    style={this.state.modalMode === 0 ? innerStyle.enabledText : innerStyle.disabledText}>Tops</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{width: "50%"}} onPress={() => {
                                            this.setState({modalMode: 1, offset: 0})
                                            this.fetchGarments();
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