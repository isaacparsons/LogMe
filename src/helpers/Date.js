export const formatDate = (date) => {
    var days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat' ]
    hour = date.getHours()
    mins = date.getMinutes()

    if (mins < 10){
        mins = `0${mins}`
    }
    if(hour > 12) {
        hour = `${hour - 12}:${mins} PM`
    } else if (hour == 0){
        hour = `12:${mins} AM`
    } else {
        hour = `${hour}:${mins} AM`
    }
    day_of_week = days[date.getDay()]
    return {
        year: date.getFullYear(),
        day_of_month: date.getDate(),
        day_of_week: day_of_week,
        hour: hour
    }
}

