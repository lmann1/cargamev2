<React.Fragment>
      <Text style={styles.baseText}>
        <Text style={styles.titleText} onPress={this.onPressTitle}>
          {this.state.titleText}{'\n'}{'\n'}
        </Text>
        <Text numberOfLines={5}>
          {this.state.bodyText}
        </Text>
      </Text>


<Image source={require('./speedwayr.png')} style={styles.image} />

       <GameLoop style={styles.container} onUpdate={this.updateHandler}>
        <View style={[styles.player, { left: this.state.x, top: this.state.y }]} />
      </GameLoop>

      </React.Fragment>



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
      