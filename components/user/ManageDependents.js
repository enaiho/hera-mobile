import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, FlatList, StyleSheet, Modal, TouchableOpacity, ActivityIndicator } from "react-native";
import { Svg, Path } from "react-native-svg";
import * as request from "../../hooks/useHttp";
import SolaceConfig from "../../solace_config";

const ContactItem = ({ name, image, confirmRemoveContact }) => {
  return (
    <View style={styles.contactItem}>
      <View style={styles.contactItemDetails}>
        <Image
          style={styles.contactImage}
          source={{
            uri: image,
          }}
        />
        <Text style={styles.contactText}>{name}</Text>
      </View>
      <TouchableOpacity onPress={confirmRemoveContact}>
        <Svg style={styles.closeBtn} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Path d="M15.1297 13.5781C15.5688 14.0173 15.5688 14.7298 15.1297 15.1691C14.6905 15.6083 13.978 15.6082 13.5387 15.1691L7.99999 9.58906L2.42186 15.1672C1.98269 15.6064 1.27014 15.6064 0.830926 15.1672C0.391707 14.728 0.391754 14.0155 0.830926 13.5762L6.41093 8L0.829379 2.37968C0.390207 1.94051 0.390207 1.22797 0.829379 0.788747C1.26855 0.349528 1.9811 0.349575 2.42032 0.788747L7.99999 6.41093L13.5781 0.83281C14.0173 0.393638 14.7298 0.393638 15.1691 0.83281C15.6083 1.27198 15.6082 1.98453 15.1691 2.42375L9.58905 8L15.1297 13.5781Z" fill="#90979E" />
        </Svg>
      </TouchableOpacity>
    </View>
  )
}

const RemoveContactModal = ({ id, fullName, image, phoneNumber, modalVisible, toggleModalVisible, removeContact }) => {
  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      transparent
      onRequestClose={toggleModalVisible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalCloseBtnContainer}>
            <TouchableOpacity onPress={toggleModalVisible}>
              <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z" fill="#F0F2F4" />
                <Path d="M21.8633 20.1172C22.3516 20.6055 22.3516 21.3965 21.8633 21.8848C21.6211 22.1289 21.3008 22.25 20.9805 22.25C20.6602 22.25 20.3406 22.1279 20.0969 21.8838L15.9805 17.7695L11.8645 21.8828C11.6203 22.1289 11.3004 22.25 10.9805 22.25C10.6605 22.25 10.341 22.1289 10.0967 21.8828C9.6084 21.3945 9.6084 20.6035 10.0967 20.1152L14.2139 15.998L10.0967 11.8828C9.6084 11.3945 9.6084 10.6035 10.0967 10.1152C10.585 9.62695 11.376 9.62695 11.8643 10.1152L15.9805 14.2344L20.0977 10.1172C20.5859 9.62891 21.377 9.62891 21.8652 10.1172C22.3535 10.6055 22.3535 11.3965 21.8652 11.8848L17.748 16.002L21.8633 20.1172Z" fill="#191414" />
              </Svg>
            </TouchableOpacity>
          </View>
          <View style={styles.modalBody}>
            <View style={styles.modalAvatarContainer}>
              <Image
                style={styles.modalAvatar}
                source={{
                  uri: image || "https://church-management-app.s3.us-east-2.amazonaws.com/1644404181914.png",
                }}
              />
              <Svg style={styles.removeContactIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#F03738" />
                <Path fill-rule="evenodd" clip-rule="evenodd" d="M9.75 12C11.407 12 12.75 10.6568 12.75 9C12.75 7.3432 11.407 6 9.75 6C8.09297 6 6.75 7.3432 6.75 9C6.75 10.6568 8.09297 12 9.75 12ZM10.9383 13.125H8.56172C6.31898 13.125 4.5 14.9438 4.5 17.1867C4.5 17.6367 4.86375 18 5.31234 18H14.1881C14.6367 18 15 17.6367 15 17.1867C15 14.9438 13.1813 13.125 10.9383 13.125ZM19.1468 10.1266L18.0445 11.2289L19.1477 12.3513C19.3675 12.5712 19.3675 12.9271 19.1477 13.1468C18.9279 13.3667 18.5719 13.3665 18.3523 13.1468L17.25 12.0445L16.1477 13.1487C15.9279 13.3685 15.5719 13.3684 15.3523 13.1487C15.1325 12.9288 15.1325 12.5729 15.3523 12.3532L16.4545 11.2509L15.3523 10.1487C15.1325 9.92883 15.1324 9.57293 15.3523 9.3532C15.5721 9.13348 15.928 9.13348 16.1477 9.3532L17.25 10.4555L18.3513 9.33117C18.5712 9.11145 18.9271 9.11133 19.1468 9.33117C19.3665 9.55102 19.3665 9.90691 19.1468 10.1266Z" fill="white" />
              </Svg>
            </View>
            <View style={styles.modalAvatarContainer}>
              <Text style={styles.modalTitle}>Remove {fullName}</Text>
              <Text style={styles.modalText}>Are you sure you want to remove {fullName} from your dependents?</Text>
            </View>
            <View style={styles.modalBtnContainer}>
              <TouchableOpacity style={{ ...styles.modalBtn, ...styles.modalCancelBtn }} onPress={toggleModalVisible}>
                <Text style={{ ...styles.modalBtnText, ...styles.modalCancelBtnText }}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ ...styles.modalBtn, ...styles.modalRemoveBtn }} onPress={() => removeContact(phoneNumber)}>
                <Text style={{ ...styles.modalBtnText, ...styles.modalRemoveBtnText }}>REMOVE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const ManageDependents = ({ route: { params: { user } } }) => {
  const initialRender = useRef(true);

  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [contacts, setContacts] = useState([]);

  const fetchDependents = async () => {
    const parsedUser = JSON.parse(user);
    return await request.useHttpGet(`${SolaceConfig.SERVER_URL}/user/dependents/${parsedUser.phone}`);
  };

  const deleteDependent = async (phoneNumber) => {
    const parsedUser = JSON.parse(user);
    console.log({ phoneNumber, parsedUser });
    return await request.useHttpDelete(`${SolaceConfig.SERVER_URL}/user/delete_dependent/${parsedUser.phone}/${phoneNumber}`);
  };

  useEffect(() => {
    if (initialRender.current) {
      setLoading(true);
      fetchDependents().then(res => res.data).then(data => {
        //console.log({ data });
        setContacts(data.dependents);
        setLoading(false);
      });
      initialRender.current = false;
    }
  }, [initialRender]);

  const toggleModalVisible = () => {
    setModalVisible(!modalVisible);
  }

  const removeContact = async (phoneNumber) => {
    setLoading(true);
    deleteDependent(phoneNumber).then(
      () => {
        fetchDependents().then(res => res.data).then(data => {
          //console.log({ data });
          setContacts(data.dependents);
          setLoading(false);
        });
      }
    );
    toggleModalVisible();
  }

  return (
    <>
      <RemoveContactModal {...selectedItem} modalVisible={modalVisible} setModalVisible={setModalVisible} removeContact={removeContact} toggleModalVisible={toggleModalVisible} />
      <View style={styles.header}>
        <Svg style={styles.headerImage} width="13" height="22" viewBox="0 0 13 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Path d="M10.9998 21.5C10.616 21.5 10.232 21.3535 9.93945 21.0605L0.939453 12.0605C0.353516 11.4746 0.353516 10.5254 0.939453 9.93945L9.93945 0.939453C10.5254 0.353516 11.4746 0.353516 12.0605 0.939453C12.6465 1.52539 12.6465 2.47461 12.0605 3.06055L4.12086 11L12.0615 18.9406C12.6474 19.5266 12.6474 20.4758 12.0615 21.0617C11.7685 21.3547 11.3841 21.5 10.9998 21.5Z" fill="#191414" />
        </Svg>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Manage Dependents</Text>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <Text style={styles.containerHeaderTitle}>Dependents</Text>

          {
            contacts.length > 0 ?           
            <Text style={styles.containerHeaderText}>
            These are the people who have added you as their emergency contacts
          </Text> : <Text style={styles.containerHeaderText}>
            No one has you as an emergency contact at the moment. 
          </Text>

          }   

        </View>
        <View>
          {loading ?
            <ActivityIndicator size="large" color="#03C108" /> :
            <FlatList
              keyExtractor={item => item.userId}
              data={contacts}
              renderItem={({ item }) => (
                <ContactItem
                  id={item.userId}
                  name={`${item.firstName} ${item.lastName}`}
                  image={item.image || "https://church-management-app.s3.us-east-2.amazonaws.com/1644404181914.png"}
                  confirmRemoveContact={() => {
                    setSelectedItem(item);
                    toggleModalVisible();
                  }}
                />
              )}
            />}
        </View>
      </View>
    </>
  )
};

