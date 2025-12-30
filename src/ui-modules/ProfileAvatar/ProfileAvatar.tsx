import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { theme } from '@constants/theme';
import { styles } from './ProfileAvatar.styles';

export interface IProfileAvatarProps {
  onLogout: () => void | Promise<void>;
  userEmail?: string;
}

export const ProfileAvatar = ({ onLogout, userEmail }: IProfileAvatarProps) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const getInitials = () => {
    if (userEmail) {
      return userEmail.charAt(0).toUpperCase();
    }
    return 'U';
  };

  return (
    <>
      <TouchableOpacity
        style={styles.avatar}
        onPress={() => setMenuVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.avatarText}>{getInitials()}</Text>
      </TouchableOpacity>

      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.menu}>
            {userEmail && (
              <View style={styles.menuHeader}>
                <Text style={styles.menuEmail}>{userEmail}</Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.menuItem}
              onPress={async () => {
                setMenuVisible(false);
                await onLogout();
              }}
            >
              <Text style={styles.menuItemText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};
