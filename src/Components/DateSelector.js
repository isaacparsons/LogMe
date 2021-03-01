import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'


export default function DateSelector(props) {
    var {date} = props
    return (
        <View style={styles.container}>
            <Icon name='chevron-left' size = {40}/>
            <Text style = {styles.date_text}>{date}</Text>
            <Icon name='chevron-right' size = {40}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5
    },
    date_text: {
        fontSize: 20,
        padding: 10
    }
})
