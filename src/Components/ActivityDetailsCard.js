import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableWithoutFeedback} from 'react-native'
import DateTimePicker from '@react-native-datetimepicker/datetimepicker'
import { 
    filterSuggestedActivities, 
    sortByPopularity,  
    getActivityNames} from '../helpers/ActivityHelper'

export default ActivityDetailsCard = (props) => {
    var {activity_info, 
        button_text,
        start_time,
        end_time,
        activity,
        onPress,
        activity_error,
        time_error
    } = props

    const [activity_text, setActivityText] = useState(activity || "")
    const [start_time_text, setStartTime] = useState(start_time || new Date())
    const [end_time_text, setEndTime] = useState(end_time || new Date())

    var filtered_suggested_activities = filterSuggestedActivities(activity_info, activity_text)
    var sorted_filtered_suggested_activities = sortByPopularity(filtered_suggested_activities)
    return(
        <View style = {{...styles.add_activity_card_container}}>
            <WrapError 
                error={activity_error.error} 
                error_message = {activity_error.error_message}
                style = {styles.text_input_container}>
                <View style = {{flex: 1, flexDirection: 'row'}}>
                    <TextInput 
                        style = {styles.text_input} 
                        maxLength={20}
                        onChangeText={text => setActivityText(text)}
                        value={activity_text}/>
                </View>
            </WrapError>
            <SuggestedActivities
                activities = {getActivityNames(sorted_filtered_suggested_activities)}
                onPress = {activity => setActivityText(activity)}/> 
            <WrapError 
                error={time_error.error} 
                error_message = {time_error.error_message}
                style = {styles.time_container}>
                <View style = {styles.time_row}>
                    <Text style = {styles.time_text}>{"Start: "}</Text>
                    <DateTimePicker
                        style={{flex: 1}}
                        testID="dateTimePicker"
                        value={new Date(start_time_text)}
                        mode={'time'}
                        is24Hour={true}
                        display="inline"
                        onChange={(event, date) => setStartTime(date)}
                        />
                </View>
                <View style = {styles.time_row}>
                    <Text style = {styles.time_text}>{"End: "}</Text>
                    <DateTimePicker
                        style={{flex: 1}}
                        testID="dateTimePicker"
                        value={new Date(end_time_text)}
                        mode={'time'}
                        is24Hour={true}
                        display="inline"
                        onChange={(event, date) => setEndTime(date)}
                        />
                </View>
            </WrapError>
            <View style = {{flex: 1, backgroundColor: 'violet'}}>
                <Button 
                    style = {{flex: 1}} 
                    title = {button_text}
                    onPress={() => onPress({
                        activity: activity_text, 
                        start_time: start_time_text, 
                        end_time: end_time_text})}/>
            </View>
        </View>)
}

const WrapError = (props) => {
    var {error, style, error_message} = props
    var border_color = error ? 'red' : '#2b2b2b'
    return (
        <View style = {{flex: 1}}>
            {error ? <Text style = {{flex: 1}}>{error_message}</Text> : null}
            <View style = {{...style, borderColor: border_color}}>
                {props.children}
            </View>
        </View>)
}

const SuggestedActivities = (props) => {
    var {activities, onPress} = props
    return (
        <View style = {styles.suggested_activities_container}>
            {activities.map((activity) => {
                return(
                    <TouchableWithoutFeedback onPress = {() => onPress(activity)}>
                        <View style = {{
                            backgroundColor: 'green', margin: 5, padding: 5,borderRadius:5,
                            borderWidth: 1,
                            borderColor: 'green'}}>
                            <Text style = {{fontSize: 14}}>{activity}</Text>
                        </View>
                    </TouchableWithoutFeedback>)
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    text_input_container: {
        borderRadius:5,
        margin: 2,
        borderWidth: 2,
        borderColor: '#2b2b2b',
        // height: 50,
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center',
    },
    suggested_activities_container: {
        borderRadius:5,
        borderWidth: 2,
        margin: 2,
        borderColor: '#2b2b2b',
        height: 120,
        flexDirection: 'row', 
        // height: 200,
        flexWrap: 'wrap'
    },
    time_container: {
        borderRadius:5,
        borderWidth: 2,
        margin: 2,
        borderColor: '#2b2b2b',
        flex: 2, 
        // height: 110,
        padding: 5,
        margin: 2,
    },
    log_button_container: {

    },
    add_activity_card_container: {
        flex: 1,
        padding: 5,
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: '#c2c2c2'
    },
    time_text : {
        fontSize: 14
    },
    time_row : {
        // height: 50,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    text_input: {
        borderBottomColor: '#000', 
        borderBottomWidth: 1, 
        margin: 10,
        flex: 1
    }
})

