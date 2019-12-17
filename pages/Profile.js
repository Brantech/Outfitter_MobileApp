import React, {Component} from 'react';
import {AsyncStorage, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import ProfileItem from "../components/ProfileItem";

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            outfits: [],
            profile: {},
        };

        this.init()
    }

    init() {
        let self = this;

        AsyncStorage.getItem('accessToken').then((token) => {
            let req = new XMLHttpRequest();
            req.onreadystatechange = function () {
                if (req.readyState === 4 && req.status === 200) {
                    res = JSON.parse(req.responseText);

                    let outfits = res.data.outfits.filter((o) => o.shared);
                    self.setState({outfits: outfits, profile: res.data});
                }
            };
            req.open("GET", global.apiURL + 'api/users/info', true);
            req.setRequestHeader("x-access-token", token);
            req.send(null);
        });
    }

    logout() {
        AsyncStorage.removeItem('accessToken');
        this.props.main.setState({screen: global.ScreenEnum.Login});
    }

    render() {

        let content = [];
        for(let i = 0; i < this.state.outfits.length; i++) {
            content.push(<ProfileItem key={i} id={i}
                                      outfit={this.state.outfits[i]}
                                      top={this.state.profile.garments.find((e) => e._id === this.state.outfits[i].garments[0])}
                                      bottom={this.state.profile.garments.find((e) => e._id === this.state.outfits[i].garments[1])}
                            />);
        }

        return (
            <View style={{width: "100%", height: "100%"}}>
                <View style={{
                    backgroundColor: "#4285F4",
                    height: "8%",
                    paddingLeft: "3%",
                    paddingRight: "3%",
                    alignItems: "center",
                    flexDirection: "row"
                }}>
                    <Text style={{textAlign: "center", color: "white", fontSize: 25, flex: 1}}>Profile</Text>
                </View>

                <View style={{flex: 1, alignItems: "center", paddingTop: 15}}>
                    <View style={{height: 50, marginBottom: 15}}>
                        <Text style={{fontSize: 24, textAlign: "center"}}>{global.user.username}</Text>
                        <View style={{flexDirection: "row", justifyContent: "center"}}>
                            <Text style={{fontSize: 24, textAlign: "center", width: "40%"}}>{global.user.attributes.name}</Text>
                            <Text style={{fontSize: 24, textAlign: "center", width: "40%"}}>{global.user.attributes.family_name}</Text>
                        </View>
                    </View>
                    <ScrollView style={{flex: 1, paddingTop: 15}}>
                        {content}
                    </ScrollView>

                    <TouchableOpacity style={{marginBottom: "3%", width: "94%", alignSelf: "center"}} onPress={() => this.logout()}>
                        <View style={{backgroundColor: "red", height: 50, width: "100%", borderRadius: 25, borderColor: "red", justifyContent: "center"}}>
                            <Text style={{color: "white",
                                textAlign: "center",
                                fontSize: 16,
                            }}>
                                Logout
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}