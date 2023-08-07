import { TOKEN, USER } from '../utils/constants.js'

export function setToken(token: string):void {
    sessionStorage.setItem(TOKEN, token)
}
export  function getToken():string {
    return sessionStorage.getItem(TOKEN);
}
export function removeToken():void {
    sessionStorage.removeItem(TOKEN);
}

export function setUser(user: string):void {
    sessionStorage.setItem(USER, user)
}
export  function getUser():string {
    return sessionStorage.getItem(USER);
}
export function removeUser():void {
    sessionStorage.removeItem(USER);
}