import * as Font from "expo-font";

const loadFonts = async () => {
  await Font.loadAsync({
    acmeRegular: require("../assets/fonts/Acme-Regular.ttf"),
    poppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
  });
};

export default {
  loadFonts,
  acmeRegular: {
    fontFamily: "acmeRegular",
  },
  poppinsRegular: {
    fontFamily: "poppinsRegular",
  },
};
