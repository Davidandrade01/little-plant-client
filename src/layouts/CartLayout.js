import { ScrollView } from "react-native";
import { StatusBar} from "../components/Shared"


export function CartLayout ({children}){

    return (
        <>
        <StatusBar backgroundColor="#16222B" barStyle="light-content" />
        <ScrollView>{children}</ScrollView>
        </>
    )
}