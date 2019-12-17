import React, {Component} from 'react';
import {AsyncStorage, ScrollView, Text, View} from 'react-native';
import FeedItem from '../components/FeedItem';

export default class Feed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            entries: [],
        };

        this.init();
    }

    init() {
        AsyncStorage.getItem('accessToken').then((token) => {
            let req = new XMLHttpRequest();
            req.onreadystatechange = () => {
                if (req.readyState === 4 && req.status === 200) {
                    let res = JSON.parse(req.responseText);

                    let parse = [];
                    for(let i = 0; i < res.data.length; i++) {
                        for(let j = 0; j < res.data[i][1].length; j++) {
                            parse.push([res.data[i][0], res.data[i][1][j]]);
                        }
                    }

                    parse.sort((o1, o2) => o2[1].dateWorn.localeCompare(o1[1].dateWorn));
                    this.setState({entries: parse});
                }
            };
            req.open("GET", global.apiURL + 'api/users/feed', true);
            req.setRequestHeader("x-access-token", token);
            req.send(null);
        });
    }

    render() {
        let content = [];
        for(let i = 0; i < this.state.entries.length; i++) {
            content.push(<FeedItem key={i} parent={this} user={this.state.entries[i][0]} outfit={this.state.entries[i][1]}/>);
        }

        return (
            <View style={{width: "100%", height: "100%"}}>
                <View style={{
                    backgroundColor: "#4285F4",
                    height: "8%",
                    alignItems: "center",
                    paddingLeft: "3%",
                    paddingRight: "3%",
                    flexDirection: "row"
                }}>
                    <Text style={{textAlign: "center", color: "white", fontSize: 25, flex: 1}}>Feed</Text>
                </View>

                <ScrollView style={{flex: 1, paddingTop: "3%", paddingBottom: "5%"}}>
                    <View style={{flex: 1, alignItems: "center"}}>
                        {content}
                    </View>
                </ScrollView>
            </View>
        )
    }
}