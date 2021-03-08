import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableWithoutFeedback} from 'react-native'
import DateTimePicker from '@react-native-datetimepicker/datetimepicker'
import { 
    filterSuggestedActivities, 
    sortByPopularity,  
    getActivityNames, 
    createActivity} from '../helpers/ActivityHelper'

export default AddNewActivityCard = (props) => {
    var {activity_info, 
        button_text
    } = props

    const [activity_text, setActivityText] = useState("")
    const [start_time_text, setStartTime] = useState(new Date())
    const [end_time_text, setEndTime] = useState(new Date())

    var filtered_suggested_activities = filterSuggestedActivities(activity_info, activity_text)
    var sorted_filtered_suggested_activities = sortByPopularity(filtered_suggested_activities)

    return(
        <View style = {{...styles.add_activity_card_container, height:350}}>
            <View style = {styles.text_input_container}>
                <TextInput 
                    style = {styles.text_input} 
                    maxLength={20}
                    onChangeText={text => setActivityText(text)}
                    value={activity_text}/>
            </View>
            <SuggestedActivities
                activities = {getActivityNames(sorted_filtered_suggested_activities)}
                onPress = {activity => setActivityText(activity)}/> 
            <View style = {styles.time_container}>
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
            </View>
            <View style = {{flex: 1, backgroundColor: 'violet'}}>
                <Button 
                    style = {{flex: 1}} 
                    title = {button_text || "Log" }
                    onPress={() => addActivity({
                        activity: activity_text, 
                        start_time: start_time_text, 
                        end_time: end_time_text})}/>
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
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center',
    },
    suggested_activities_container: {
        borderRadius:5,
        borderWidth: 2,
        margin: 2,
        borderColor: '#2b2b2b',
        flex: 3, 
        flexDirection: 'row', 
        flexWrap: 'wrap'
    },
    time_container: {
        flex: 2, 
        padding: 5,
        borderWidth: 2,
        borderRadius:5,
        borderColor: '#2b2b2b',
        margin: 2,
    },
    log_button_container: {

    },
    add_activity_card_container: {
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
        flexDirection: 'row',
        alignItems: 'center'
    },
    text_input: {
        flex: 3, 
        borderBottomColor: '#000', 
        borderBottomWidth: 1, 
        margin: 10
    }
})

