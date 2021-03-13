import { v4 as uuidv4 } from 'uuid';

export const getActivitiesAndPopularity = (activities) => {
  var activities_info = [];
  // go through every activity thats been logged
  activities.forEach((activity) => {
    var does_exist_already = false;
    // increment the popularity if it already exists in 
    // activities_info or create new item if it doesnt
    activities_info = activities_info.map((element) => {
      if (element.activity == activity.activity) {
        does_exist_already = true;
        element.popularity = element.popularity + 1;
        return element;
      } else {
        return element
      }
    });
    if (!does_exist_already) {
      activities_info.push({
        activity: activity.activity,
        popularity: 1
      });
    }
  });
  return activities_info
};

export const filterSuggestedActivities = (activities, text) => {
  return activities.filter(activity  => {
      if(activity.activity.slice(0, text.length).toLowerCase() == text.toLowerCase()){
          return activity
      }
  });
}
export const sortByPopularity = (activities) => {
  return activities.sort(function(a, b) {
      return b.popularity - a.popularity;
    });
  }

export const getActivityNames = (activities) => {
  return activities.map((activity) => {
      return activity.activity
  })
}

export const createActivity = (activity_name, start_time, end_time) => {
  return {
    id: uuidv4(),
    activity: activity_name,
    start_time: start_time.toString(),
    end_time: end_time.toString()
  }
}

export const filterActivitiesByDate = (activities, date) => {
  var new_activities = []
  activities.forEach((element) => {
    if(new Date(element.start_time).getDate() == new Date(date).getDate()){
      new_activities.push(element)
    }
  })
  return new_activities
}

export const doesActivityExistInDate = (activities, date) => {
  var does_exist = false
  activities.forEach((element) => {
    if((new Date(date).getTime() >= new Date(element.start_time).getTime()) && 
      new Date(date).getTime() <= new Date(element.end_time).getTime()){
        does_exist = true
      }
  })
  return does_exist
}
