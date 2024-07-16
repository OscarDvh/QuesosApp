import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import Fonts from "../../constants/Fonts";
import Colors from "../../constants/Colors";

export default function State({ item, onEdit, onDelete }) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.status}>{item.description}</Text>
          <Text style={styles.status}>{item.status ? 'Con Stock' : 'Sin Stock'}</Text>
          <View style={styles.extra}>
            <Text style={styles.code}>Precio: ${item.code}</Text>
          </View>
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 5,
    backgroundColor: Colors.grey,
    borderRadius: 10,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  rightColumn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    padding: 10,
  },
  title: {
    marginBottom: 4,
    fontFamily: Fonts.family.bold,
    fontSize: Fonts.size.normal,
  },
  extra: {
    flexDirection: 'row',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    marginBottom: 100,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalProductImage: {
    width: 100,
    height: 100,
    marginRight: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontFamily: Fonts.family.bold,
    fontSize: 24,
    marginBottom: 10,
  },
  modalDescription: {
    fontFamily: Fonts.family.regular,
    fontSize: 18,
    marginBottom: 10,
  },
  modalPrice: {
    fontFamily: Fonts.family.bold,
    fontSize: 20,
    marginBottom: 10,
  },
  closeButton: {
    marginLeft: 'auto',
  },
});