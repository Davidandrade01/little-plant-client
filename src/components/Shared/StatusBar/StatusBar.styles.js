import { StyleSheet} from "react-native"


export const styled =(backgroudColor)=>{
    return StyleSheet.create({
        SafeAreaView:{
            flex:0,
            backgroundColor:backgroudColor,
        }
    })
}