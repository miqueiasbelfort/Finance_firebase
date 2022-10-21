import { Alert, Platform, TouchableOpacity } from 'react-native'
import React, {useContext, useState, useEffect} from 'react'
import {AuthContext} from "../../contexts/auth"
import firebase from "../../servers/firebaseConfig"
import { format, isBefore } from 'date-fns'

import Header from '../../components/Header'
import ListRender from '../../components/ListRender'
import {
  Background,
  Container,
  Name,
  Saldo,
  Title,
  Area,
  List
} from "./style"
import { FontAwesome } from '@expo/vector-icons';
import DatePicker from "../../components/Calender"

export default function Home() {

  const {user} = useContext(AuthContext)
  const uid = user && user.uid

  const [historico, setHistorico] = useState([])
  const [saldo, setSaldo] = useState(0)

  const [newDate, setNewDate] = useState(new Date())
  const [show, setShow] = useState(false)


  useEffect(() => {
    async function loadList(){
      await firebase.database().ref('users').child(uid).on('value', snapshot=>{
        setSaldo(snapshot.val().saldo)
      })
      await firebase.database().ref('historico').child(uid).orderByChild('date').equalTo(format(newDate, 'dd/MM/yyyy')).limitToLast(10).on('value', snapshot => {
          setHistorico([])
          snapshot.forEach((childItem) => {
            let list = {
              key: childItem.key,
              type: childItem.val().type,
              value: childItem.val().value,
              date: childItem.val().date,
            }
            setHistorico(oldList => [...oldList, list])
          })
        })
    }
    loadList()
  }, [newDate])
  const handleDelete = (data) => {

    const [dayItem, monthItem, yarnItem] = data.date.split('/')
    const dateItem = new Date(`${yarnItem}/${monthItem}/${dayItem}`)

    const todayFormat = format(newDate, 'dd/MM/yyyy')
    const [dayToday, monthToday, yarnToday] = todayFormat.split('/')
    const today = new Date(`${yarnToday}/${monthToday}/${dayToday}`)

    if(isBefore(dateItem, today)){
      alert('Você não pode excluir um registro passado!')
      return
    }
    Alert.alert(
      'Cuidado Atenção!',
      `Você quer excluir ${data.type} - Valor: R$ ${data.value}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Continuar',
          onPress: () => handleDeleteSuccess(data)
        }
      ]
    )
  }
  const handleDeleteSuccess = async (data) => {
    await firebase.database().ref('historico').child(uid).child(data.key).remove().then(async() => {
      let saldoAtual = saldo
      data.type === 'Despesa' ? 
        saldoAtual += parseFloat(data.value)
        :
        saldoAtual -= parseFloat(data.value)

        await firebase.database().ref('users').child(uid).child('saldo').set(saldoAtual)
    }).catch(err => {
      alert(err)
    })
  }
  const handleShowPicker = () => {
    setShow(true)
  }
  const handleClose = () => {
    setShow(false)
  }
  const onChange = (date) => {
    setShow(Platform.OS === 'ios')
    setNewDate(date)
  }

  return (
    <Background>
      <Header/>
      <Container>
        <Name>Olá {user && user.name}!</Name>
        <Saldo>R$ {(saldo.toFixed(2).replace(/(\d)(?=(\d(3))+(?!\d))/g, '$1.')).replace('.',',')}</Saldo>
      </Container>
      <Area>
        <TouchableOpacity onPress={handleShowPicker}>
          <FontAwesome name="calendar" size={22} color="#fff" />
        </TouchableOpacity>
        <Title>Ultimas Movimentações</Title>
      </Area>

      <List
        showsVerticalScrollIndicator={false}
        data={historico}
        keyExtractor={item => item.key}
        renderItem={({item}) => (
          <ListRender data={item} deleteItem={handleDelete}/>
        )}
      />

      {
        show && (
          <DatePicker
            onClose={handleClose}
            date={newDate}
            onChange={onChange}
          />
        )
      }
    </Background>
  )
}