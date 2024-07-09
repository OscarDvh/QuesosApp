import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import Fonts from "../../constants/Fonts";
import Colors from "../../constants/Colors";

export default function State({ item, onEdit, onDelete }) {
  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.status}>{item.description}</Text>
        <View style={styles.extra}>
          <Text style={styles.code}>Precio: ${item.code}</Text>
        </View>
        <Text style={styles.status}>
            {item.status ? "Con Stock" : "Sin Stock"}
          </Text>
      </View>
      <View style={styles.rightColumn}>
        <TouchableOpacity onPress={() => onEdit(item)}>
          <AntDesign name="edit" size={24} color={Colors.black} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onDelete(item?.key)}
          style={{ marginLeft: 15 }}
        >
          <AntDesign name="delete" size={24} color={Colors.cinnabar} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: Colors.grey,
    borderRadius: 20,
  },
  leftColumn: {
    padding: 10,
  },
  rightColumn: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginLeft: 138,
  },
  title: {
    fontFamily: Fonts.family.bold,
    fontSize: Fonts.size.normal,
  },
  extra: {
    flexDirection: "row",
  },
  code: {
    color: Colors.black,
    fontFamily: Fonts.family.bold,
    fontSize: Fonts.size.small,
  },
  status: {
    fontFamily: Fonts.family.regular,
    fontSize: Fonts.size.small,
  },
});
