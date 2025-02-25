import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import AppColor from "../../utils/AppColor";
import { ImagePath } from "../../utils/ImagePath";
import {
  moderateScale,
  moderateScaleVertical,
  scale,
  textScale,
} from "../../utils/ResponsiveSize";
import FontFamily from "../../utils/FontFamily";
import { useNavigation } from "@react-navigation/native";

const EndPage = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Confirmation");
    }, 7500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.main}>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={"transparent"}
        translucent={true}
      />
      <Image
        source={ImagePath.bg1}
        resizeMode="stretch"
        style={{ width: "100%", height: "50%" }}
      />

      <View style={styles.headerHolder}>
        <Image
          source={ImagePath.dawadle}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </View>
      <View style={styles.contentHolder}>
        <Text style={styles.text}>Come back when you find</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.text}>yourself </Text>
          <Text style={[styles.text, { color: AppColor.primary }]}>
            dawdling{" "}
          </Text>
          <Text style={styles.text}>again</Text>
          <Text style={[styles.text, { color: AppColor.primary }]}> :)</Text>
        </View>
      </View>
    </View>
  );
};

export default EndPage;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  headerHolder: {
    position: "absolute",
    marginTop: moderateScaleVertical(100),
    alignItems: "center",
    alignSelf: "center",
  },
  text: {
    fontFamily: FontFamily.Inter_Medium,
    fontSize: textScale(18),
    color: AppColor.black,
    textAlign: "center",
    lineHeight: scale(40),
    fontWeight: "500",
  },
  contentHolder: {
    width: "80%",
    alignSelf: "center",
    alignItems: "center",
    // borderWidth:2,
    marginTop: moderateScaleVertical(-50),
  },
  logoImage: {
    width: moderateScale(172),
    height: moderateScale(79),
  },
});
