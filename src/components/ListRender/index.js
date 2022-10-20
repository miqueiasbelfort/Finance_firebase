import { TouchableWithoutFeedback } from 'react-native';
import React from 'react'

import { Feather } from '@expo/vector-icons';
import {
    Container,
    Tipo,
    IconView,
    TipoText,
    ValueText
} from "./style"

export default function ListRender({data, deleteItem}) {
  return (
    <TouchableWithoutFeedback
      onLongPress={() => deleteItem(data)}
    >
      <Container>
        <Tipo>
          <IconView 
              tipo={data.type}
          >
              <Feather 
                  name={data.type === 'Despesa' ? 'arrow-down' : 'arrow-up'}
                  size={20} 
                  color="#fff"
              />
              <TipoText>{data.type}</TipoText>
          </IconView>
        </Tipo>
        <ValueText>
          R$ {data.value.toString().replace('.',',')}
        </ValueText>
      </Container>
    </TouchableWithoutFeedback>
  )
}