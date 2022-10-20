import React, {createContext, useState, useEffect} from "react"
import firebase from "../servers/firebaseConfig"
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AuthContext = createContext({})

function AuthProvider({ children }){

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [loadingAuth, setLoadingAuth] = useState(false)

    useEffect(() => {
        async function storageGet(){
            const localizationUser = await AsyncStorage.getItem('AuthUser')
            if(localizationUser){
                setUser(JSON.parse(localizationUser))
            }
            setLoading(false)
        }
        storageGet()
    },[])

    async function storageUser(data){
        await AsyncStorage.setItem('AuthUser', JSON.stringify(data))
    }

    async function signUp(email, password, name){
        setLoadingAuth(true)
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
                    setLoading(false)
                })
            }).catch(err => setLoadingAuth(false))
    }

    async function signIn(email, password){
        setLoadingAuth(true)
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
                        setLoadingAuth(false)
                    })
            })
            .catch((error) => {
                alert(error.code)
                setLoadingAuth(false)
            })
    }

    async function signOut(){
        await firebase.auth().signOut()
        await AsyncStorage.clear().then(() => {
            setUser(null)
        })
    }

    return(
        <AuthContext.Provider
            value={{ signed: !!user , user, signUp, signIn, loading, signOut, loadingAuth }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider