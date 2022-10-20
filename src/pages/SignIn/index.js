import {Platform, ActivityIndicator} from "react-native"
import React, {useState, useContext} from 'react'
import { useNavigation } from "@react-navigation/native"
import { AuthContext } from "../../contexts/auth"

import { 
  Background,
   Container,
   Logo,
   AreaInput,
   Input,
   SubmitButton,
   SubmitText,
   Link,
   LinkText
} from './styles'

export default function SignIn() {

  const navigation = useNavigation()
  const {signIn, loadingAuth} = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignIn = () => {
    signIn(email, password)
  }

  return (
    <Background>
      <Container
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        enable
      >
        
        <Logo source={require('../../assets/Logo.png')}/>
        
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

        <SubmitButton onPress={handleSignIn}>
          {
            loadingAuth ? (
              <ActivityIndicator size={20} color="#fff"/>
            ) : (
              <SubmitText>Acessar</SubmitText>
            )
          }
        </SubmitButton>

        <Link onPress={() => navigation.navigate('SignUp')}>
          <LinkText>Criar uma conta</LinkText>
        </Link>

      </Container>
    </Background>
  )
}