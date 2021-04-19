import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome'

import Feed from './screens/Feed'
import AddPhoto from './screens/AddPhoto'
import Profile from './screens/Profile'
import Login from './screens/Login'
import Register from './screens/Register'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const authRouter = () => {
    return(
        <Stack.Navigator initialRouteName='Login' >
            <Stack.Screen name='Login' component={Login}
                options={{ headerShown: false }} />
            <Stack.Screen name='Sign up' component={Register} />
        </Stack.Navigator>
    )
}

const loginOrProfileRouter = () => {
    return(
        <Stack.Navigator initialRouteName='Auth'>
            <Stack.Screen name='Profile' component={Profile} />
            <Stack.Screen name='Auth' component={authRouter} 
                options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default class Navigator extends Component {
    render() {
        return (
            <NavigationContainer>
                <Tab.Navigator 
                    initialRouteName='Feed'
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ color, size }) => {
                            let iconName;
                            switch (route.name) {
                                case 'Feed':
                                    iconName = 'home'
                                    break;
                                case 'AddPhoto':
                                    iconName = 'camera'
                                    break;
                                default:
                                    iconName = 'user'
                                    break;
                            }
                            return <Icon name={iconName} size={size} color={color} />
                        }
                    })}
                    tabBarOptions={{ showLabel: false }}>
                    <Tab.Screen name='Feed' component={Feed} />
                    <Tab.Screen name='AddPhoto' component={AddPhoto} />
                    <Tab.Screen name='Profile' component={loginOrProfileRouter} />
                </Tab.Navigator>
            </NavigationContainer>
        )
    }
}