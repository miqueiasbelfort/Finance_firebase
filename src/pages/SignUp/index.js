import {Platform, ActivityIndicator} from "react-native"
import React, {useState, useContext} from 'react'
import { AuthContext } from "../../contexts/auth"

import { 
  Background,
   Container,
   AreaInput,
   Input,
   SubmitButton,
   SubmitText,
} from '../SignIn/styles'

export default function SignUp() {

  const {signUp, loadingAuth} = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const handleSignUp = () => {
    signUp(email, password, name)
  }

  return (
    <Background>
      <Container
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        enable
      >

        <AreaInput>
          <Input
            placeholder="Nome"
            autoCorrect={false}
            value={name}
            onChangeText={text => setName(text)}
          />
        </AreaInput>

        <AreaInput>
          <Input
            placeholder="E-mail"
            autoCorrect={false}
            autoCapitalize='none'
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </AreaInput>

        <AreaInput>
          <Input
            placeholder="Senha"
            autoCorrect={false}
            autoCapitalize='none'
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
          />
        </AreaInput>

        <SubmitButton onPress={handleSignUp}>
        {
            loadingAuth ? (
              <ActivityIndicator size={20} color="#fff"/>
            ) : (
              <SubmitText>Cadastrar</SubmitText>
            )
          }
        </SubmitButton>

      </Container>
    </Background>
  )
}