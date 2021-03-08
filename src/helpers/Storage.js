import AsyncStorage from '@react-native-async-storage/async-storage';
const STORAGE_KEY = 'activities_data'


export const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue)
    } catch (e) {
      throw new Error("Error saving data: " + str(e))
    }
  }
  
export const getData = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY)
      return value
    } catch(e) {
      throw new Error("Error retrieving data: " + str(e))
    }
  }