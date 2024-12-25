import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  PermissionsAndroid,
} from "react-native";
import * as FileSystem from "expo-file-system";
import { ProgressBar } from "react-native-paper";
import * as Sharing from "expo-sharing";

interface MessagingDownloadComponentProps {
  fileUrl: string;
  fileName: string;
}

const MessagingDownloadComponent: React.FC<MessagingDownloadComponentProps> = ({
  fileUrl,
  fileName,
}) => {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloaded, setIsDownloaded] = useState(false);

  async function requestStoragePermission() {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Storage Permission Required",
            message: "This app needs access to your storage to download files",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  }

  const callback = (progress: FileSystem.DownloadProgressData) => {
    const percentProgress =
      (progress.totalBytesWritten / progress.totalBytesExpectedToWrite) * 100;
    setDownloadProgress(percentProgress);
  };

  const downloadFile = async () => {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      Alert.alert("Lỗi", "Không có quyền lưu trữ. Không thể tải file.");
      return;
    }

    const fileUri = FileSystem.documentDirectory + fileName;

    try {
      const result = await FileSystem.downloadAsync(fileUrl, fileUri);
      if (result.status === 200) {
        console.log("Finished downloading to", result.uri);
        setIsDownloaded(true);
        Alert.alert("Thông báo", `Tải file thành công: ${fileName}`);
        shareFile(result.uri);
      } else {
        Alert.alert("Lỗi", "Không thể tải file.");
      }
    } catch (error) {
      console.error("Download error:", error);
      Alert.alert("Lỗi", "Không thể tải file.");
    }
  };

  const shareFile = async (uri: string) => {
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri);
    } else {
      Alert.alert(
        "Sharing not available",
        "Unable to share file on this device"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.fileText}>📄 {fileName}</Text>
      <View style={styles.fileActions}>
        <TouchableOpacity onPress={downloadFile}>
          <Text style={styles.actionText}>Tải về</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  fileText: {
    fontSize: 16,
    color: "#4caf50",
    marginBottom: 10,
  },
  fileActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  actionText: {
    color: "#1e90ff",
    fontSize: 14,
    marginHorizontal: 10,
  },
  progressText: {
    color: "#888",
    fontSize: 14,
    marginTop: 5,
  },
});

export default MessagingDownloadComponent;
