import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AppColor from "../../utils/AppColor";
import {
  moderateScale,
  moderateScaleVertical,
  scale,
  textScale,
} from "../../utils/ResponsiveSize";
import { ImagePath } from "../../utils/ImagePath";
import FontFamily from "../../utils/FontFamily";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import DawdleLogo from "../../components/DawdleLogo";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { CREATE_APPLE_USER, CREATE_USER } from "../../api/API_SERVICES";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import { showMessage } from "react-native-flash-message";

const LoginOption = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    GoogleSignin.configure({
      iosClientId:
        "913084705365-rkd3a13n55nppacvdh62u2ak8o5d7k4q.apps.googleusercontent.com",
      androidClientId:
        "913084705365-7emo39rj6j6kkkvtg37se0f5pc45ubd6.apps.googleusercontent.com",
    });
  }, []);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo, "Line 46");
      const { name, email } = userInfo.data.user;
      console.log(name, email, "line 45");
      const data = {
        name: name,
        email: email,
      };
      const response = await CREATE_USER(data);
      console.log(response, "line 60");
      if (response?.status === true) {
        await AsyncStorage.setItem("userData", JSON.stringify(response));
        navigation.replace("Confirmation");
      } else {
        Alert.alert("Error", "Please try with a different account");
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      Alert.alert("Error signing in", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    setLoading(true);
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      console.log(appleAuthRequestResponse, "Line 77");
      const data = {
        appleUserId: appleAuthRequestResponse?.user,
        isApple: true,
      };
      if (
        appleAuthRequestResponse?.fullName?.givenName &&
        appleAuthRequestResponse?.fullName?.familyName
      ) {
        data.name = `${appleAuthRequestResponse.fullName.givenName} ${appleAuthRequestResponse.fullName.familyName}`;
      }

      // Add email only if it's available
      if (appleAuthRequestResponse?.email) {
        data.email = appleAuthRequestResponse.email;
      }

      // const data = {
      //   name: `${appleAuthRequestResponse?.fullName?.givenName} ${appleAuthRequestResponse?.fullName?.familyName}`,
      //   email: appleAuthRequestResponse?.email,
      //   appleUserId: appleAuthRequestResponse?.user,
      //   isApple: true,
      // };

      console.log(data, "Line 85");
      const response = await CREATE_APPLE_USER(data);
      console.log(response, "line 91");
      if (response?.status === true) {
        await AsyncStorage.setItem("userData", JSON.stringify(response));
        navigation.replace("Confirmation");
      } else {
        showMessage({
          type: "danger",
          icon: "danger",
          message: response?.message,
        });
        // Alert.alert("Error", response?.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert(error, "error");
    }
  };

  const navigation = useNavigation();
  return (
    <View style={styles.main}>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={"transparent"}
        translucent={true}
      />
      <SafeAreaView />
      <View style={styles.logoHolder}>
        <DawdleLogo />
      </View>

      <View style={styles.backgroundHolder}>
        <Image
          source={ImagePath.bg2}
          resizeMode="stretch"
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <View style={styles.contentHolder}>
        <Text style={styles.text}>Sign In</Text>
        {Platform.OS === "ios" && (
          <TouchableOpacity
            style={[styles.button, { marginTop: moderateScaleVertical(15) }]}
            onPress={handleAppleLogin}
          >
            <View style={styles.iconHolder}>
              <AntDesign
                name="apple1"
                color={AppColor.white}
                size={textScale(22)}
              />
            </View>
            <View style={{ width: "70%", alignItems: "center" }}>
              <Text style={styles.buttonText}>CONTINUE WITH APPLE</Text>
            </View>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: AppColor.white,
              borderColor: AppColor.borderColor2,
            },
          ]}
          onPress={handleGoogleLogin}
        >
          <View style={styles.iconHolder}>
            <Image
              source={ImagePath.googleIcon}
              resizeMode="cover"
              style={{ width: moderateScale(26), height: moderateScale(27) }}
            />
          </View>
          <View style={{ width: "70%", alignItems: "center" }}>
            <Text style={[styles.buttonText, { color: AppColor.black }]}>
              CONTINUE WITH GOOGLE
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {loading && (
        <View style={styles.loaderContainer}>
          <View style={styles.loaderContent}>
            <DawdleLogo />
            <Text style={styles.loaderText}>Please Wait...</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default LoginOption;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  text: {
    fontFamily: FontFamily.Inter_SemiBold,
    color: AppColor.buttonBack1,
    fontSize: textScale(21),
    fontWeight: "500",
    position: "absolute",
    top: "32%",
  },
  contentHolder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: moderateScaleVertical(20),
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: moderateScale(38),
    backgroundColor: AppColor.buttonBack1,
    width: "85%",
    height: moderateScale(60),
    borderWidth: 1,
  },
  iconHolder: {
    width: "20%",
    alignItems: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: AppColor.white,
    // fontFamily: FontFamily.Inter_Medium,
    fontSize: textScale(13),
    fontWeight: "500",
    letterSpacing: scale(0.8),
  },
  backgroundHolder: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "65%",
  },
  logoHolder: {
    flexDirection: "row",
    marginTop:
      Platform.OS === "android" ? moderateScaleVertical(50) : moderateScale(15),
    height: moderateScale(40),
    alignItems: "center",
    paddingHorizontal: moderateScale(10),
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  loaderContent: {
    width: "90%",
    padding: moderateScale(20),
    backgroundColor: AppColor.white,
    borderRadius: moderateScale(10),
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  loaderText: {
    fontFamily: FontFamily.Inter_SemiBold,
    color: AppColor.black,
    fontSize: textScale(14),
    fontWeight: "500",
    textAlign: "center",
    marginTop: moderateScaleVertical(10),
  },
});
