import React, {Component} from 'react';
import {AsyncStorage, Button, Picker, ScrollView, Text, View} from 'react-native';

const questions = require("../assets/sampleSurvey.json");

function arrayRemove(arr, value) {

    return arr.filter(function (ele) {
        return ele != value;
    });

}

class Question extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: [],
            dropdown: 0,
        }
    }

    update(key, remove = false) {
        var selected;
        if (!this.props.question.multiselect) {
            if (remove) {
                selected = [];
                this.setState({selected: selected});
            } else {
                selected = [key];
                this.setState({selected: selected});
            }
            this.props.parent.update(parseInt(key, 10));
        } else {
            if (remove) {
                selected = arrayRemove(this.state.selected, key);
                this.setState({selected: selected});
            } else {
                selected = this.state.selected;
                selected.push(key);

                this.setState({selected: selected});
            }
            this.props.parent.update(selected);
        }
    }

    render() {
        let choices = [];

        if (this.props.question.choices.length < 6) {
            for (let i in this.props.question.choices) {
                choices.push(
                    <Choice key={i} index={i} choice={this.props.question.choices[i]}
                            active={this.state.selected.includes(i)} parent={this}/>);
            }
        }
        else {
            for (let i = 0; i < this.props.question.choices.length; i++) {
                choices.push(<Picker.Item key={i} label={this.props.question.choices[i]} value={i}/>);
            }

            if(this.state.ready == null) {
                this.setState({ready: true});
                this.props.parent.setState({answer: 0});
            }

            choices =
                <Picker
                    mode={"dropdown"}
                    selectedValue={this.state.dropdown}
                    onValueChange={(val, index) => {
                        this.setState({dropdown: val});
                        this.props.parent.setState({answer: val});
                    }
                    }
                >
                    {choices}
                </Picker>
        }

        return (
            <View style={{padding: "5%"}}>
                <View>
                    <Text style={{fontSize: 20, paddingBottom: "5%"}}>{this.props.question.question}</Text>
                </View>
                <View>
                    {choices}
                </View>
            </View>
        )
    }
}

class Choice extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false
        }
    }

    onPress() {
        if (this.props.active) {
            this.props.active = false;
            this.props.parent.update(this.props.index, true);
        } else {
            this.props.active = true;
            this.props.parent.update(this.props.index, false);
        }


    }

    render() {
        return (
            <View style={{paddingBottom: "3%"}}>
                <Button style={{marginTop: "1%", marginBottom: "1%", height: "15%"}}
                        color={this.props.active ? "#4285F4" : "gray"}
                        title={this.props.choice} onPress={() => this.onPress()}/>
            </View>
        )
    }
}

export default class Survey extends Component {

    constructor(props) {
        super(props);

        this.state = {
            question: 0,
            answer: [],
            reset: true,
            payload: {},
        }

        AsyncStorage.getItem('userInfo').then((info) => {
            if(info != null) {
                this.props.nav.displayScreen(global.ScreenEnum.Closet);
            }
        });
    }

    onPress() {
        var payload = this.state.payload;
        payload[questions[this.state.question].tag] = this.state.answer;

        this.setState({payload: payload});

        if (this.state.question === questions.length - 1) {
            AsyncStorage.setItem('userInfo', JSON.stringify(payload));
            this.props.nav.displayScreen(global.ScreenEnum.Closet);
        } else {
            this.setState({question: this.state.question + 1, answer: [], reset: true})
        }
    }

    update(answer) {
        this.setState({answer: answer});
    }

    render() {
        if (questions.length === 0) {
            this.nav.displayScreen(global.ScreenEnum.Closet);
        }

        let question = <Question key={this.state.question} question={questions[this.state.question]} parent={this}/>;

        return (
            <View style={{display: "flex", height: "100%"}}>
                <View style={{backgroundColor: "#4285F4", paddingTop: 35, paddingBottom: 15}}>
                    <Text style={{textAlign: "center", color: "white", fontSize: 25}}>Survey</Text>
                </View>
                <View>
                    <Text style={{
                        paddingTop: "5%",
                        paddingLeft: "10%",
                        paddingRight: "10%",
                        fontSize: 16,
                        color: "gray"
                    }}>Before we begin, I have a few questions that I need to ask you first.</Text>
                </View>

                <View style={{backgroundColor: "white", flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <View elevation={2} style={{width: "80%", height: "90%", backgroundColor: "white"}}>
                        <ScrollView style={{flex: 1}}>
                            {question}
                        </ScrollView>
                        <View>
                            <Button disabled={this.state.answer.length === 0}
                                    title={this.state.question !== questions.length - 1 ? "Next" : "Done"}
                                    onPress={() => this.onPress()}
                                    color="#4285F4"/>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}