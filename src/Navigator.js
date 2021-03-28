    import React, { Component } from 'react'
    import { NavigationContainer } from '@react-navigation/native'
    import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
    import Icon from 'react-native-vector-icons/FontAwesome'
    
    import Feed from './screens/Feed'

    const Tab = createBottomTabNavigator()
    
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
                        <Tab.Screen name='AddPhoto' component={Feed} />
                        <Tab.Screen name='Profile' component={Feed} />
                    </Tab.Navigator>
                </NavigationContainer>
            )
        }
    }