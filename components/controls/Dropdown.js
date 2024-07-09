import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {Picker} from '@react-native-picker/picker';

import Fonts from "../../constants/Fonts";
import Colors from "../../constants/Colors";

export default function Dropdown({ label, options, selectedValue, onValueChange }) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Picker
        selectedValue={selectedValue}
        style={styles.dropdown}
        onValueChange={onValueChange}
      >
        {options.map((option, index) => (
          <Picker.Item label={option.label} value={option.value} key={index} />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    width: "100%",
  },
  label: {
    color: Colors.oldSilver,
    fontSize: Fonts.size.small,
    fontFamily: Fonts.family.regular,
    textAlign: "left",
  },
  dropdown: {
    borderBottomColor: Colors.queso,
    borderBottomWidth: 2,
    color: Colors.jet,
    fontSize: Fonts.size.normal,
    paddingBottom: 5,
    paddingTop: 5,
  },
});
