import React, {Component} from 'react';
import {
    View,
    ScrollView,
    Dimensions,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    Modal
} from 'react-native';
import { Icon } from 'react-native-elements';
import Category from './components/Category';

var shirt = require("./assets/images/clothingSample.jpg");
var pants = require("./assets/images/jeans.jpg");

var deviceWidth = Dimensions.get('window').width;

class CategoryDisplay extends Component {
    render() {
        return (
            <View>
                <View style={{marginTop: "2%", marginBottom: "2%", paddingBottom: "2%", borderBottomColor: "gainsboro", borderBottomWidth: 1}}>
                    <Text style={{textAlign: "center", fontSize: 20,}}>{this.props.category}</Text>
                </View>
                <View style={{flexDirection: "row"}}>
                    <Item/>
                    <Item/>
                </View>
            </View>
        )
    }
}

class Item extends Component {
    state = {
        modalVisible: false
    }

    render() {
        var innerStyle = {
            popupButton: {
                backgroundColor: "#4285F4", 
                width: deviceWidth * 0.64 * 0.9,
                height: 50, 
                justifyContent: "center",
                borderColor: "#4285F4",
                borderRadius: 25,
                borderWidth: 1
            }
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
                        <View style={{width: "100%", height: "100%", justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0,0,0,0.5)'}}>
                            <TouchableWithoutFeedback>
                                <View style={{padding: "3%", paddingBottom: 0, width: "70%", height: "40%", backgroundColor: "white", borderRadius: 10, borderWidth: 1}}>
                                    <View style={{flex: 1, flexDirection: "row"}}>
                                        <Image style={{width: "50%", height: "100%"}} source={shirt}/>
                                        <Image style={{width: "50%", height: "100%"}} source={pants}/>
                                    </View>
                                    <View style={{flex: 1, width: "100%", justifyContent: "center", alignItems: "center"}}>
                                        <TouchableOpacity style={{marginBottom: "4%"}}>
                                            <View style={innerStyle.popupButton}>
                                                <Text style={{color: "white", textAlign: "center", fontSize: 16}}>Wear</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <View style={innerStyle.popupButton}>
                                                <Text style={{color: "white", textAlign: "center", fontSize: 16}}>Share</Text>
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
                        <Image style={{width: deviceWidth * 0.23 - 2, height: deviceWidth * 0.23 - 15}} source={shirt}/>
                        <Image style={{width: deviceWidth * 0.23 - 2, height: deviceWidth * 0.23 - 15}} source={pants}/>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default class Outfits extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category: null
        }
    }

    openCategory(category) {
        this.setState({category: category.props.text});
    }

    render() {
        var content;
        if(this.state.category != null) {
            content = <CategoryDisplay category={this.state.category}/>
        } else {
            content = [];
            content.push(<Category key={0} text="Favorited" parent={this}/>);
            content.push(<Category key={1} text="Dating" parent={this}/>);
            content.push(<Category key={2} text="Work" parent={this}/>);
            content.push(<Category key={3} text="Casual" parent={this}/>);
        }

        return (
            <View style={{width: "100%", height: "100%"}}>
                <View style={{backgroundColor: "#4285F4", paddingTop: 35, paddingBottom: 15, paddingLeft: "3%", paddingRight: "3%", flexDirection: "row"}}>
                    <TouchableOpacity style={{justifyContent: "center"}}>
                        <Icon name="chevron-left" color="#4285F4"/>
                    </TouchableOpacity>

                    <Text style={{textAlign: "center", color: "white", fontSize: 25, flex: 1}}>Outfits</Text>

                    <TouchableOpacity style={{justifyContent: "center"}}>
                        <Icon name="add" color="white"/>
                    </TouchableOpacity>
                </View>

                <ScrollView style={{flex: 1}}>
                    {content}
                </ScrollView>
            </View>
        )
    }
}

const style = {

    itemImageWrap: {
        width: deviceWidth * 0.46,
        height: deviceWidth * 0.23,
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
}