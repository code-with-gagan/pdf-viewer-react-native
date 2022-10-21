import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import { NativeBaseProvider } from 'native-base';
import { primary_color } from '@Utils/ColorUtility';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from '@Screen/Settings';
import Home from '@Screen/Home';

const Tab = createBottomTabNavigator();

const AppWrapper = () => {
    return (<>
        <NavigationContainer>
            <NativeBaseProvider>
                <Tab.Navigator>
                    <Tab.Screen
                        name="Home"
                        component={Home}
                        options={{
                            title: 'PDF Viewer',
                            tabBarLabel: 'Home',
                            headerShown: false,
                            tabBarShowLabel: false,
                            tabBarLabelPosition: 'below-icon',
                            tabBarLabelStyle: { fontWeight: "bold" },
                            tabBarIcon: () => {
                                return (<>
                                    <Entypo name="home" size={30} color={primary_color} />
                                </>)
                            }
                        }}
                    />
                    <Tab.Screen
                        name="Settings"
                        component={Settings}
                        options={{
                            title: 'Settings',
                            tabBarLabel: 'Settings',
                            tabBarShowLabel: false,
                            tabBarLabelPosition: 'below-icon',
                            tabBarLabelStyle: { fontWeight: "bold" },
                            tabBarIcon: () => {
                                return (<>
                                    <Ionicons name="settings-sharp" size={30} color={primary_color} />
                                </>)
                            }
                        }}
                    />
                </Tab.Navigator>
            </NativeBaseProvider>
        </NavigationContainer>
    </>)
}

export default AppWrapper