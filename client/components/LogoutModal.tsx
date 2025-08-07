import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native"
import { Colors } from "../constants/Colors"

interface LogoutModalProps {
  isVisible: boolean
  onClose: () => void
  onConfirm: () => void
}

const LogoutModal = ({ isVisible, onClose, onConfirm }: LogoutModalProps) => {
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible} onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Logout</Text>
          <Text style={styles.modalText}>Are you sure you want to Logout?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.buttonCancel]} onPress={onClose}>
              <Text style={styles.textStyleCancel}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonConfirm]} onPress={onConfirm}>
              <Text style={styles.textStyleConfirm}>Yes Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#DC3545",
  },
  modalText: {
    marginBottom: 25,
    textAlign: "center",
    fontSize: 16,
    color: Colors.darkText,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    borderRadius: 12,
    padding: 12,
    elevation: 2,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonCancel: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: "#DEE2E6",
  },
  buttonConfirm: {
    backgroundColor: Colors.primaryOrange,
  },
  textStyleCancel: {
    color: Colors.darkText,
    fontWeight: "bold",
    textAlign: "center",
  },
  textStyleConfirm: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
})

export default LogoutModal
