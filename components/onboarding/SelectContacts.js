import React, { useState, useMemo } from "react";
import {
  Modal, StyleSheet, View, Text, TextInput, Image, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, FlatList, SectionList, Vibration
} from "react-native";
import { Svg, Path } from "react-native-svg";

const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabets = alpha.map((x) => String.fromCharCode(x));

const ContactItem = ({ name = "", id, hoveredContact, showCloseBtn, isFirstItem, onRemove }) => {
  const firstName = name.split(" ")[0];
  const lastName = name.split(" ")[1] || "";

  return (
    <TouchableOpacity onPress={onRemove} onLongPress={showCloseBtn} onBlur={() => setHoveredContact(null)} >
      <View style={{ ...styles.contactItemContainer, ...(!isFirstItem && { marginLeft: 20 }) }}>
        <View style={styles.contactItem}>
          <Text style={styles.contactItemText}>{firstName[0]}{lastName[0]}</Text>
          {id === hoveredContact &&
            <Svg style={styles.closeBtnAlt} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <Path d="M0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8Z" fill="#F03738" />
              <Path d="M10.9316 10.0586C11.1758 10.3027 11.1758 10.6982 10.9316 10.9424C10.8105 11.0645 10.6504 11.125 10.4902 11.125C10.3301 11.125 10.1703 11.064 10.0484 10.9419L7.99023 8.88477L5.93223 10.9414C5.81016 11.0645 5.6502 11.125 5.49023 11.125C5.33027 11.125 5.17051 11.0645 5.04834 10.9414C4.8042 10.6973 4.8042 10.3018 5.04834 10.0576L7.10693 7.99902L5.04834 5.94141C4.8042 5.69727 4.8042 5.30176 5.04834 5.05762C5.29248 4.81348 5.68799 4.81348 5.93213 5.05762L7.99023 7.11719L10.0488 5.05859C10.293 4.81445 10.6885 4.81445 10.9326 5.05859C11.1768 5.30273 11.1768 5.69824 10.9326 5.94238L8.87402 8.00098L10.9316 10.0586Z" fill="white" />
            </Svg>
          }
        </View>
        <Text style={styles.contactName}>{firstName}</Text>
        <Text style={styles.contactName}>{lastName}</Text>
      </View>
    </TouchableOpacity>
  )
}

const OrderedContactItem = ({ name, id, toggleSelectedContact, selectedContacts }) => {
  const isContactSelected = selectedContacts.some(contact => contact.id === id);

  return (
    <TouchableHighlight onPress={toggleSelectedContact} underlayColor="rgba(60, 193, 59, 0.1)">
      <View style={styles.orderedContactItem}>
        <Text style={styles.orderedContactText}>{name}</Text>
        {
          isContactSelected &&
          <Svg style={styles.checkmark} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path fill-rule="evenodd" clip-rule="evenodd" d="M0 10C0 4.47656 4.47656 0 10 0C15.5234 0 20 4.47656 20 10C20 15.5234 15.5234 20 10 20C4.47656 20 0 15.5234 0 10ZM9.52344 13.2734L14.5234 8.27344C14.9492 7.84766 14.9492 7.15234 14.5246 6.72656C14.0973 6.29922 13.4039 6.29922 12.9766 6.72656L8.75 10.9531L7.02422 9.22586C6.59687 8.79852 5.90352 8.79852 5.47617 9.22586C5.05 9.6532 5.05 10.3466 5.47617 10.7739L7.97617 13.2739C8.18984 13.4875 8.46875 13.5938 8.75 13.5938C9.03125 13.5938 9.30859 13.4883 9.52344 13.2734Z" fill="#03C108" />
          </Svg>
        }
      </View>
    </TouchableHighlight >
  )
}

