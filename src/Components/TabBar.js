import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback
  } from 'react-native';


export default TabBar = (props) => {
    var {selected_tab, tabs, onTabPress} = props
    return(
      <View style = {{height: 80, flexDirection: 'row'}}>
          {tabs.map((element) => {
              let tab_background = element == selected_tab ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0)'
              return(
                <TouchableWithoutFeedback onPress = {() => onTabPress(element)}>
                    <View style = {{...styles.home_tab, backgroundColor: tab_background}}>
                        <Text style={styles.tab_text}>{element}</Text>
                    </View>
                </TouchableWithoutFeedback>)
          })}
      </View>
    )
  }

const styles = StyleSheet.create({
    tab_text:{
        fontSize: 16
    },
    home_tab:{
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 2,
        borderRightWidth: 2,
        borderColor: '#2b2b2b'
    },
    summary_tab: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderColor: '#2b2b2b'
    }
});