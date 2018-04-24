/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity
} from 'react-native';

import Video from 'react-native-video';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor(props) {
    super(props);

  }
  state = {
    player: null,     //Player Object
    rate: 1,          //播放速度
    paused: false,    //暫停
    volume: 1,        //音量
    muted: false,     //靜音
  };

  onButtonPress = () => {


    this.state.player.seek(0);



    Alert.alert(
      'Alert Title',
      this.state.paused.toString()
    )


    if (this.state.paused == true) {
      this.setState({ paused: false })
    }
    else {
      this.setState({ paused: true })
    }

  };

  //速度調整
  renderRateControl(rate) {
    const isSelected = (this.state.rate == rate);
    return (
      <TouchableOpacity onPress={() => { this.setState({ rate: rate }) }}>
        <Text style={[styles.controlOption, {}]}>
          {rate}x
        </Text>
      </TouchableOpacity>
    )
  }


  //靜音調整
  renderMutedControl() {
    const isMuted = (this.state.muted == true);
    return (
      <TouchableOpacity onPress={() => { this.setState({ muted: !isMuted }) }}>
        <Text style={styles.controlOption}>
          {isMuted ? "靜音" : "聲音"}
        </Text>
      </TouchableOpacity>
    )
  }

  //音量調整
  renderVolumeControl(volume) {
    const isSelected = (this.state.volume == volume);

    return (
      <TouchableOpacity onPress={() => { this.setState({ volume: volume }) }}>
        <Text style={[styles.controlOption, { fontWeight: isSelected ? "bold" : "normal" }]}>
          {volume * 100}%
          </Text>
      </TouchableOpacity>
    )
  }


  render() {
    return (

      <View style={styles.container}>

        <Video source={{ uri: "http://www.tccaiam.tw/music/002/1_2part1.mp3" }}   // Can be a URL or a local file.
          poster="https://baconmockup.com/300/200/" // uri to an image to display until the video plays
          ref={(ref) => {
            this.state.player = ref
          }}                                      // Store reference
          rate={this.state.rate}                  // 0 is paused, 1 is normal.
          volume={this.state.volume}              // 0 is muted, 1 is normal.
          muted={this.state.muted}                // Mutes the audio entirely.
          paused={this.state.paused}              // Pauses playback entirely.
          resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
          repeat={true}                           // Repeat forever.
          playInBackground={false}                // Audio continues to play when app entering background.
          playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
          ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
          progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
          onLoadStart={this.loadStart}            // Callback when video starts to load
          onLoad={this.setDuration}               // Callback when video loads
          onProgress={this.setTime}               // Callback every ~250ms with currentTime
          onEnd={this.onEnd}                      // Callback when playback finishes
          onError={this.videoError}               // Callback when video cannot be loaded
          onBuffer={this.onBuffer}                // Callback when remote video is buffering
          onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
          style={styles.backgroundVideo} />









        <View style={styles.controls}>
          <View style={styles.generalControls}>
            <View style={styles.rateControl}>
              <TouchableOpacity onPress={() => { this.setState({ rate: rate }) }}>
                <View style={styles.rateControl}>
                  {this.renderRateControl(0.5)}
                  {this.renderRateControl(1.0)}
                  {this.renderRateControl(2.0)}
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.volumeControl}>
              <TouchableOpacity onPress={() => { this.setState({ rate: rate }) }}>
                <View style={styles.rateControl}>
                  {this.renderVolumeControl(0.5)}
                  {this.renderVolumeControl(1)}
                  {this.renderVolumeControl(1.5)}
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.resizeModeControl}>
              <TouchableOpacity onPress={() => { this.setState({ rate: rate }) }}>
                <View style={styles.rateControl}>
                  {this.renderMutedControl()}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>


        <Button
          onPress={this.onButtonPress}
          title="測試按鈕"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  controls: {
    backgroundColor: "transparent",
    borderRadius: 5,
    position: 'absolute',
    bottom: 44,
    left: 4,
    right: 4,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 20,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 20,
    backgroundColor: '#2C2C2C',
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    paddingBottom: 5,
  },
  skinControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rateControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  volumeControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ignoreSilentSwitchControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 15,
    color: "black",
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 15,
  },
  nativeVideoControls: {
    top: 184,
    height: 300
  }
});