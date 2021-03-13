import React, {useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
} from 'react-native';
import { filterActivitiesByDate } from './src/helpers/ActivityHelper';
import HomeScreen from './src/Screens/HomeScreen';
import TabBar from './src/Components/TabBar'
import SummaryScreen from './src/Screens/SummaryScreen';

const HOME_TAB = 'Home'
const SUMMARY_TAB = 'Summary'
const tabs = [HOME_TAB, SUMMARY_TAB]

export default function App() {
  var activities_data = [
    {
      id: 0,
      activity: 'exercise', 
      start_time: "Sat Mar 13 2021 00:00:00 GMT-0700 (Mountain Standard Time)",
      end_time: "Sat Mar 13 2021 01:00:00 GMT-0700 (Mountain Standard Time)"
    },
    {
      id: 1,
      activity: 'reading', 
      start_time: "Sat Mar 13 2021 01:00:00 GMT-0700 (Mountain Standard Time)",
      end_time: "Sat Mar 13 2021 01:30:00 GMT-0700 (Mountain Standard Time)"
    },
    {
      id:2,
      activity: 'writing', 
      start_time: "Sat Mar 13 2021 01:30:00 GMT-0700 (Mountain Standard Time)",
      end_time: "Sat Mar 13 2021 02:30:00 GMT-0700 (Mountain Standard Time)"
    },
    {
      id:3, 
      activity: 'exercise', 
      start_time: "Sat Mar 13 2021 04:00:00 GMT-0700 (Mountain Standard Time)",
      end_time: "Sat Mar 13 2021 05:30:00 GMT-0700 (Mountain Standard Time)"
    },
    {
      id: 4,
      activity: 'exercise', 
      start_time: "Sat Mar 13 2021 06:00:00 GMT-0700 (Mountain Standard Time)",
      end_time: "Sat Mar 13 2021 07:00:00 GMT-0700 (Mountain Standard Time)"
    },
    {
      id: 5,
      activity: 'exercise', 
      start_time: "Sat Mar 13 2021 07:00:00 GMT-0700 (Mountain Standard Time)",
      end_time: "Sat Mar 13 2021 08:00:00 GMT-0700 (Mountain Standard Time)"
    },
    {
      id: 6,
      activity: 'exercise',
      start_time: "Sat Mar 13 2021 08:00:00 GMT-0700 (Mountain Standard Time)",
      end_time: "Sat Mar 13 2021 10:00:00 GMT-0700 (Mountain Standard Time)"
    }]
  const [state, setState] = useState({
    activities : activities_data
  })
  const [selected_date, setSelectedDate] = useState(new Date())
  const [selected_tab, setSelectedTab] = useState('Home')

  
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

  SelectedTab = () => {
    if(selected_tab == HOME_TAB){
      return(
      <HomeScreen 
        selected_date = {selected_date}
        setSelectedDate = {setSelectedDate}
        activities = {filtered_activities}
        addActivity = {addActivity}
        updateActivity = {updateActivity}
        deleteActivity = {deleteActivity}
        />
      )
    } else if (selected_tab == SUMMARY_TAB){
      return(<SummaryScreen/>)
    }
  }
  return (
    <View style = {{flex: 1}}>
      <View style = {{height: 60}}></View>
        <SelectedTab/>
        <TabBar 
          tabs = {tabs}
          selected_tab = {selected_tab}
          onTabPress = {setSelectedTab}/>
    </View>
  );
}

const styles = StyleSheet.create({
  
});

