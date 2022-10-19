import React, {useContext, useState, useEffect} from 'react'
import {AuthContext} from "../../contexts/auth"
import firebase from "../../servers/firebaseConfig"
import { format } from 'date-fns'

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
  const uid = user && user.uid

  const [historico, setHistorico] = useState([])
  const [saldo, setSaldo] = useState(0)

  useEffect(() => {
    async function loadList(){
      await firebase.database().ref('users').child(uid).on('value', snapshot=>{
        setSaldo(snapshot.val().saldo)
      })
      await firebase.database().ref('historico').child(uid).orderByChild('date').equalTo(format(new Date, 'dd/MM/yy')).limitToLast(10).on('value', snapshot => {
          setHistorico([])
          snapshot.forEach((childItem) => {
            let list = {
              key: childItem.key,
              type: childItem.val().type,
              value: childItem.val().value
            }
            setHistorico(oldList => [...oldList, list])
          })
        })
    }
    loadList()
  }, [])

  return (
    <Background>
      <Header/>
      <Container>
        <Name>Olá {user && user.name}!</Name>
        <Saldo>R$ {(saldo.toFixed(2).replace(/(\d)(?=(\d(3))+(?!\d))/g, '$1.')).replace('.',',')}</Saldo>
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