import React, { Component } from 'react'
import {AppRegistry} from 'react-native';
import 'react-native-get-random-values';
import {name as appName} from './app.json';
import {SafeAreaProvider} from 'react-native-safe-area-context'
import App from './App'

function Main() {
    return <SafeAreaProvider>
        <App/>
    </SafeAreaProvider>;
  }

AppRegistry.registerComponent(appName, () => Main);
