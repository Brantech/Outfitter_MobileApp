import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ToastAndroid, TouchableHighlight } from 'react-native';
import { Header } from 'react-native-elements';
import { Login } from './Login';
import { Register } from './Register';

/** Used for navigation by subwidgets */
export var mainContainer;

/** Enums of the different screens */
export const ScreenEnum = {Login: 0, Register: 1}

/** Styles for the components */
const styles = StyleSheet.create({
  subWidgetContainer: {
    flex: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
});

export default class MainContainer extends React.Component {
  
  constructor(props){
    super(props);

    mainContainer = this;
    this.state = {
      screen: ScreenEnum.Login
    };
  }

  /** Changes the state to display the screen */
  displayScreen(screen) {
    this.setState({screen: screen});
  }

  login(){
    ToastAndroid.show(`u: ${this.state.user} p: ${this.state.pass}`, ToastAndroid.SHORT);
  }

  render() {
    const screen = this.state.screen;
    var widget = <Login/>;

    switch(screen) {
      case ScreenEnum.Login:
        widget = <Login/>;
        break;
      case ScreenEnum.Register:
        widget = <Register/>;
        break;
    }


    return (
      <View style={styles.container}>
        <Header
          placement="left"
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'Outfittr', style: { color: '#fff' } }}
          />
        <View style={styles.subWidgetContainer}>
          {widget}
        </View>
      </View>
    );
  }
}
