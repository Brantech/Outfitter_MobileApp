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
import Category from '../components/Category';
import CategoryDisplay from '../components/CategoryDisplay';

const weatherFactors = ['Sunny', 'Cloudy', 'Windy', 'Rainy'];
const temperatureFactors = ['Cold', 'Hot', 'Neutral'];
const seasonFactors = ['Winter', 'Spring', 'Summer', 'Fall'];

export default class Outfits extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category: null,
            modalVisible: false,
            formality: 1,
            temperature: 0,
            weather: 0,
            season: 0,
            ai: true,
            modalMode: 0,
            generated: [{src: "/"}, {src: "/"}],
            rated: false,
            rating: 0,
        }
    }

    openCategory(category) {
        this.setState({category: category.props.text});
    }

    generate() {
        AsyncStorage.getItem('idToken').then((token) => {
            let req = new XMLHttpRequest();
            req.onreadystatechange = () => {
                if(req.readyState === 4 && req.status === 200) {
                    let res = JSON.parse(req.responseText);

                    let outfits = res.data.filter(x => x[0].tags.includes("clean") && x[1].tags.includes("clean"));

                    if(outfits.length === 0)
                        return;

                    if(this.state.ai) {
                        // TODO: rate all of the outfits and choose the best
                    } else {
                        let rand = Math.floor(Math.random() * outfits.length);

                        this.setState({modalMode: 1, generated: outfits[rand], rated: false, rating: 0});
                    }
                }
            };
            req.open("GET", global.apiURL + "wardrobe/wardrobecombos/" + token);
            req.send(null)
        });
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
                                        <View style={{flexDirection: "row"}}>
                                            <Text style={{flex: 1, textAlign: "right", lineHeight: 25}}>AI Generator</Text>
                                            <Switch
                                                value={this.state.ai}
                                                onValueChange={(val) => this.setState({ai: val})}
                                                thumbColor="#4285F4"
                                                trackColor="#4285F4"
                                            />
                                        </View>

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
                                                       source={{uri: this.state.generated[0].src}} />
                                            </View>
                                            <View style={{width: "50%"}}>
                                                <Image style={{width: "100%", height: global.DEVICE_WIDTH * .9 * .94 * .5}}
                                                       source={{uri: this.state.generated[1].src}} />
                                            </View>
                                        </View>

                                        <View style={{flexDirection: "row", marginTop: "5%", marginBottom: "10%"}}>
                                            {rating}
                                        </View>

                                        <TouchableOpacity style={{marginBottom: "5%"}} onPress={() => this.generate()}>
                                            <View style={{backgroundColor: "#4285F4", width: "100%", height: 50, borderRadius: 10, borderWidth: 1, justifyContent: "center", borderColor: "#4285F4"}}>
                                                <Text style={{color: "white", textAlign: "center", fontSize: 26}}>Generate Another</Text>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity  onPress={() => {if(this.state.rated) this.generate()}}>
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

                <ScrollView style={{flex: 1}}>
                    {content}
                </ScrollView>
            </View>
        )
    }
}

class Star extends Component {
    render() {
        return (
            <TouchableOpacity onPress={() => {this.props.parent.setState({rating: this.props.val, rated: true}); console.log(this.props.val)}}>
                <Icon name={this.props.type} color={this.props.color} size={global.DEVICE_WIDTH * 0.9 * 0.94 * 0.20}/>
            </TouchableOpacity>
        )
    }
}