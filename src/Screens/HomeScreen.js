import React, { Component } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import ActivitiesFlatlist from '../Components/ActivitiesFlatlist'
import DateSelector from '../Components/DateSelector'

var TEST_DATA = [
{
    activity: 'exercise', 
    start_time: {
        hour: 10,
        min: 30,
        isAm: true
    },
    end_time: {
        hour: 11,
        min: 30,
        isAm: true
    }
},
{
    activity: 'reading', 
    start_time: {
        hour: 11,
        min: 30,
        isAm: true
    },
    end_time: {
        hour: 12,
        min: 30,
        isAm: true
    }
},
{
    activity: 'writing', 
    start_time: {
        hour: 12,
        min: 30,
        isAm: true
    },
    end_time: {
        hour: 1,
        min: 30,
        isAm: true
    }
}]

export default class HomeScreen extends Component {
    render(){
        return (
            <View style = {styles.container}>
                <DateSelector date={'date'}/>
                <ActivitiesFlatlist/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
