import React, {useContext, useState} from 'react'
import {AuthContext} from "../../contexts/auth"

import Header from '../../components/Header'
import ListRender from '../../components/ListRender'
import {
  Background,
  Container,
  Name,
  Saldo,
  Title,
  List
} from "./style"

export default function Home() {

  const {user} = useContext(AuthContext)

  const [historico, setHistorico] = useState([
    {key: '1', type: 'Receita', value: 1200.93},
    {key: '2', type: 'Dispesa', value: 1200},
    {key: '3', type: 'Receita', value: 1200},
    {key: '4', type: 'Receita', value: 1200},
  ])

  return (
    <Background>
      <Header/>
      <Container>
        <Name>Olá {user && user.name}!</Name>
        <Saldo>R$ 128,95</Saldo>
      </Container>
      <Title>Suas Movimentações</Title>

      <List
        showsVerticalScrollIndicator={false}
        data={historico}
        keyExtractor={item => item.key}
        renderItem={({item}) => (
          <ListRender data={item}/>
        )}
      />
    </Background>
  )
}