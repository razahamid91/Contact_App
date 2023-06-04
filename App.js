import * as Contacts from 'expo-contacts';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Modal } from 'react-native';


export default function App() {
  const [contacts, setContacts] = useState([ { id: '1', name: 'Hamid Raza', phoneNumbers: [{ number: '1234567890' }] },
  { id: '2', name: 'saif', phoneNumbers: [{ number: '9876543210' }] },
  { id: '3', name: 'Arjun Gupta', phoneNumbers: [{ number: '5555555555' }] },
  { id: '3', name: 'Raj', phoneNumbers: [{ number: '5555555555' }] },
  { id: '3', name: 'Lpu', phoneNumbers: [{ number: '5555555555' }] },]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
        });
        if (data.length > 0) {
          setContacts(data);
          setFilteredContacts(data);
        }
      }
    })();
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredContacts(filtered);
  };

  const handleContactPress = (contact) => {
    setSelectedContact(contact);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search contacts"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleContactPress(item)}>
            <Text style={styles.contactItem}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>{selectedContact?.name}</Text>
          {selectedContact?.phoneNumbers && selectedContact?.phoneNumbers.length > 0 && (
            <Text style={styles.modalText}>{selectedContact?.phoneNumbers[0].number}</Text>
          )}
          <TouchableOpacity
            style={styles.dismissButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.dismissButtonText}>Dismiss</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
          }

          const styles = StyleSheet.create({
            container: {
              flex: 1,
              backgroundColor: '#fff',
              padding: 20,
            },
            searchInput: {
              height: 45,
              marginTop:20,
              borderColor: 'gray',
              borderWidth: 1,
              marginBottom: 10,
              paddingHorizontal: 10,
            },
            contactItem: {
              fontSize: 16,
              paddingVertical: 5,
            },
            modalContainer: {
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            modalText: {
              fontSize: 20,
              marginBottom: 10,
              color: '#fff',
            },
            dismissButton: {
              backgroundColor: '#fff',
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 5,
              marginTop: 10,
            },
            dismissButtonText: {
              fontSize: 16,
              color: '#000',
            },
          });
          
