import { View, Text } from 'react-native'
import React from 'react'

const Settings = () => {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: "black", fontSize: 20 }}>This App Made by Gagan Aggarwal</Text>
            <Text style={{ color: "black", fontSize: 20, marginTop: 10 }}>
                <Text style={{ fontWeight: "bold" }}>
                    Email:&nbsp;
                </Text>
                gaggarwal124@gmail.com
            </Text>
        </View>
    )
}

export default Settings