import { Dimensions } from "react-native";

export const appInfo = {
  sizes: {
    WIDTH: Dimensions.get("window").width,
    HEIGHT: Dimensions.get("window").height,
  },
  //  BASE_URL: 'http://192.168.88.163:8080/api/v1/',
  // BASE_URL: 'http://192.168.88.120:8001/api/v1/',
  BASE_URL: "http://localhost:8080/api/v1/",
};

export const getDeviceType = () => {
  const { WIDTH } = appInfo.sizes;

  if (WIDTH >= 1200) {
    return "web"; // Kích thước lớn, có thể là thiết bị web hoặc màn hình lớn
  } else if (WIDTH >= 768) {
    return "tablet"; // Thiết bị tablet
  } else if (WIDTH >= 414) {
    return "mobile large"; // Thiết bị di động kích thước lớn (iPhone Plus, v.v.)
  } else if (WIDTH >= 320) {
    return "mobile medium"; // Thiết bị di động kích thước trung bình
  } else {
    return "mobile small"; // Thiết bị di động kích thước nhỏ
  }
};