const SelectContacts = ({ modalVisible, setModalVisible, contacts, selectedContacts, setSelectedContacts, finish }) => {
  const [hoveredContact, setHoveredContact] = useState(null);
  const [searchText, setSearchText] = useState("");

  const closeModal = () => {
    setModalVisible(!modalVisible);
  };

  const hideRemoveContact = () => setHoveredContact(null);

  const removeFromSelectedContacts = (id, hover = true) => {
    if (id !== hoveredContact && hover) return;
    setSelectedContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const toggleSelectedContact = id => {
    const isContactSelected = selectedContacts.some(contact => contact.id === id);

    if (isContactSelected) {
      removeFromSelectedContacts(id, false);
    } else {
      const selectedContact = contacts.find(contact => contact.id === id);
      setSelectedContacts(prevState => (
        [...prevState, selectedContact].sort((a, b) => a.name.localeCompare(b.name))
      ))
    }
  }

  const availableContacts = useMemo(
    () => contacts ?
      contacts.filter(contact => contact.name.toLowerCase().includes(searchText.toLowerCase())) :
      [],
    [contacts, searchText],
  );

  const formattedContacts = useMemo(
    () => alphabets.map(alphabet => {
      const data = contacts ? availableContacts.filter(
        contact => contact.name?.toLowerCase()?.startsWith(alphabet.toLowerCase())
      ) : [];

      return {
        title: alphabet,
        data
      }
    }),
    [contacts, availableContacts],
  );

  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalView}>
        <View style={styles.header}>
          <TouchableOpacity onPress={closeModal}>
            <Svg style={styles.closeBtn} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <Path d="M15.0359 12.9406C15.6219 13.5266 15.6219 14.4758 15.0359 15.0617C14.7453 15.3547 14.3609 15.5 13.9766 15.5C13.5922 15.5 13.2087 15.3535 12.9163 15.0606L7.97656 10.1234L3.03734 15.0594C2.74437 15.3547 2.36047 15.5 1.97656 15.5C1.59266 15.5 1.20922 15.3547 0.916016 15.0594C0.330078 14.4734 0.330078 13.5242 0.916016 12.9383L5.85664 7.99767L0.916016 3.05939C0.330078 2.47345 0.330078 1.52423 0.916016 0.938293C1.50195 0.352356 2.45117 0.352356 3.03711 0.938293L7.97656 5.88126L12.9172 0.940637C13.5031 0.3547 14.4523 0.3547 15.0383 0.940637C15.6242 1.52657 15.6242 2.47579 15.0383 3.06173L10.0977 8.00236L15.0359 12.9406Z" fill="#191414" />
            </Svg>
          </TouchableOpacity>
          <View style={styles.headerTitle}>
            <Text style={styles.headerTitleText}>Select Contacts</Text>
          </View>
        </View>

        <View style={styles.body}>
          <TouchableWithoutFeedback onPress={hideRemoveContact}>
            <View style={styles.inputContainer}>
              <Svg style={styles.inputIcon} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path fill-rule="evenodd" clip-rule="evenodd" d="M14.457 13.1641L19.6914 18.3984C20.0899 18.7656 20.0899 19.3594 19.7254 19.7254C19.5422 19.9084 19.3008 20 19.0625 20C18.8242 20 18.582 19.9102 18.3633 19.725L13.1289 14.4906C11.7441 15.5895 9.99571 16.25 8.08985 16.25C3.63751 16.25 0 12.6121 0 8.125C0 3.63789 3.60274 0 8.08985 0C12.577 0 16.2149 3.63672 16.2149 8.125C16.2149 10.0312 15.5899 11.7773 14.457 13.1641ZM8.12501 1.875C4.67892 1.875 1.87501 4.67891 1.87501 8.125C1.87501 11.5703 4.67892 14.375 8.12501 14.375C11.5711 14.375 14.375 11.5711 14.375 8.125C14.375 4.67891 11.5711 1.875 8.12501 1.875Z" fill="#60646A" />
              </Svg>
              <TextInput style={styles.input} placeholder="Search all contacts" onChangeText={(text) => setSearchText(text)} value={searchText} onFocus={hideRemoveContact} />
            </View>
          </TouchableWithoutFeedback>

          <View style={styles.selectedContacts}>
            <FlatList
              horizontal={true}
              data={selectedContacts}
              renderItem={({ item, index }) => (
                <ContactItem
                  name={item.name}
                  id={item.id}
                  hoveredContact={hoveredContact}
                  isFirstItem={index === 0}
                  onRemove={() => removeFromSelectedContacts(item.id)}
                  showCloseBtn={() => {
                    Vibration.vibrate(10);
                    setHoveredContact(item.id);
                  }
                  }
                />
              )}
            />
          </View>

          <TouchableWithoutFeedback onPress={hideRemoveContact}>
            <View style={styles.orderedContacts}>
              <SectionList
                sections={formattedContacts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <OrderedContactItem
                    name={item.name}
                    id={item.id}
                    toggleSelectedContact={() => toggleSelectedContact(item.id)}
                    selectedContacts={selectedContacts}
                  />
                )}
                renderSectionHeader={({ section: { title, data } }) => data.length ? <Text style={styles.orderedContactsHeader}>{title}</Text> : null
                }
              />

              <TouchableOpacity style={styles.btn} onPress={finish}>
                <Text style={styles.btnText}>ADD EMERGENCY CONTACTS</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </Modal>
  )
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  header: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  closeBtn: {
    width: 20,
    height: 20,
  },
  closeBtnAlt: {
    width: 16,
    height: 16,
    position: "absolute",
    top: 0,
    right: 0
  },
  headerTitle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitleText: {
    fontFamily: "EuclidCircularBold",
    fontWeight: "bold",
    fontSize: 20,
    lineHeight: 28,
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "#DFE4E8",
    borderRadius: 8,
    padding: 14,
    alignItems: "center"
  },
  input: {
    color: "#818FA3",
    fontFamily: "EuclidCircularLight",
    fontSize: 14,
    lineHeight: 20,
    flex: 1
  },
  inputIcon: {
    marginRight: 8
  },
  contactItem: {
    borderRadius: 50,
    backgroundColor: "rgba(60, 193, 59, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    width: 48,
    marginBottom: 4
  },
  contactItemText: {
    fontFamily: "EuclidCircularBold",
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 24,
    color: "#004954",
    textAlign: "center",
  },
  contactName: {
    fontFamily: "EuclidCircularRegular",
    fontSize: 10,
    lineHeight: 14,
    textAlign: "center"
  },
  contactItemContainer: {
    justifyContent: "center",
    paddingVertical: 10
  },
  selectedContacts: {
    marginTop: 20,
    marginBottom: 4
  },
  orderedContacts: {
    flex: 1
  },
  orderedContactsHeader: {
    fontFamily: "EuclidCircularBold",
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 24,
    color: "#191414",
    marginTop: 20,
    marginBottom: 4,
    paddingHorizontal: 12
  },
  orderedContactItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderBottomColor: "#F0F2F4",
    borderBottomWidth: 1
  },
  orderedContactText: {
    fontFamily: "EuclidCircularRegular",
    fontSize: 14,
    lineHeight: 20,
  },
  checkmark: {
    width: 20,
    height: 20,
  },
  btn: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#03C108",
    borderRadius: 60,
    position: "absolute",
    bottom: 20

  },
  btnText: {
    textAlign: "center",
    fontFamily: "EuclidCircularBold",
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 20,
    color: "#ffffff"
  }
});

export default SelectContacts;