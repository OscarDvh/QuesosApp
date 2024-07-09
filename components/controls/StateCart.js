import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import Fonts from "../../constants/Fonts";
import Colors from "../../constants/Colors";


export default function State({ item, onDelete, increaseProduct, decreaseProduct }) {

  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.status}>{item.description}</Text>

        <View style={styles.extra}>
          <Text style={styles.code}>Precio: ${item.TotalProductPrice}</Text>
        </View>
        
      </View>
      <View style={styles.rightColumn}>
        <TouchableOpacity
          onPress={() => onDelete(item?.key)}
          style={{ marginLeft: 5 }}
        >
          <AntDesign name="delete" size={24} color={Colors.cinnabar} />
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> decreaseProduct(item)}>
         
         <AntDesign name="minus" size={24} color={Colors.black} />
         
        </TouchableOpacity>
        <Text style={styles.status}>
           {item.qty}
        </Text>
        <TouchableOpacity onPress={()=> increaseProduct(item)} >
         
          <AntDesign name="plus" size={24} color={Colors.black} />
          
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
    marginBottom: 25,
    backgroundColor: Colors.grey,
    borderRadius: 30,
    padding: 11,
  },
  leftColumn: {
    padding: 11,
  },
  rightColumn: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 11,
    paddingLeft: 100,
  },
  title: {
    marginBottom: 4,
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
