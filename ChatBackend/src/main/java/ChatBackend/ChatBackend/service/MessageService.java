package ChatBackend.ChatBackend.service;

import ChatBackend.ChatBackend.entity.Message;
import ChatBackend.ChatBackend.websocket.dto.SingleMessageSendDto;

public interface MessageService {
    Message sendMessage(SingleMessageSendDto msg, String senderEmail);
}
