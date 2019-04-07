import React, {Component} from 'react';
import {ScrollView, Text, TouchableOpacity, View,} from 'react-native';
import {Icon} from 'react-native-elements';
import Category from '../components/Category';
import OutfitItem from "../components/OutfitItem";

class CategoryDisplay extends Component {
    render() {
        return (
            <View>
                <View style={{
                    marginTop: "2%",
                    marginBottom: "2%",
                    paddingBottom: "2%",
                    borderBottomColor: "gainsboro",
                    borderBottomWidth: 1
                }}>
                    <Text style={{textAlign: "center", fontSize: 20,}}>{this.props.category}</Text>
                </View>
                <View style={{flexDirection: "row"}}>
                    <OutfitItem/>
                    <OutfitItem/>
                </View>
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
        if (this.state.category != null) {
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
                <View style={{
                    backgroundColor: "#4285F4",
                    paddingTop: 35,
                    paddingBottom: 15,
                    paddingLeft: "3%",
                    paddingRight: "3%",
                    flexDirection: "row"
                }}>
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