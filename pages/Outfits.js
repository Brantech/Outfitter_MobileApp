import React, {Component} from 'react';
import {
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Picker,
    AsyncStorage,
    Switch,
    Image,
} from 'react-native';
import {Icon} from 'react-native-elements';
import OutfitItem from "../components/OutfitItem";

const weatherFactors = ['Sunny', 'Cloudy', 'Windy', 'Rainy'];
const temperatureFactors = ['Cold', 'Hot', 'Neutral'];
const seasonFactors = ['Winter', 'Spring', 'Summer', 'Fall'];

export default class Outfits extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ai: true,
            categories: [],
            category: 0,
            formality: 1,
            generated: [{src: "/"}, {src: "/"}],
            modalMode: 0,
            modalVisible: false,
            outfits: [],
            rated: false,
            rating: 0,
            season: 0,
            temperature: 0,
            weather: 0,
            loading: false,
        };

        this.init();
    }

    init() {
        AsyncStorage.getItem('accessToken').then((token) => {
            var req = new XMLHttpRequest();
            req.onreadystatechange = () => {
                if(req.readyState === 4 && req.status === 200) {
                    let res = JSON.parse(req.responseText);

                    let categories = {All: true, Uncategorized: true,};
                    for(let i in res.data.outfits) {
                        if(res.data.outfits[i].category != null && res.data.outfits[i].category.trim() !== "") {
                            categories[res.data.outfits[i].category] = true;
                        }
                    }

                    this.setState({outfits: res.data.outfits, profile: res.data, categories: Object.keys(categories).sort()});
                }
            };
            req.open("GET", global.apiURL + 'api/users/info', true);
            req.setRequestHeader("x-access-token", token);
            req.send(null);
        });
    }

    generate() {
        if(this.state.loading) {
            return;
        }

        this.setState({loading: true})
        AsyncStorage.getItem('userInfo').then((info) => {
            AsyncStorage.getItem('accessToken').then((token) => {
                let payload = JSON.parse(info);
                payload.formality = this.state.formality;
                payload.weather = this.state.weather;
                payload.season = this.state.season;
                payload.temperature = this.state.temperature;

                let req = new XMLHttpRequest();
                req.onreadystatechange = () => {
                    if(req.readyState === 4 && req.status === 200) {
                        let res = JSON.parse(req.responseText);

                        let generated = [];
                        for(let i in res.data) {
                            generated.push(res.data[i].outfit);
                        }

                        let curr = generated.pop();

                        this.setState({modalMode: 1, stack: generated, generated: curr, rated: false, rating: 0, loading: false});
                    }
                };
                req.open("GET", global.apiURL + "api/users/recommendations/?" + Object.keys(payload).map((key) => key + '=' + encodeURIComponent(payload[key])).join('&'));
                req.setRequestHeader("x-access-token", token);
                req.send(null)
            });
        });
    }

    nextOutfit() {
        if(this.state.stack.length !== 0) {
            let stack = this.state.stack;
            let curr = stack.pop();
            this.setState({generated: curr, stack: stack});
        } else {
            this.generate();
        }
    }

    addOutfit() {
        let payload = {
            garments: [this.state.generated[0]._id, this.state.generated[1]._id],
            rating: this.state.rating,
            numberOfRatings: 0,
            communityRating: 0,
        };

        AsyncStorage.getItem('accessToken').then((token) => {
           let req = new XMLHttpRequest();
           req.onreadystatechange = () => {
                if(req.readyState === 4 && req.status === 200) {
                    let res = JSON.parse(req.responseText);

                    let categories = {All: true, Uncategorized: true};
                    for(let i in res.data.outfits) {
                        if(res.data.outfits[i].category != null && res.data.outfits[i].category.trim() !== "") {
                            categories[res.data.outfits[i].category] = true;
                        }
                    }

                    this.setState({modalMode: 0, modalVisible: false, outfits: res.data.outfits, categories: Object.keys(categories).sort()});
                }
           };
           req.open("POST", global.apiURL + "api/users/outfits/", true);
           req.setRequestHeader("x-access-token", token);
           req.setRequestHeader("Content-Type", "application/json");
           req.send(JSON.stringify(payload));
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
                content.push(<OutfitItem key={i} id={i} parent={this}
                                         top={this.state.profile.garments.find((e) => e._id === this.state.outfits[i].garments[0])}
                                         bottom={this.state.profile.garments.find((e) => e._id === this.state.outfits[i].garments[1])}
                                         outfit={this.state.outfits[i]}/>
                );
            }
        }

        let formalities = [];
        for(let i = 1; i < 11; i++) {
            formalities.push(<Picker.Item key={i} label={i.toString()} value={i}/>);
        }

        let temps = [];
        for(let i = 0; i < temperatureFactors.length; i++) {
            temps.push(<Picker.Item key={i} label={temperatureFactors[i]} value={i}/>);
        }

        let weather = [];
        for(let i = 0; i < weatherFactors.length; i++) {
            weather.push(<Picker.Item key={i} label={weatherFactors[i]} value={i}/>);
        }

        let seasons = [];
        for(let i = 0; i < seasonFactors.length; i++) {
            seasons.push(<Picker.Item key={i} label={seasonFactors[i]} value={i}/>);
        }

        var rating = [];

        let i;
        for (i = 0; i < this.state.rating; i++) {
            rating.push(<Star key={i} type="star" parent={this} color="#FFD700" val={i + 1}/>);
        }

        while (rating.length !== 5) {
            rating.push(<Star key={i} type="star-border" parent={this} color="black" val={i + 1}/>);
            i = i + 1;
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
                    <TouchableOpacity style={{justifyContent: "center"}}>
                        <Icon name="chevron-left" color="#4285F4"/>
                    </TouchableOpacity>

                    <Text style={{textAlign: "center", color: "white", fontSize: 25, flex: 1}}>Outfits</Text>

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
                    <TouchableWithoutFeedback onPressOut={(e) => this.setState({modalVisible: false, modalMode: 0, rated: false,})}>
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
                                    height: this.state.modalMode === 0 ? "45%" : "60%",
                                    backgroundColor: "white",
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    justifyContent: "center"
                                }}>
                                    <View style={{
                                        display: this.state.modalMode === 0 ? "flex" : "none",
                                        width: "100%",
                                        height: "100%",
                                        justifyContent: "center"
                                    }}>
                                        <Text style={{fontSize: 18, marginBottom: "10%"}}>Please fill out some information about the event you want an outfit for.</Text>

                                        <View style={{flexDirection: "row", marginBottom: "5%"}}>
                                            <View style={{width: "48%", marginRight: "4%"}}>
                                                <Text>Formality</Text>
                                                <View style={{borderColor: "black", borderWidth: 1}}>
                                                    <Picker
                                                        mode={"dropdown"}
                                                        selectedValue={this.state.formality}
                                                        onValueChange={(val, index) =>
                                                            this.setState({formality: val})
                                                        }
                                                    >
                                                        {formalities}
                                                    </Picker>
                                                </View>
                                            </View>

                                            <View style={{width: "48%"}}>
                                                <Text>Temperature</Text>
                                                <View style={{borderColor: "black", borderWidth: 1}}>
                                                    <Picker
                                                        mode={"dropdown"}
                                                        selectedValue={this.state.temperature}
                                                        onValueChange={(val, index) =>
                                                            this.setState({temperature: val})
                                                        }
                                                    >
                                                        {temps}
                                                    </Picker>
                                                </View>
                                            </View>
                                        </View>

                                        <View style={{flexDirection: "row", marginBottom: "5%"}}>
                                            <View style={{width: "48%", marginRight: "4%"}}>
                                                <Text>Weather</Text>
                                                <View style={{borderColor: "black", borderWidth: 1}}>
                                                    <Picker
                                                        mode={"dropdown"}
                                                        selectedValue={this.state.weather}
                                                        onValueChange={(val, index) =>
                                                            this.setState({weather: val})
                                                        }
                                                    >
                                                        {weather}
                                                    </Picker>
                                                </View>
                                            </View>

                                            <View style={{width: "48%"}}>
                                                <Text>Season</Text>
                                                <View style={{borderColor: "black", borderWidth: 1}}>
                                                    <Picker
                                                        mode={"dropdown"}
                                                        selectedValue={this.state.season}
                                                        onValueChange={(val, index) =>
                                                            this.setState({season: val})
                                                        }
                                                    >
                                                        {seasons}
                                                    </Picker>
                                                </View>
                                            </View>
                                        </View>

                                        <TouchableOpacity onPress={() => this.generate()}>
                                            <View style={{backgroundColor: "#4285F4", width: "100%", height: 50, borderRadius: 10, borderWidth: 1, justifyContent: "center", borderColor: "#4285F4"}}>
                                                <Text style={{color: "white", textAlign: "center", fontSize: 26}}>Generate Outfit</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{
                                        display: this.state.modalMode === 1 ? "flex" : "none",
                                        width: "100%",
                                        height: "100%",
                                        justifyContent: "center"
                                    }}>
                                        <View style={{flexDirection: "row"}}>
                                            <View style={{width: "50%"}}>
                                                <Image style={{width: "100%", height: global.DEVICE_WIDTH * .9 * .94 * .5}}
                                                       source={{uri: this.state.generated[0].imageSource}} />
                                            </View>
                                            <View style={{width: "50%"}}>
                                                <Image style={{width: "100%", height: global.DEVICE_WIDTH * .9 * .94 * .5}}
                                                       source={{uri: this.state.generated[1].imageSource}} />
                                            </View>
                                        </View>

                                        <View style={{flexDirection: "row", marginTop: "5%", marginBottom: "10%"}}>
                                            {rating}
                                        </View>

                                        <TouchableOpacity style={{marginBottom: "5%"}} onPress={() => this.nextOutfit()}>
                                            <View style={{backgroundColor: "#4285F4", width: "100%", height: 50, borderRadius: 10, borderWidth: 1, justifyContent: "center", borderColor: "#4285F4"}}>
                                                <Text style={{color: "white", textAlign: "center", fontSize: 26}}>Generate Another</Text>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity  onPress={() => {if(this.state.rated) this.addOutfit()}}>
                                            <View style={{backgroundColor: this.state.rated ? "#4285F4" : "gray", width: "100%", height: 50, borderRadius: 10, borderWidth: 1, justifyContent: "center", borderColor: this.state.rated ? "#4285F4" : "gray"}}>
                                                <Text style={{color: "white", textAlign: "center", fontSize: 26}}>Save</Text>
                                            </View>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

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
            </View>
        )
    }
}

class Star extends Component {
    render() {
        return (
            <TouchableOpacity onPress={() => this.props.parent.setState({rating: this.props.val, rated: true})}>
                <Icon name={this.props.type} color={this.props.color} size={global.DEVICE_WIDTH * 0.9 * 0.94 * 0.20}/>
            </TouchableOpacity>
        )
    }
}