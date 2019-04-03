import React, {Component} from 'react';
import {
    View, 
    ScrollView, 
    Text, 
    Dimensions,
    Image,
    TouchableWithoutFeedback,
    Modal,
    TouchableOpacity,
    FlatList
} from 'react-native';

var shirt = require("./assets/images/clothingSample.jpg");
var shirt2 = require("./assets/images/shirt2.jpg");
var pants = require("./assets/images/jeans.jpg");
var shorts = require("./assets/images/shorts.jpg");

var addIco = require("./assets/images/add.png");

var deviceWidth = Dimensions.get('window').width;

export default class Closet extends Component {
    state = {
        modalVisible: false,
        modalMode: 0,
    }

    constructor () {
        super()

        this.state = {
            modalVisible: false,
            modalMode: 0,
            ready: false,
            tops: [],
            bottoms: [],
        }
    }

    goToOutfits() {
        
    }

    init() {
        this.setState({ready: true})

        var self = this
        var req = new XMLHttpRequest();
        req.onreadystatechange = function() {
            if(req.readyState == 4 && req.status === 200) {

                res = JSON.parse(req.responseText)
                tops = []
                bottoms = []
                
                for(i = 0; i < res['data'].length; i++) {
                    if(res['data'][i]['type'] === 'top')
                        tops.push(res['data'][i]);

                    if(res['data'][i]['type'] === 'bottom')
                        bottoms.push(res['data'][i]);
                }

                self.setState({tops: tops, bottoms: bottoms})
            }
        }
        req.open("GET", global.apiURL + 'garments/', true)
        req.send(null)
    }

    render() {
        if(!this.state.ready) {
            this.init();
        }

        var clean = [];
        var dirty = [];

        clean.push(<Item key={0} src={shirt}/>);
        clean.push(<Item key={1} src={pants}/>);
        dirty.push(<Item key={0} src={shirt2}/>);
        dirty.push(<Item key={1} src={shorts}/>);

        var innerStyle = {
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
        }
        
        return (
            <View style={{width: "100%", height: "100%"}}>
                <View style={{backgroundColor: "#4285F4", paddingTop: 35, paddingBottom: 10, flexDirection: 'row', alignItems: "center", paddingBottom: "3%", paddingRight: "3%"}}>
                    <Text style={{textAlign: "center", color: "white", fontSize: 25, flex: 1}}>Closet</Text>
                    <TouchableWithoutFeedback
                        onPress={() => this.setState({modalVisible: true})}
                    >
                        <View style={{height: 50, width: 50, alignItems: "center", justifyContent: "center"}}>
                            <Image source={addIco} style={{overlayColor: 'white', width: 36, height: 36}}/>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <Modal 
                    animationType="fade" 
                    transparent={true} 
                    visible={this.state.modalVisible} 
                    onRequestClose={() => null}
                >
                    <TouchableWithoutFeedback onPressOut={(e) => this.setState({modalVisible: false})}>
                        <View style={{width: "100%", height: "100%", justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0,0,0,0.5)'}}>
                            <TouchableWithoutFeedback>
                                <View style={{padding: "3%", paddingBottom: 0, width: "90%", height: "90%", backgroundColor: "white", borderRadius: 10, borderWidth: 1}}>
                                    <View style={{flexDirection: "row"}}>
                                        <TouchableOpacity style={{width: "50%"}} onPress={() => {this.setState({modalMode: 0})}}>
                                            <View style={this.state.modalMode == 0 ? innerStyle.enabledPopupButton : innerStyle.disabledPopupButton}>
                                                <Text style={this.state.modalMode == 0 ? innerStyle.enabledText : innerStyle.disabledText}>Tops</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{width: "50%"}} onPress={() => {this.setState({modalMode: 1})}}>
                                            <View style={this.state.modalMode == 1 ? innerStyle.enabledPopupButton : innerStyle.disabledPopupButton}>
                                                <Text style={this.state.modalMode == 1 ? innerStyle.enabledText : innerStyle.disabledText}>Bottoms</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{flex: 1, width: "100%"}}>
                                        <FlatList
                                                data={this.state.modalMode == 0 ? this.state.tops : this.state.bottoms}
                                                numColumns={2}
                                                renderItem={({item}) => <Image key={(new Date()).getTime()} style={{width: deviceWidth * .9 * .94 * .5, height: deviceWidth * .9 * .94 * .5}} source={{uri: item.src}} />}
                                                initialNumToRender={10}
                                            />
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
                        {clean}
                    </ScrollView>
                    <ScrollView style={style.itemList}>
                        {dirty}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

class Item extends Component {
    constructor(props) {
        super(props);

        this.state = {
            src: props.src,
        }
    }

    render() {
        var img = this.state.src;

        return (
            <View style={style.item}>
                <Image style={{width: "100%", height: "100%"}} source={this.props.src}/>
            </View>
        );
    }
}

const style = {

    itemList: {
        height: "100%", 
        borderRightColor: "gainsboro", 
        borderRightWidth: 1,
    },

    item: {
        height: Dimensions.get('window').width / 2 - 30, 
        margin: 15,
        marginBottom: 0,
    }
}