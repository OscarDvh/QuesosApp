import { useRef, useEffect, useState } from "react";
import { StyleSheet, Alert, Touchable } from "react-native";
import { Octicons, EvilIcons, Ionicons, } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import { collection, doc, setDoc } from "firebase/firestore";

import Base from "./Base";
import FormItem from "../controls/FormItem";
import Colors from "../../constants/Colors";
import { db } from "../../firebase-config";
import Button from "../controls/Button";
import { TouchableOpacity } from "react-native-gesture-handler";

const selectStatus = [
  { label: "Con Stock", value: true },
  { label: "Sin Stock", value: false },
];

const closeModal = () =>{
  onClose();
}

export default function StateModal({
  selected,
  setSelected,
  visible,
  onClose,
}) {
  const statusRef = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    statusRef?.current?.selectIndex(
      selectStatus.findIndex((item) => item.value === selected.status)
    );
  }, [statusRef, selected]);

  const saveState = async (values) => {
    try {
      setLoading(true);
      if (!selected?.key) {
        // Con la siguiente instrucción creamos un nuevo documento en la colección a la que hagamos referencia
        await setDoc(doc(collection(db, "states")), {
          name: selected.name,
          code: selected.code,
          status: selected.status,
          description: selected.description,
        });
      } else {
        // Creamos primero la referencia al documento que vamos a editar
        const stateRef = doc(db, "states", selected.key);
        // Editamos nuestro documento
        await setDoc(
          stateRef,
          {
            name: selected.name,
            code: selected.code,
            status: selected.status,
            description: selected.description,
          },
          {
            merge: true,
          }
        );
      }
      setLoading(false);
      onClose();
    } catch (error) {
      console.log(error);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <Base
      id="modal-state"
      visible={visible}
      title={selected?.key ? "Editar Articulo" : "Crear Articulo"}
      onClose={onClose} 
    >
      <TouchableOpacity onPress={onClose} style={styles.close}>
      <Ionicons name="close" size={20} color="black" />
      </TouchableOpacity>

      <FormItem
        value={selected?.name || ""}
        label="Nombre del Queso"
        onChange={(value) => setSelected((prev) => ({ ...prev, name: value }))}
      />
      <FormItem
        value={selected?.description || ""}
        label="Descripcion del Queso"
        onChange={(value) => setSelected((prev) => ({ ...prev, description: value }))}
      />
      <FormItem
        value={selected?.code || ""}
        label="Precio"
        onChange={(value) => setSelected((prev) => ({ ...prev, code: value }))}
      />
      <SelectDropdown
        ref={statusRef}
        data={selectStatus}
        dropdownIconPosition={"right"}
        defaultButtonText={"Selecciona el estatus"}
        buttonStyle={styles.select}
        onSelect={(selectedItem, _) => {
          setSelected((prev) => ({ ...prev, status: selectedItem.value }));
        }}
        buttonTextAfterSelection={(selectedItem, _) => {
          return selectedItem.label;
        }}
        rowTextForSelection={(item, _) => {
          return item.label;
        }}
        renderDropdownIcon={(isOpened) => {
          return (
            <Octicons
              name={isOpened ? "chevron-up" : "chevron-down"}
              color={"#444"}
              size={18}
            />
          );
        }}
      />
      <Button
        label={selected?.key ? "ACTUALIZAR" : "REGISTRAR"}
        onPress={saveState}
        isLoading={loading}
      />
    </Base>
  );
}

const styles = StyleSheet.create({
  select: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.queso,
    marginBottom: 20,
    width: "100%",
  },
  close:{
    flexDirection: 'row-reverse'
  }
});