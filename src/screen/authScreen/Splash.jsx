import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import AppColor from "../../utils/AppColor";
import FontFamily from "../../utils/FontFamily";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "../../utils/ResponsiveSize";
import { DotIndicator } from "react-native-indicators";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const checkUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (userData) {
          console.log("User Data Found:", JSON.parse(userData));
          navigation.replace("Confirmation");
        } else {
          navigation.replace("Welcome");
        }
      } catch (error) {
        Alert.alert("Error", "Failed to retrieve user data.");
        console.error("AsyncStorage Error:", error);
        navigation.navigate("Welcome");
      }
    };

    const timer = setTimeout(() => {
      checkUserData();
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);
  return (
    <View style={styles.main}>
      <StatusBar backgroundColor={AppColor.white} barStyle={"dark-content"} />
      <View
        style={{
          height:
            Platform.OS === "android" ? moderateScale(10) : moderateScale(15),
          marginRight: moderateScale(10),
          marginBottom:
            Platform.OS === "android"
              ? moderateScaleVertical(-40)
              : moderateScaleVertical(-5),
        }}
      >
        <DotIndicator color={AppColor.primary} size={textScale(11)} count={3} />
      </View>

      <Text style={styles.text}>dawdle</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: AppColor.white,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: FontFamily.LeagueSpartan_Bold,
    color: AppColor.primary,
    fontSize: textScale(77.4),
  },
});
