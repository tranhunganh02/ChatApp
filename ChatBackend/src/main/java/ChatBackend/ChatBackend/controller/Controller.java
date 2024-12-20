package ChatBackend.ChatBackend.controller;

import ChatBackend.ChatBackend.exception.DataNotFoundException;
import ChatBackend.ChatBackend.service.impl.MessageServiceImpl;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/v1")
public class Controller {
    private final String uploadDir = "uploads";
      private static final Logger logger = LoggerFactory.getLogger(MessageServiceImpl.class);

    @GetMapping("/images/{filename}")
    public ResponseEntity<Resource> getImages(@PathVariable String filename) throws Exception {
        logger.info("cos nguoi da lay amnh");
        Path filePath = Paths.get(uploadDir + "/images").resolve(filename);
        Resource resource = new UrlResource(filePath.toUri());

        if (resource.exists() || resource.isReadable()) {
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } else {
            throw new DataNotFoundException("Không Thể Tìm Thấy Ảnh " + filename);
        }
    }

    @GetMapping("/files/{filename}")
    public ResponseEntity<Resource> getFiles(@PathVariable String filename) throws Exception {
        logger.info("cos nguoi da lay");
        Path filePath = Paths.get(uploadDir + "/files").resolve(filename);
        Resource resource = new UrlResource(filePath.toUri());

        if (resource.exists() || resource.isReadable()) {
            logger.info("lay xog");
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } else {
            throw new DataNotFoundException("Không Thể Tìm Thấy File " + filename);
        }
    }

    @GetMapping("/videos/{filename}")
    public ResponseEntity<Resource> getVideos(@PathVariable String filename) throws Exception {
        Path filePath = Paths.get(uploadDir + "/videos").resolve(filename);
        Resource resource = new UrlResource(filePath.toUri());

        if (resource.exists() || resource.isReadable()) {
            return ResponseEntity.ok()
                    .contentType(getVideoContentType(filename))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } else {
            throw new DataNotFoundException("Không Thể Tìm Thấy File " + filename);
        }
    }

    private MediaType getVideoContentType(String filename) {
        String fileExtension = filename.substring(filename.lastIndexOf(".") + 1).toLowerCase();

        switch (fileExtension) {
            case "mp4":
                return MediaType.valueOf("video/mp4");
            case "avi":
                return MediaType.valueOf("video/x-msvideo");
            case "mov":
                return MediaType.valueOf("video/quicktime");
            case "mkv":
                return MediaType.valueOf("video/x-matroska");
            default:
                return MediaType.APPLICATION_OCTET_STREAM;
        }
    }
}
