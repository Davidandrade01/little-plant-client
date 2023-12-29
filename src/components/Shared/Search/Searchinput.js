import { View, Image  } from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
// React Paper
import { Searchbar } from 'react-native-paper'

//Components
import { SearchHistory } from './SearchHistory'
// API 
import { SearchHistoryCtrl } from '../../../api'

//Utils
import { screensName } from '../../../utils'
//Style

import { StyleSheet } from 'react-native'
import { useSearch } from '../../../hooks'





export function Searchinput() {
  const [openHistory, setOpenHistory] = useState(false)
  const {searchText,setSearchText} = useSearch()
  const navigation =useNavigation()

  function consoleSearch(){
    navigation.navigate(screensName.home.search)
  }
  
  const OpenCloseHistory = () => setOpenHistory((prevState) => !prevState)

  const handleSearch = async (reuseSearch) => {

    const isReuse=typeof reuseSearch=== "string"

    if(!isReuse){
      await SearchHistoryCtrl.updateSearchHistory(searchText)
    console.log(searchText)
    }
    
    consoleSearch()
  }

  return (
    <>
    
    <View style={styles.container}>
      
        <Image source={require('../../../../assets/lpslogo.png')}
        style={{ width: 200, height: 100 }} />
       

      <View style={styles.containerInput}>
        <Searchbar
          style={styles.searchbar}
          placeholder='search'
          autoCapitalize='none'
          onFocus={OpenCloseHistory}
          onBlur={OpenCloseHistory}
          value={searchText}
          onChangeText={(text)=>setSearchText(text)}
          onSubmitEditing={handleSearch} // Alterado o nome da função aqui
        />
      </View>
      <SearchHistory open={openHistory} height={100} onSearch={handleSearch} />
    </View>
    </>
  )
}


const styles=StyleSheet.create({

  container:{
    
    paddingVertical:50,
    paddingHorizontal:20,
    zIndex:1,
    alignItems:'center'

  },

  
  backArrow:{
    position:"absolute",
    zIndex:2,
    
    

    

  },
  containerInput:{
    
    position:"absolute",
    width:"100%",
    alignItems:"center",
    top:"140%",
    zIndex:2,
  },
  searchbar:{
    
    borderRadius:10,
    backgroundColor:'#fff',
    alignItems:"center"
    
    
  }
})