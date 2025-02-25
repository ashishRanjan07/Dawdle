import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import AppColor from "../../utils/AppColor";
import { ImagePath } from "../../utils/ImagePath";
import {
  moderateScale,
  moderateScaleVertical,
  scale,
  textScale,
} from "../../utils/ResponsiveSize";
import FontFamily from "../../utils/FontFamily";
import CustomButton from "../../components/CustomButton";
import VersionInfo from "react-native-version-info";
import { useNavigation } from "@react-navigation/native";
import { DotIndicator } from "react-native-indicators";
import DawdleLogo from "../../components/DawdleLogo";
const Welcome = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.main}>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={"transparent"}
        translucent={true}
      />
      <Image
        source={ImagePath.bg1}
        resizeMode="cover"
        style={{ width: "100%", height: "50%" }}
      />
      <View style={styles.textHolder}>
        <Text style={styles.text}>Disclaimer:</Text>
        <Text style={styles.text}>
          As the app is currently a work in progress, we{"\n"} request that you
          use it only when you are{"\n"} actively procrastinating a certain
          task.{"\n"}Thank you for your understanding!
        </Text>
      </View>
      <View style={styles.buttonHolder}>
        <CustomButton
          title={"SIGN IN"}
          handleAction={() => navigation.navigate("LoginOption")}
        />
      </View>
      <View style={styles.headerHolder}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.headerText}>Welcome to </Text>
          <DawdleLogo />
        </View>
        <Text style={styles.versionText}>
          Version:{VersionInfo.appVersion}.
        </Text>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  text: {
    // fontFamily: FontFamily.Inter_Regular,
    color: AppColor.textGray,
    fontWeight:'300',
    fontSize: textScale(13),
    textAlign: "center",
    width: moderateScale(330),
    lineHeight: textScale(26.4),
  },
  buttonHolder: {
    width:  '80%',
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    bottom: moderateScale(50),
  },
  headerText: {
    // fontFamily: FontFamily.Inter_Medium,
    fontSize: textScale(21),
    marginTop: moderateScale(8),
    marginRight: moderateScale(-8),
    color: AppColor.wText,
    fontWeight: "400",
  },
  textHolder: {
    alignItems: "center",
    marginTop: moderateScale(15),
    gap: moderateScaleVertical(50),
  },
  versionText: {
    fontSize: textScale(11),
    color: AppColor.wText,
    fontFamily: FontFamily.Inter_Medium,
    fontWeight: "500",
  },
  headerHolder: {
    position: "absolute",
    marginTop: moderateScaleVertical(148),
    alignItems: "center",
    alignSelf: "center",
    gap: moderateScaleVertical(2),
  },
});
