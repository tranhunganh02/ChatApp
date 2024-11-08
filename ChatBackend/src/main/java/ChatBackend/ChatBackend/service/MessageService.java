package ChatBackend.ChatBackend.service;

import ChatBackend.ChatBackend.payload.response.MessageResponse;
import ChatBackend.ChatBackend.websocket.dto.GroupTextSendDTO;
import ChatBackend.ChatBackend.websocket.dto.SingleTextSendDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface MessageService {
    MessageResponse getMessageById(Integer id);
    MessageResponse sendSingleTextMessage(SingleTextSendDTO msg, String senderId);
    MessageResponse sendSingleFileMessage(List<MultipartFile> files, Integer recipientId, String token);
//    List<MessageTextResponse> getSingleChatMessages(Integer senderId, Integer recipientId);
    List<MessageResponse> getSingleChatMessages(String token, Integer recipientId);
    List<Integer> getListRecipientId(Integer messageId, Integer senderId);
    List<MessageResponse> getGroupChatMessages(Integer chatId);
    MessageResponse sendGroupTextMessage(GroupTextSendDTO msg, String senderId);
    List<MessageResponse> getGroupChatMessages(String token, Integer chatId);
    MessageResponse sendGroupFileMessage(List<MultipartFile> files, Integer chatId, String token);
    List<Integer> getListRecipientId(GroupTextSendDTO msg, String senderId);
}
