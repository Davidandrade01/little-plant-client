import jwtDecode from "jwt-decode";

 

export function hasTokenExpired(token){
const tokenDecode=jwtDecode(token)

console.log(tokenDecode) // Este token está presente na função token de authFetch
const expiredDate=tokenDecode.exp*1000
const currentDate= new Date().getTime()

if(currentDate>expiredDate){
    return true
}

else{
    return false
}
}