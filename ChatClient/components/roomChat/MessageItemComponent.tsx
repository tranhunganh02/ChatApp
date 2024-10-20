import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { appColors } from '@/constants/appColor'; // Chỉnh lại đường dẫn appColor theo project của bạn
import { Message } from '@/data';



interface MessageItemComponentProps {
  message: Message;
  currentUserId: string;
}

export default function MessageItemComponent({ message, currentUserId }: MessageItemComponentProps) {
  const isCurrentUser = message.senderId === currentUserId;

  return (
    <View style={[
      styles.messageContainer, 
      isCurrentUser ? styles.rightContainer : styles.leftContainer
    ]}>
      <View style={[
        styles.messageBubble, 
        { backgroundColor: isCurrentUser ? appColors.primary : '#F2F7FB' }
      ]}>
        <Text style={[
          styles.messageText, 
          { color: isCurrentUser ? '#FFFFFF' : '#000000' }
        ]}>
          {message.content}
        </Text>
      </View>
      <Text style={styles.timeText}>
        {message.time}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  messageContainer: {
    marginVertical: 5,
    maxWidth: '70%',
  },
  rightContainer: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  leftContainer: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  messageBubble: {
    borderRadius: 20,
    padding: 10,
    minHeight: 40,
    justifyContent: 'center',
  },
  messageText: {
    fontSize: 16,
  },
  timeText: {
    fontSize: 12,
    color: '#A0A0A0',
    marginTop: 4,
  }
});
