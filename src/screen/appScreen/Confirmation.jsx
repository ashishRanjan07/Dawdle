import {
  BackHandler,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import AppColor from "../../utils/AppColor";
import {
  moderateScale,
  moderateScaleVertical,
  scale,
  textScale,
} from "../../utils/ResponsiveSize";
import { ImagePath } from "../../utils/ImagePath";
import FontFamily from "../../utils/FontFamily";
import CustomButton from "../../components/CustomButton";
import CustomButtonInactive from "../../components/CustomButtonInactive";
import { useNavigation } from "@react-navigation/native";
import DawdleLogo from "../../components/DawdleLogo";

const Confirmation = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.main}>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={"transparent"}
        translucent={true}
      />
      <SafeAreaView />
      {/* <View style={styles.logoHolder}>
        <DawdleLogo />
      </View> */}
      <View style={styles.backgroundHolder}>
        <Image
          source={ImagePath.bg2}
          resizeMode="stretch"
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <View style={styles.contentHolder}>
        <View style={{ gap: moderateScaleVertical(5) }}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              gap: moderateScaleVertical(3),
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.text}>Are you </Text>
              <Text style={[styles.text, { color: AppColor.primary }]}>
                dawdling
              </Text>
            </View>
            <Text style={styles.text}>right now?</Text>
          </View>
          <Text style={[styles.subHeadText, { fontWeight: "700" }]}>
            dawdle = procrastination
          </Text>
        </View>
        <View style={styles.buttonHolder}>
          <View style={{ width: moderateScale(174) }}>
            <CustomButton
              title={"YES"}
              handleAction={() => navigation.navigate("BottomNavigation",{comingFrom:'Add Task'})}
            />
          </View>
          <View style={{ width: moderateScale(174) }}>
            <CustomButtonInactive
              title={"NO"}
              handleAction={() => {
                navigation.navigate("BottomNavigation",{comingFrom:'Home'});
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Confirmation;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  HeaderImageHolder: {
    marginTop: moderateScaleVertical(60),
    alignItems: "flex-start",
    marginHorizontal: moderateScale(10),
  },
  logoImage: {
    width: moderateScale(110),
    height: moderateScale(51),
  },
  text: {
    textAlign: "center",
    // fontFamily: FontFamily.Inter_SemiBold,
    color: AppColor.buttonBack1,
    fontSize: textScale(21),
    fontWeight: "500",
  },
  contentHolder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: moderateScaleVertical(20),
  },
  backgroundHolder: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: Platform.OS === "ios" ? "65.5%" : "69.5%",
  },
  subHeadText: {
    // fontFamily: FontFamily.Inter_Bold,
    fontSize: textScale(13),
    color: AppColor.primary,
    textAlign: "center",
    fontWeight: "700",
    marginVertical: moderateScaleVertical(25),
    lineHeight: scale(27),
  },
  buttonHolder: {
    width: "98%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginVertical: moderateScaleVertical(10),
  },
  logoHolder: {
    flexDirection: "row",
    marginTop:
      Platform.OS === "android" ? moderateScaleVertical(50) : moderateScale(15),
    height: moderateScale(40),
    alignItems: "center",
    paddingHorizontal: moderateScale(10),
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    width: moderateScale(274),
    gap: moderateScale(10),
    justifyContent: "center",
  },
});
