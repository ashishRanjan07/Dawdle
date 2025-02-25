import {
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import AppColor from "../../../utils/AppColor";
import { ImagePath } from "../../../utils/ImagePath";
import {
  moderateScaleVertical,
  textScale,
} from "../../../utils/ResponsiveSize";
import FontFamily from "../../../utils/FontFamily";

const Motivation = () => {
  return (
    <View style={styles.main}>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={"transparent"}
        translucent={true}
      />
      <SafeAreaView />
      <View style={styles.backgroundHolder}>
        <Image
          source={ImagePath.bg2}
          resizeMode="stretch"
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <View style={styles.contentHolder}>
        <Text style={styles.text}>coming soon</Text>
      </View>
    </View>
  );
};

export default Motivation;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  backgroundHolder: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: Platform.OS === "ios" ? "65.5%" : "69.5%",
  },
  contentHolder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: moderateScaleVertical(20),
  },
  text: {
    fontFamily: FontFamily.Inter_Regular,
    fontSize: textScale(21),
    color: AppColor.wText,
  },
});
