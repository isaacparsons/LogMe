import React, { Component, useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
} from 'react-native';
import { filterActivitiesByDate } from './src/helpers/ActivityHelper';
import HomeScreen from './src/Screens/HomeScreen';


export default function App() {
  var activities_data = [
    {
      id: 0,
      activity: 'exercise', 
      start_time: "Sat Mar 07 2021 00:00:00 GMT-0700 (Mountain Standard Time)",
      end_time: "Sat Mar 07 2021 01:00:00 GMT-0700 (Mountain Standard Time)"
    },
    {
      id: 1,
      activity: 'reading', 
      start_time: "Sat Mar 07 2021 01:00:00 GMT-0700 (Mountain Standard Time)",
      end_time: "Sat Mar 07 2021 01:30:00 GMT-0700 (Mountain Standard Time)"
    },
    {
      id:2,
      activity: 'writing', 
      start_time: "Sat Mar 07 2021 01:30:00 GMT-0700 (Mountain Standard Time)",
      end_time: "Sat Mar 07 2021 02:30:00 GMT-0700 (Mountain Standard Time)"
    },
    {
      id:3, 
      activity: 'exercise', 
      start_time: "Sat Mar 07 2021 04:00:00 GMT-0700 (Mountain Standard Time)",
      end_time: "Sat Mar 07 2021 05:30:00 GMT-0700 (Mountain Standard Time)"
    },
    {
      id: 4,
      activity: 'exercise', 
      start_time: "Sat Mar 07 2021 06:00:00 GMT-0700 (Mountain Standard Time)",
      end_time: "Sat Mar 07 2021 07:00:00 GMT-0700 (Mountain Standard Time)"
    },
    {
      id: 5,
      activity: 'exercise', 
      start_time: "Sat Mar 07 2021 07:00:00 GMT-0700 (Mountain Standard Time)",
      end_time: "Sat Mar 07 2021 08:00:00 GMT-0700 (Mountain Standard Time)"
    },
    {
      id: 6,
      activity: 'exercise',
      start_time: "Sat Mar 07 2021 08:00:00 GMT-0700 (Mountain Standard Time)",
      end_time: "Sat Mar 07 2021 10:00:00 GMT-0700 (Mountain Standard Time)"
    }]
  const [state, setState] = useState({
    activities : activities_data
  })
  const [selected_date, setSelectedDate] = useState(new Date())

  
  // called when component mounts or updates
  useEffect(() => { 
    // fetch data from async storage
    // update state
  });

  addActivity = (activity) => {
    let new_activities = state.activities
    new_activities.push(activity)
    setState({activities: new_activities})
    // TODO: update storage
  }

  updateActivity = (activity) => {
    let new_activities = state.activities.map((element) => {
      if(activity.id == element.id){
          return activity
      } else {return element}
    })
    setState({activities: new_activities})
    // TODO: update storage
  }

  deleteActivity = (activity) => {
    // console.log(activity)
    let activities = state.activities
    let updated_activities = []
    activities.forEach((element) => {
      if(!(activity.id == element.id)){
          updated_activities.push(element)
        }
    })
    // console.log(updated_activities)
    setState({activities: updated_activities})
    // TODO: update storage
  }

  var {activities} = state
  var filtered_activities = filterActivitiesByDate(activities, selected_date)
  console.log(filtered_activities)
  return (
    <View style = {{flex: 1}}>
      <View style = {{height: 60}}></View>
      <HomeScreen 
        selected_date = {selected_date}
        setSelectedDate = {setSelectedDate}
        activities = {filtered_activities}
        addActivity = {addActivity}
        updateActivity = {updateActivity}
        deleteActivity = {deleteActivity}
        />
      <TabBar/>
    </View>
  );
}

const TabBar = () => {
  return(
    <View style = {{height: 80, flexDirection: 'row'}}>
      <View style = {{flex: 1, backgroundColor: 'blue'}}></View>
      <View style = {{flex: 1, backgroundColor: 'purple'}}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  
});

