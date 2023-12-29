import { useState,useEffect, createContext, } from "react";
import {storageCtrl, userCtrl} from '../api'
import { fn } from "../utils";


export const  AuthContext=createContext()



export function AuthProvider({children}){
  const [user, setUser]=useState(null)
  const [loading, setLoading]=useState(true)

  useEffect(() => {
    retrieveSession();
  }, []);

  const retrieveSession = async () => {
    const token = await storageCtrl.getToken(); // Esta funcção pega os dados do token e sempre vai manter o 
                                                //usuário logado com o else abaixo
    //console.log("Token>>>", token)

    if(!token ||fn.hasTokenExpired(token)){
      logout()
      setLoading(false)
      return
    }

   

    else{
      await login(token)
    }
    
  }

  const login= async(token)=>{
    try {
      await storageCtrl.setToken(token)
      //console.log(token)//será o response.jwt enviado por 
      const response= await userCtrl.getMe()
      //console.log(response)
      setUser(response)//Faz-se um set atodos os dados de usuário e deixa de ser nulo.
      setLoading(false)
      

    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  const logout = async()=>{
    await storageCtrl.removeToken()
    setUser(null)
  }


  const updateUser= async(key, value)=>{ 
    setUser({
      ...user,                        //A função de update recebe os dados antigos do user(será o array response)
                                      // pode ser vista no console.log dentro do try da função de login
      [key]:value,
    })
  }

   const data={
        user,
        login,
        logout,
        updateUser,
        //olivia

    }

    if(loading)
    return true

  return  <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}












