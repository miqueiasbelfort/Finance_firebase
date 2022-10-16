import { SafeAreaView, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, {useState} from 'react'

import Header from '../../components/Header'
import Picker from '../../components/Picker'
import {
  Background,
  Input,
  SubmitButton,
  SubmitText,
} from "./style"

export default function New() {

  const [value, setValue] = useState('')
  const [type, setType] = useState('Receita')

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

          <Picker onChnage={setType} type={type}/>

          <SubmitButton>
            <SubmitText>Registrar</SubmitText>
          </SubmitButton>

        </SafeAreaView>
      </Background>
    </TouchableWithoutFeedback>
  )
}