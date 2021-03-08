import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'


export default function DateSelector(props) {
    var {
        date, 
        left_arrow_disabled, 
        right_arrow_disabled,
        onDateChange} = props
    var arrow_left_color = left_arrow_disabled ? '#8a8a8a' : '#1c1c1c'
    var arrow_right_color = right_arrow_disabled ? '#8a8a8a' : '#1c1c1c'

    changeDate = (amount) => {
        var new_date = new Date(date)
        new_date.setDate(date.getDate() + amount)
        onDateChange(new_date)
    }
    return (
        <View style={styles.container}>
            <Icon 
                disabled = {left_arrow_disabled}
                disabledStyle = {{backgroundColor: null}}
                color = {arrow_left_color} 
                name = 'chevron-left' 
                size = {40}
                onPress = {() => changeDate(-1)}/>
            <Text style = {styles.date_text}>{date.toDateString()}</Text>
            <Icon 
                disabled = {right_arrow_disabled} 
                disabledStyle = {{backgroundColor: null}}
                color = {arrow_right_color} 
                name = 'chevron-right' 
                size = {40}
                onPress = {() => changeDate(1)}/>
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
