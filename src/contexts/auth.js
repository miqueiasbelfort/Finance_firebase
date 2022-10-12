import React, {createContext, useState} from "react"
import firebase from "../servers/firebaseConfig"
import AsyncStorage from "@react-native-community/async-storage"

export const AuthContext = createContext({})

function AuthProvider({ children }){

    const [user, setUser] = useState(null)

    async function signUp(email, password, name){
        await firebase.auth().createUserWithEmailAndPassword(email,password)
            .then(async(value) => {
                let uid = value.user.uid
                await firebase.database().ref('users').child(uid).set({
                    saldo: 0,
                    name: name
                }).then(() => {
                    let data = {
                        uid: uid,
                        name: name,
                        email: value.user.email
                    }
                    setUser(data)
                    storageUser(data)
                })
            })
    }

    async function signIn(email, password){
        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async(value) => {
                let uid = value.user.uid
                await firebase.database().ref('users').child(uid).once('value')
                    .then(snapshot => {
                        let data = {
                            uid: uid,
                            name: snapshot.val().name,
                            email: value.user.email
                        }
                        setUser(data)
                        storageUser(data)
                    })
            })
            .catch((error) => {
                alert(error.code)
            })
    }

    async function storageUser(data){
        await AsyncStorage.setItem('Auth_user', JSON.stringify(data))
    }

    return(
        <AuthContext.Provider
            value={{ signed: !!user , user, signUp, signIn }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider