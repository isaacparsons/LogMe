import React, { useState } from 'react'
import { Text, View, FlatList, StyleSheet, Modal, TextInput, Button, TouchableWithoutFeedback, Dimensions } from 'react-native'
import { Icon } from 'react-native-elements'
import ActivityDetailsCard from './ActivityDetailsCard'


export default ActivityModal = (props) => {
    var {
        visible, 
        setVisible, 
        selected_item,
        onDelete,
        onUpdate,
        activity_info,
        activity_error,
        time_error
    } = props
    var modal_width = 300
    var modal_height = 550
    var delete_row_height = 65
    var details_container = modal_height - delete_row_height
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
                <View style = {{flex: 1}}>
                    <TouchableWithoutFeedback onPress = {() => setVisible(false)}>
                        <View style = {{height: '100%', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}/>
                    </TouchableWithoutFeedback>
                    <View style = {{position: 'absolute', left: left_offset, top: top_offset, height: modal_height, width: modal_width, backgroundColor: 'white'}}>
                        <View style = {{ flex: 1, padding: 10}}>
                            <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', backgroundColor: 'green'}}>
                                <Icon 
                                    name = {"delete"}
                                    raised
                                    reverse
                                    color="#000"
                                    onPress={onDelete}/>
                            </View>
                            <View style = {{flex: 7, backgroundColor: 'purple'}}>
                                <ActivityDetailsCard
                                    activity_info = {activity_info}
                                    onPress = {onUpdate}
                                    start_time = {selected_item.start_time}
                                    end_time = {selected_item.end_time}
                                    activity = {selected_item.activity}
                                    button_text = {"Update"}
                                    time_error = {time_error}
                                    activity_error = {activity_error}/>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    } else return null
}