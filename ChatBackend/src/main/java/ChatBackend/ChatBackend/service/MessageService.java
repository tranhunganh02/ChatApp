package ChatBackend.ChatBackend.service;

import ChatBackend.ChatBackend.entity.Message;
import ChatBackend.ChatBackend.payload.response.MessageResponse;
import ChatBackend.ChatBackend.websocket.dto.SingleMessageSendDto;

import java.util.List;

public interface MessageService {
    MessageResponse sendMessage(SingleMessageSendDto msg, String senderEmail);
    List<MessageResponse> getSingleChatMessages(Integer senderId, Integer recipientId);
    List<MessageResponse> getSingleChatMessages(String token, Integer recipientId);
    List<MessageResponse> getGroupChatMessages(Integer chatId);
}
