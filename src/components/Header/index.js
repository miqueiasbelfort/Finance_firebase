import {useNavigation} from "@react-navigation/native"
import React from 'react'

import {Container, ButtonMenu} from "./style"
import { Feather } from '@expo/vector-icons';

export default function Header() {

    const navigation = useNavigation()

  return (
    <Container>
      <ButtonMenu onPress={() => navigation.toggleDrawer()}>
        <Feather name="menu" size={30} color="#fff" />
      </ButtonMenu>
    </Container>
  )
}