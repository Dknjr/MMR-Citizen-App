import React from 'react';
import { Modal, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

// Définition des types des props
interface RequestModalProps {
  visible: boolean;
  onClose: () => void;
}

const RequestModal: React.FC<RequestModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <BlurView intensity={50} style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Image source={require('@/assets/images/Confetties.png')} style={styles.image} />
          <Image source={require('@/assets/images/like.png')} style={styles.image2} />

          <Text style={styles.thankYouText}>Thank you!</Text>
          <Text style={styles.messageText}>
          Nous apprécions votre contribution à l'amélioration de notre communauté. Nous vous tiendrons informé(e) de l'avancement de votre demande
          </Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close-circle-outline" size={24} color="#ff4d4d" />
            <Text style={styles.closeButtonText}>fermer la fenêtre</Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    height: '40%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
  },
  iconContainer: {
    backgroundColor: '#FFA500',
    borderRadius: 50,
    padding: 20,
    marginBottom: 20,
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    marginBottom: 20,
  },
  image2: {
    position: 'absolute',
    width: 130,
    height: 130,
    marginTop: -55,
  },
  thankYouText: {
    marginTop: 75,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff7f0e',
    textAlign: 'center',
  },
  messageText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  closeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#ff4d4d',
  },
});

export default RequestModal;
