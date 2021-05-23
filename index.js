import React from 'react'
import { Provider } from 'react-redux'
import { AppRegistry } from 'react-native';
import Navigator from './src/Navigator'
import { name as appName } from './app.json';

import storeConfig from './src/store/storeConfig'

import axios from 'axios'
axios.defaults.baseURL = 'https://lambe-a423c-default-rtdb.firebaseio.com/'

const store = storeConfig()
const Redux = () => {
    return (
        <Provider store={store}>
            <Navigator />
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => Redux);