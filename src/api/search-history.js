import{ENV,fn} from '../utils'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { size } from 'lodash'

//esta api tem a função de armazenamento apenas local do histórico

async function getSearchHistory(){
    try {
        const history= await AsyncStorage.getItem(ENV.STORAGE.SEARCH_HISTORY)
        if(!history) return[]

       return fn.sortArrayByDate(JSON.parse(history))
    } catch (error) {
        return[]
    }
}

async function updateSearchHistory(searchText){
    const history=await getSearchHistory()
    

    if(size(history)>10)
    {history.pop()} //extração do último item

    history.push({
        search:searchText,
        date:new Date()
    })
   
   await AsyncStorage.setItem(ENV.STORAGE.SEARCH_HISTORY,JSON.stringify(history))
   //console.log(history)
}

export const SearchHistoryCtrl={
getSearchHistory,
updateSearchHistory,
}