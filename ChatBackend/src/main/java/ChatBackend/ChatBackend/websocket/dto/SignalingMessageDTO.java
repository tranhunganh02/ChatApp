package ChatBackend.ChatBackend.websocket.dto;

public class SignalingMessageDTO {
    private String type; // "offer", "answer", "candidate"
    private String sdp; // Dùng cho "offer" hoặc "answer"
    private String candidate; // Dùng cho "candidate"
    private String from; // ID người gửi
    private String to; // ID người nhận

    // Getter và Setter
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getSdp() {
        return sdp;
    }

    public void setSdp(String sdp) {
        this.sdp = sdp;
    }

    public String getCandidate() {
        return candidate;
    }

    public void setCandidate(String candidate) {
        this.candidate = candidate;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }
}
