import { View, Text } from 'react-native'
import React, {useContext} from 'react'
import {AuthContext} from "../../contexts/auth"


export default function Home() {

  const {user} = useContext(AuthContext)

  return (
    <View>
      <Text>Olá {user.name}</Text>
      <Text>Email: {user.email}</Text>
    </View>
  )
}