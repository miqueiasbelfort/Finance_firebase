import { SafeAreaView, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native'
import React, {useState, useContext} from 'react'
import firebase from "../../servers/firebaseConfig"
import {format} from "date-fns"
import {useNavigation} from "@react-navigation/native"

import {AuthContext} from "../../contexts/auth"

import Header from '../../components/Header'
import PickerHTML from '../../components/Picker'
import {
  Background,
  Input,
  SubmitButton,
  SubmitText,
} from "./style"

export default function New() {

  const navigation = useNavigation()
  const {user: usuario} = useContext(AuthContext)

  const [value, setValue] = useState('')
  const [type, setType] = useState(null)

  const handleRegister = () => {
    Keyboard.dismiss()
    if(isNaN(parseFloat(value)) || type == null){
      alert('Preencha todos os campos corretamente!')
      return
    }
    Alert.alert(
      'Confirmando dados',
      `Tipo ${type} - Valor R$ ${parseFloat(value)}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Continuar',
          onPress: () => handleAdd()
        }
      ]
    )
  }

  const handleAdd = async() => {
    let uid = usuario.uid

    let key = await firebase.database().ref('historico').child(uid).push().key
    await firebase.database().ref('historico').child(uid).child(key).set({
      type: type,
      value: value,
      date: format(new Date(), 'dd/MM/yy')
    })

    // atualizar o saldo
    let user = firebase.database().ref('users').child(uid);
    await user.once('value').then(snapshot => {
      let saldo = parseFloat(snapshot.val().saldo)
      type === 'Despesa' ? saldo -= parseFloat(value) : saldo += parseFloat(value)
      user.child('saldo').set(saldo)
    })
    setValue('')
    Keyboard.dismiss()
    navigation.navigate('Home')
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Background>
        <Header/>
        <SafeAreaView style={{alignItems: 'center'}}>
          <Input
            placeholder='Valor em R$'
            keyboardType="numeric"
            returnKeyType="next"
            onSubmitEditing={() => Keyboard.dismiss()}
            value={value}
            onChangeText={text=>setValue(text)}
          />

          <PickerHTML onChange={setType} type={type}/>

          <SubmitButton onPress={handleRegister}>
            <SubmitText>Registrar</SubmitText>
          </SubmitButton>

        </SafeAreaView>
      </Background>
    </TouchableWithoutFeedback>
  )
}