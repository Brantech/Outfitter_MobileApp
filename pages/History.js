import React, {Component} from 'react';
import {
    ScrollView,
    Text,
    View,
    Picker,
    AsyncStorage,
    TouchableOpacity
} from 'react-native';
import HistoryItem from "../components/HistoryItem";

export default class History extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: ["All", "Uncategorized"],
            category: 0,
            outfits: [],
        };

        this.init();
    }

    init() {
        AsyncStorage.getItem('accessToken').then((token) => {
            var req = new XMLHttpRequest();
            req.onreadystatechange = () => {
                if(req.readyState === 4 && req.status === 200) {
                    var res = JSON.parse(req.responseText);

                    let categories = {All: true, Uncategorized: true,};
                    for(let i in res.data.history) {
                        if(res.data.history[i].category != null && res.data.history[i].category.trim() !== "") {
                            categories[res.data.history[i].category] = true;
                        }
                    }

                    this.setState({outfits: res.data.history, profile: res.data, categories: Object.keys(categories).sort()});
                }
            };
            req.open("GET", global.apiURL + 'api/users/info', true);
            req.setRequestHeader("x-access-token", token);
            req.send(null);
        });
    }

    clearHistory() {
        AsyncStorage.getItem('accessToken').then((token) => {
            let req = new XMLHttpRequest();
            req.onreadystatechange = () => {
                if(req.readyState === 4 && req.status === 200) {
                    let res = JSON.parse(req.responseText);

                    this.setState({outfits: [], categories: ["All", "Uncategorized"]})
                }
            };
            req.open("DELETE", global.apiURL + 'api/users/history/all', true);
            req.setRequestHeader("x-access-token", token);
            req.send(null);
        });
    }

    render() {
        let categories = [];
        for(let i = 0; i < this.state.categories.length; i++) {
            categories.push(<Picker.Item key={i} value={i} label={this.state.categories[i]}/>);
        }

        let content = [];
        for(let i = 0; i < this.state.outfits.length; i++) {
            if( this.state.categories[this.state.category] === "All" ||
                ((this.state.outfits[i].category == null ||
                    this.state.outfits[i].category.trim() === "") && this.state.categories[this.state.category] === "Uncategorized") ||
                this.state.outfits[i].category === this.state.categories[this.state.category]) {
                content.push(<HistoryItem key={i} id={i} parent={this}
                                         top={this.state.profile.garments.find((e) => e._id === this.state.outfits[i].garments[0])}
                                         bottom={this.state.profile.garments.find((e) => e._id === this.state.outfits[i].garments[1])}
                                         outfit={this.state.outfits[i]}/>
                );
            }
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
                    <Text style={{textAlign: "center", color: "white", fontSize: 25, flex: 1}}>History</Text>
                </View>

                <View style={{borderColor: 'black', borderWidth: 1, margin: "3%"}}>
                    <Picker
                        mode={"dropdown"}
                        selectedValue={this.state.category}
                        onValueChange={(val, index) =>
                            this.setState({category: val})
                        }
                    >
                        {categories}
                    </Picker>
                </View>

                <ScrollView style={{flex: 1, paddingLeft: "3%", paddingRight: "3%"}}>
                    <View style={{flexDirection: 'row', flexWrap: "wrap", width: "100%"}}>
                        {content}
                    </View>
                </ScrollView>

                <TouchableOpacity style={{marginBottom: "4%", width: "94%", alignSelf: "center"}} onPress={() => this.clearHistory()}>
                    <View style={{backgroundColor: "red", height: 50, width: "100%", borderRadius: 25, borderColor: "red", justifyContent: "center"}}>
                        <Text style={{color: "white",
                            textAlign: "center",
                            fontSize: 16,
                        }}>
                            Clear All history
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}