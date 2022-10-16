import React from 'react'
import {Picker} from "@react-native-community/picker"

import {
    PickerView
} from "./style"


export default function Picker({onChange, type}) {
  return (
    <PickerView>
        <Picker
            style={{
                width: '100%'
            }}
            selectedValue={type}
            onValueChange={ value => onChange(value) }
        >
            <Picker.Item labe="Receita" value="Receita"/>
            <Picker.Item labe="Despesa" value="Despesa"/>
        </Picker>
    </PickerView>
  )
}