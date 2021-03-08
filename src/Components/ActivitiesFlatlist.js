import React, { useState } from 'react'
import { Text, View, FlatList, StyleSheet, ScrollView, Modal, TextInput, Button, TouchableWithoutFeedback, Dimensions } from 'react-native'
import { PRIMARY } from '../Constants/Colors'
import AddNewActivityCard from './AddNewActivityCard'
import { createActivity, getActivitiesAndPopularity } from '../helpers/ActivityHelper'
import { formatDate } from '../helpers/Date'
import { Icon } from 'react-native-elements'
import UpdateActivityCard from './UpdateActivityCard'

const TIME_SLOT_HEIGHT = 120
const HEIGHT = 24 * TIME_SLOT_HEIGHT

export default function ActivitiesFlatlist(props) {
    var {activities,
        addActivity,
        updateActivity,
        deleteActivity,
        footer_enabled
    } = props
    const [modal_visible, setModalVisible] = useState(false);
    const [selected_item, setSelectedItem] = useState(null)
    var activity_info = getActivitiesAndPopularity(activities)

    onDelete = () => {
        deleteActivity(selected_item)
        setModalVisible(false)
    }

    onUpdate = (activity) => {
        
        updateActivity(activity)
        setModalVisible(false)
    }

    onAddActivity = (activity) => {
        let new_activity = createActivity(activity.activity, activity.start_time, activity.end_time)
        addActivity(new_activity)
    }

    handleActivityCardPress = (item) => {
        setSelectedItem(item)
        setModalVisible(!modal_visible)
    }

    footerComponent = () => {
        if(footer_enabled){
            return(
                <AddNewActivityCard 
                    activity_info = {activity_info}
                    addActivity = {onAddActivity}/>  )
        } else {return null}
    }

    return (
        <ScrollView>
            <ActivityModal 
                visible = {modal_visible} 
                activity_info = {activity_info}
                setVisible = {setModalVisible}
                selected_item = {selected_item}
                onUpdate = {onUpdate}
                onDelete = {onDelete}/>
            <View style={styles.container}>
                <View style = {{flex: 1, flexDirection: 'row'}}>
                    <View style = {{flex: 0.2, alignItems: 'center'}}>
                        <TimeAxis/>
                    </View>
                    <View style = {styles.flatlist_container}>
                        <FlatList
                            // initialScrollIndex = {5}
                            scrollEnabled={false}
                            data={activities}
                            renderItem={({item, index}) => <ActivityCard 
                                last_item = { index > 1 ? activities[index - 1] : null}
                                activity = {item.activity}
                                start_time = {item.start_time}
                                end_time = {item.end_time}
                                onPress = {() => handleActivityCardPress(item)}
                                />}
                            keyExtractor={item => item.id}
                            ListFooterComponent = {footerComponent}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const ActivityCard = (props) => {
    var {activity, start_time, end_time, onPress, last_item} = props
    start_time = new Date(start_time)
    end_time = new Date(end_time)
    var length = (end_time.getTime() - start_time.getTime()) / (3600 * 1000)
    var margin_top = last_item ? (start_time.getTime() - new Date(last_item.end_time).getTime()) / (3600 * 1000) : 0
    
    var start_time_formatted = formatDate(start_time).hour
    var end_time_formatted = formatDate(end_time).hour
    
    return(
        <TouchableWithoutFeedback onPress = {onPress}>
            <View style = {{...styles.card_container, height: TIME_SLOT_HEIGHT * length, marginTop: TIME_SLOT_HEIGHT * margin_top}}>
                <Text style={styles.card_title}>{activity}</Text>
                <Text style={styles.card_time}>{`${start_time_formatted} - ${end_time_formatted}`}</Text>
            </View>
        </TouchableWithoutFeedback>)
}

const TimeAxis = () => {
    const times = ['12AM', '1AM', '2AM', '3AM', '4AM', '5AM','6AM','7AM','8AM',
    '9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM','6PM','7PM',
    '8PM','9PM','10PM','11PM']

    return (
        <View style={{flex:1, justifyContent: 'space-between'}}>
            {times.map((time) => {
                return (
                <View style = {{height: TIME_SLOT_HEIGHT}}>
                    <Text>{time}</Text>
                </View>)})}
        </View>
    )
}

const ActivityModal = (props) => {
    var {
        visible, 
        setVisible, 
        selected_item,
        onDelete,
        onUpdate,
        activity_info
    } = props
    var modal_width = 300
    var modal_height = 500
    var left_offset = (Dimensions.get('window').width / 2) - (modal_width / 2)
    var top_offset = (Dimensions.get('window').height / 2) - (modal_height / 2)
    if(visible){
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                    setVisible(false);
                }}>
                <View>
                    <TouchableWithoutFeedback onPress = {() => setVisible(false)}>
                        <View style = {{height: '100%', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}/>
                    </TouchableWithoutFeedback>
                    <View style = {{position: 'absolute', left: left_offset, top: top_offset, height: modal_height, width: modal_width, backgroundColor: 'white'}}>
                        <View style = {{flex: 1, padding: 10}}>
                            <View style = {{flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <Icon 
                                    name = {"delete"}
                                    raised
                                    reverse
                                    color="#000"
                                    onPress={onDelete}/>
                            </View>
                            <UpdateActivityCard
                                activity_info = {activity_info}
                                activity = {selected_item}
                                updateActivity = {onUpdate}
                                button_text = {"update"}/>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    } else return null
}

const styles = StyleSheet.create({
    container: {
        // flex: 1
        height: HEIGHT
    },
    card_container: {
        height: TIME_SLOT_HEIGHT * 0.5,
        backgroundColor: PRIMARY,
        padding: 5,
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
    },
    card_title:{
        fontSize: 18,
        // fontFamily: 'San Francisco'
    },
    card_time: {

    },
    flatlist_container:{
        flex: 1,
        backgroundColor: '#e6e6e6'
    },
})
