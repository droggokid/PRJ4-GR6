import React from "react";
import { View, Text, TextInput } from "react-native";
import style from "../styles/GoalStyle";

type TextFieldProps = {
  label: string;
  value: string;
  setValue: (text: string) => void;
  units: string;
};

const NumericInput = ({ label, value, setValue, units }: TextFieldProps) => {
  return (
    <View style={style.inputContainer}>
      <Text style={style.label}>{label}:</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          style={style.input}
          onChangeText={setValue}
          value={value}
          keyboardType="numeric"
        />
        <Text style={style.units}>{units}</Text>
      </View>
    </View>
  );
};

export default NumericInput;