const styles = StyleSheet.create({


  header: {
    flexDirection: "row",
    padding: 20,
    paddingTop: 60,
    alignItems: "center",
    backgroundColor: "#ffffff"
  },
  headerTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerImage: {
    width: 12,
    height: 21,
  },
  headerText: {
    fontFamily: "EuclidCircularBold",
    fontWeight: "bold",
    fontSize: 20,
    lineHeight: 28,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff'
  },
  containerHeader: {
    marginVertical: 32
  },
  containerHeaderTitle: {
    fontFamily: "EuclidCircularBold",
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8
  },
  containerHeaderText: {
    fontFamily: "EuclidCircularLight",
    fontSize: 14,
    lineHeight: 20,
  },
  contactItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },
  contactItemDetails: {
    flexDirection: "row",
    alignItems: "center"
  },
  contactImage: {
    borderRadius: 50,
    width: 32,
    height: 32,
    marginRight: 8
  },
  contactText: {
    fontFamily: "EuclidCircularBold",
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 20,
  },
  closeBtn: {
    width: 15,
    height: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  modalView: {
    borderRadius: 16,
    padding: 16,
    maxHeight: 334,
    width: "85%",
    flex: 1,
    backgroundColor: "#ffffff"
  },
  modalCloseBtnContainer: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  modalBody: {
    paddingHorizontal: 8,
    alignItems: "center"
  },
  modalAvatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24
  },
  modalAvatar: {
    width: 72,
    height: 72,
    borderRadius: 50,
  },
  removeContactIcon: {
    position: "absolute",
    bottom: 0,
    right: 0
  },
  modalTitle: {
    textAlign: "center",
    fontFamily: "EuclidCircularBold",
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8
  },
  modalText: {
    fontFamily: "EuclidCircularLight",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center"
  },
  modalBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalBtn: {
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 60
  },
  modalCancelBtn: {
    backgroundColor: "#ffffff",
    borderColor: "#60646A",
    borderWidth: 1
  },
  modalRemoveBtn: {
    backgroundColor: "#F03738",
    borderColor: "#F03738",
    borderWidth: 1
  },
  modalBtnText: {
    fontFamily: "EuclidCircularBold",
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 20,
  },
  modalCancelBtnText: {
    color: "#60646A"
  },
  modalRemoveBtnText: {
    color: "#ffffff"
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }

  
});

export default ManageDependents;