import React from 'react'
import {Picker} from "@react-native-community/picker"

import {
    PickerView
} from "./style"


export default function PickerHTML({onChange, type}) {
  return (
    <PickerView>
        <Picker
            style={{
                width: '100%'
            }}
            selectedValue={type}
            onValueChange={ value => onChange(value) }
        >
            <Picker.Item label="Receita" value="Receita"/>
            <Picker.Item label="Despesa" value="Despesa"/>
        </Picker>
    </PickerView>
  )
}