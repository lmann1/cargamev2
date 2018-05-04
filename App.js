import React, { PureComponent } from 'react';
import { AppRegistry, Alert, Animated, Button, Easing, StyleSheet, Text, View, Dimensions, ImageBackground } from 'react-native';
import { GameEngine } from "react-native-game-engine";
import { GameLoop } from "react-native-game-engine";


const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
const RADIUS = 25;
var count = 0;

export default class App extends PureComponent {
  constructor() {
    super();
    this.spinValue = new Animated.Value(0),
    this.state = {
      x: WIDTH / 2 - RADIUS,
      y: HEIGHT /2 - RADIUS,
      countText: count,
    };
  }

  componentDidMount() {
    this.spin()
  }

  spin() {
    this.spinValue.setValue(0)
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear
      }
      ).start(() => this.spin())
  }


  updateHandler = ({ touches, screen, time }) => {
    let move = touches.find(x => x.type === "move");
    if(move) {
      count = count+1;
      console.log(count);
      this.setState({
        x: this.state.x + move.delta.pageX,
        y: this.state.y + move.delta.pageY
      });
    }
  };

  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })
    return (
      <ImageBackground source={require('./speedwayr.png')} style={styles.image}>

      <Text style={styles.baseText}>
        <Text style={styles.titleText} onPress={this.onPressTitle}>
          {this.state.titleText}{'\n'}{'\n'}
        </Text>
        <Text numberOfLines={5}>
          {this.state.bodyText}
        </Text>
      </Text>

      
      <GameLoop onUpdate={this.updateHandler}>
      <View style={[{ left: this.state.x, top: this.state.y }]}>
      <Animated.Image style={{width: 100, height: 75, transform: [{rotate: spin}]}}
      source={{uri: 'https://image.flaticon.com/icons/png/128/171/171239.png'}} />
      </View>
      </GameLoop>

      </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  player: {
    position: "absolute",
    backgroundColor: "blue",
    width: RADIUS * 2,
    height: RADIUS * 2,
    borderRadius: RADIUS * 2
  },

titleText:{
  fontSize: 20,
  fontWeight: 'bold',
},

image: {
  width: WIDTH,
  height: HEIGHT,
},
});
 
AppRegistry.registerComponent("App", () => App);