import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, ScrollView } from 'react-native'
import { PRIMARY } from '../Constants/Colors'

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

const TIME_SLOT_HEIGHT = 120
const HEIGHT = 24 * TIME_SLOT_HEIGHT

const ActivityCard = ({ title }) => (
    <View style = {styles.card_container}>
        <Text style={styles.card_title}>{title}</Text>
        <Text style={styles.card_time}>{title}</Text>
    </View>
);

const AddNewActivityCard = ({}) => {
    <View style = {styles.card_container}>
        <Text style={styles.card_title}>{title}</Text>
        <Text style={styles.card_time}>{title}</Text>
    </View>
}

const renderItem = ({ item }) => (
    <ActivityCard title={item.activity} />
    );

const TimeAxis = () => {
    const times = ['1AM', '2AM', '3AM', '4AM', '5AM','6AM','7AM','8AM',
    '9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM','6PM','7PM',
    '8PM','9PM','10PM','11PM','12AM']

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

export default function ActivitiesFlatlist() {
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style = {{flex: 1, flexDirection: 'row'}}>
                    <View style = {{flex: 0.2, alignItems: 'center'}}>
                        <TimeAxis/>
                    </View>
                    <View style = {{flex: 1, backgroundColor: 'green'}}>
                        <View style = {styles.flatlist_container}>
                            <FlatList
                                scrollEnabled={false}
                                data={TEST_DATA}
                                renderItem={renderItem}
                                keyExtractor={item => item.id}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
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
        fontSize: 18
    },
    card_time: {

    },
    flatlist_container:{
    }
})
