import React, { PureComponent } from 'react';
import { AppRegistry, Alert, Animated, Button, Easing, StyleSheet, Text, View, Dimensions, ImageBackground } from 'react-native';
import { GameEngine } from "react-native-game-engine";
import { GameLoop } from "react-native-game-engine";
import ExtraDimensions from 'react-native-extra-dimensions-android';


const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
console.log(HEIGHT);
console.log("WIDTH: "+ WIDTH);
const RADIUS = 25;
var count = 0;
const titleText = "HELLO";
var touchCount = 0;
var xVals = new Array(WIDTH);
var yValsAbove = new Array(WIDTH);
var yValsBelow = new Array(WIDTH);
const a=(490/2)*(490/2);
console.log("a: " + a);
const b=(WIDTH/2)*(WIDTH/2);
console.log("b: " + b);

for(var i=0; i<=WIDTH; i++) {
  xVals[i] = i;
}

  for(var l=0; l<xVals.length; l++) {
    var temp=(xVals[l]*xVals[l])/b;
    console.log(temp);
    temp = 1-temp;
    console.log(temp);
    temp = a*temp;
    console.log(temp);
    yValsAbove[l]=Math.sqrt(temp);
    yValsBelow[l]=245+yValsAbove[l];
    console.log("yValue " + l + ":" + yValsAbove[l]);
    
  }
export default class App extends PureComponent {
  constructor() {
    super();
    this.spinValue = new Animated.Value(0),
    this.state = {
      x: xVals[0],
      y: yValsAbove[0],
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

  updateCar() {
    this.setState()
  }


  updateHandler = ({ touches, screen, time }) => {
    if(this.state.x <WIDTH && this.state.y<490) {
      this.setState({
        x: this.state.x + 5,
        y: this.state.y
      });
    }

    if(this.state.x==WIDTH) {
      this.setState({
        x:this.state.x,
        y:this.state.y+5

      });

      if(this.state.y==490){
        this.setState({
          x:this.state.x-5,
          y:this.state.y
  
        });
      }
    }

    if(this.state.y==490) {
      this.setState({
        x:this.state.x-5,
        y:this.state.y

      });
      
    }

    if(this.state.x==0 && this.state.y>0) {
      this.setState({
        x:this.state.x,
        y:this.state.y-5

      });
    }
    };

  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })
    return (
      <React.Fragment>
      <Text style={styles.baseText}>
        <Text style={styles.titleText} onPress={this.onPressTitle}>
          {this.state.titleText}{'\n'}{'\n'}
        </Text>
        <Text numberOfLines={5}>
          {this.state.bodyText}
        </Text>
      </Text>
      <GameLoop onUpdate={this.updateHandler}>
      <View style={[{ left: this.state.x-100, top: this.state.y }]}>
      <Animated.Image style={{width: 75, height: 45}}
      source={{uri: 'https://image.flaticon.com/icons/png/128/171/171239.png'}} />
      </View>
      </GameLoop>
</React.Fragment>
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
  height: HEIGHT
},
});
 
AppRegistry.registerComponent("App", () => App);