import React, { Component } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import ActivitiesFlatlist from '../Components/ActivitiesFlatlist'
import DateSelector from '../Components/DateSelector'


export default class HomeScreen extends Component {
    render(){
        var {activities, 
            addActivity, 
            updateActivity,
            deleteActivity,
            selected_date,
            setSelectedDate} = this.props
        
        var right_arrow_disabled = selected_date.toDateString()  == new Date().toDateString()
        var footer_enabled = selected_date.toDateString() == new Date().toDateString()
        return (
            <View style = {styles.container}>
                <DateSelector 
                    date={selected_date}
                    left_arrow_disabled = {false}
                    right_arrow_disabled = {right_arrow_disabled}
                    onDateChange = {setSelectedDate}
                    />
                <ActivitiesFlatlist 
                    activities={activities}
                    addActivity = {addActivity}
                    updateActivity = {updateActivity}
                    deleteActivity = {deleteActivity}
                    footer_enabled = {footer_enabled}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})