import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import IconButtonComponent from '../IconButtonComponent';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface VoiceChatComponentProps {
    startRecord?: () => void;
    stopRecord?: () => void;
  }

export default function VoiceChatComponent({
    startRecord,
    stopRecord
  }: VoiceChatComponentProps) {

  return (
    <View style={styles.container}>
      <IconButtonComponent
            stylesButton={styles.fab}
          onPressIn={startRecord}
          onPressOut={stopRecord}
          icon={<MaterialCommunityIcons name="microphone" size={30} />}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    right: 4,
    bottom: 60,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6e6ff'
  },
});
