/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
  Image,
  StatusBar
} from 'react-native';

import firebase from 'react-native-firebase';


import {
  ViroARSceneNavigator
} from 'react-viro';

import {IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager';

/*
 TODO: Insert your API key below
 */
var sharedProps = {
  apiKey:"FD203118-F39D-42B3-99B5-2556C1432FA7",
}

// Sets the default scene you want for AR and VR
var InitialARScene = require('./js/HelloWorldSceneAR');

var UNSET = "UNSET";
var AR_NAVIGATOR_TYPE = "AR";

// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
var defaultNavigatorType = UNSET;

export default class ViroSample extends Component {
  constructor() {
    super();

    this.state = {
      navigatorType : defaultNavigatorType,
      sharedProps : sharedProps
    }
    this._getIntroScreen = this._getIntroScreen.bind(this);
    this._getARNavigator = this._getARNavigator.bind(this);
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(this);
    this._exitViro = this._exitViro.bind(this);
    this._renderDotIndicator = this._renderDotIndicator.bind(this);
  }

  componentDidMount() {

    if (__DEV__) {
      firebase.config().enableDeveloperMode();
    }
    
    // Set default values
    firebase.config().setDefaults({
      hasExperimentalFeature: false,
    });
    
    firebase.config().fetch(0)
      .then(() => {
        return firebase.config().activateFetched();
      })
      .then((activated) => {
        if (!activated) console.log('Fetched data not activated');
        return firebase.config().getValue('hasExperimentalFeature');
      })
      .then((snapshot) => {
        const hasExperimentalFeature = snapshot.val();
    
        if(hasExperimentalFeature) {
          console.log("hasExperimentalFeature: TRYE");
        } else {
          console.log("hasExperimentalFeature: FALSE")
        }
    
        // continue booting app
      })
      .catch(console.error);    
  }
  
  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {
    if (this.state.navigatorType == UNSET) {
      return this._getIntroScreen();
    } else if (this.state.navigatorType == AR_NAVIGATOR_TYPE) {
      return this._getARNavigator();
    }
  }

  // Presents the user with a choice of an AR or VR experience
  _getIntroScreen() {
    return (
      <View style={styles.screenContainer}>
        <StatusBar hidden={true} />
        <View style={styles.screen}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>
              BELLA RUNE
            </Text>
          </View>
          <IndicatorViewPager style={styles.introSlidesContainer} indicator={this._renderDotIndicator()}>
          <View style={[styles.introSlide]}>
            <View style={styles.introSlideImageContainer}>
              <Image style={styles.introSlideImage} source={require('./assets/ui/img/introslide-testimage.png')} resizeMode='cover'/>
            </View>
            <Text style={styles.introSlideHeader}>
              NOW AT
            </Text>
            <Text style={styles.introSlideBody}>
              <Text style={styles.italic}>The Fabric of Felicity{"\n"}</Text>
              Garage Museum of Contemporary Art
              Moscow, Russia
            </Text>
          </View>
          <View style={[styles.introSlide]}>
            <View style={styles.introSlideImageContainer}>
              <Image style={styles.introSlideImage} source={require('./assets/ui/img/introslide-testimage.png')} resizeMode='cover'/>
            </View>
            <Text style={styles.introSlideHeader}>
              BE TRIGGER HAPPY
            </Text>
            <Text style={styles.introSlideBody}>
              Point your phone/tablet towards the triggers you find, and what is in-between will be revealed
            </Text>
          </View>
          <View style={[styles.introSlide]}>
            <View style={styles.introSlideImageContainer}>
              <Image style={styles.introSlideImage} source={require('./assets/ui/img/introslide-testimage.png')} resizeMode='cover'/>
            </View>
            <Text style={styles.introSlideHeader}>
              SHARE YOUR EXPERIENCE
            </Text>
            <Text style={[styles.introSlideBody] }>
              Share the photos you take with friends and family
            </Text>  
          </View>
          <View style={[styles.introSlide]} />
          </IndicatorViewPager>
          <View style={styles.actionButtonContainer}>
            <TouchableHighlight style={styles.actionButton} underlayColor={'#68a0ff'} onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE)}>
              <Text style={styles.buttonText}>AR</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>  
    );
  }

  _renderDotIndicator() {
    return <PagerDotIndicator pageCount={3} />;
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator() {
    return (
      <View style={styles.screenContainer}>
        <StatusBar hidden={true} />
        <ViroARSceneNavigator {...this.state.sharedProps}
          initialScene={{scene: InitialARScene}} />
      </View>
    );
  }
  
  // This function returns an anonymous/lambda function to be used
  // by the experience selector buttons
  _getExperienceButtonOnPress(navigatorType) {
    return () => {
      this.setState({
        navigatorType : navigatorType
      })
    }
  }

  // This function "exits" Viro by setting the navigatorType to UNSET.
  _exitViro() {
    this.setState({
      navigatorType : UNSET
    })
  }
}

var styles = StyleSheet.create({
  viroContainer: {
    flex: 1,
    backgroundColor: 'black'
  },
  screenContainer: {
    flex: 1,
    alignItems:'stretch',
    backgroundColor: 'black'
  },
  screen: {
    flex: 1,
    alignItems:'stretch',
    backgroundColor: '#4a1749'
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16
  },
  header: {
    flexDirection: 'column',
    alignItems:'center',
    color: '#4f51ff',
    fontSize: 16,
    lineHeight: 24
  },
  introSlidesContainer: {
    flex: 1,
  },
  introSlide: {
    flex: 1,
    alignItems:'center',

  },
  introSlideImageContainer: {
    paddingLeft: 32,
    paddingRight: 32

  },
  introSlideImage: {
    width: 320,
    height: 320
  },
  introSlideHeader: {
    textAlign: 'center',
    color: '#4f51ff',
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 64,
    marginRight: 64,
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 320
  },
  introSlideBody: {
    textAlign: 'center',
    color: '#b35cff',
    marginLeft: 64,
    marginRight: 64,
    fontSize: 18,
    lineHeight: 24,
    maxWidth: 320
  },
  bold: {
    fontWeight: 'bold'
  },  
  italic: {
    fontStyle: 'italic'
  },
  actionButtonContainer: {
    alignItems:'center',
    marginTop: 16,
    marginBottom: 16
  },
  actionButton: {
    width: 96,
    height: 96,
    backgroundColor:'#68a0cf',
    borderColor: '#fff',
    borderRadius: 48,
    borderWidth: 4,
  }
});

module.exports = ViroSample
