package ChatBackend.ChatBackend.payload.response;

import ChatBackend.ChatBackend.entity.File;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FileResponse {
    @JsonProperty("file_name")
    private String fileName;
    @JsonProperty("file_url")
    private String fileUrl;
    @JsonProperty("file_type")
    private File.FileType fileType;
    private long size;

    public FileResponse fromFile(File file) {
        return new FileResponse(file.getFileName(), file.getFileUrl(), file.getFileType(), file.getFileSize());
    }
}
