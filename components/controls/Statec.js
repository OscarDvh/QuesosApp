import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';

export default function State({ item, addToCart }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.status}>{item.description}</Text>
        <Text style={styles.status}>{item.status ? 'Con Stock' : 'Sin Stock'}</Text>
        <View style={styles.extra}>
          <Text style={styles.code}>Precio: ${item.code}</Text>
        </View>
      </View>
      <View style={styles.rightColumn}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <AntDesign name="eyeo" size={24} color={Colors.black} style={styles.eyeicon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => addToCart(item)}>
          <AntDesign name="plus" size={24} color={Colors.black} />
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Contenido del modal */}
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <AntDesign name="closecircleo" size={30} color={Colors.black} style={styles.closeButton} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{item.name}</Text>
            <Text style={styles.modalDescription}>{item.description}</Text>
            <Text style={styles.modalPrice}>Precio: ${item.code}</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: Colors.grey,
    borderRadius: 30,
  },
  leftColumn: {
    padding: 11,
  },
  rightColumn: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingLeft: 130,
  },
  eyeicon: {
    paddingRight: 15,
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
    marginLeft:320,
  },
});