import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import AppColor from "../../utils/AppColor";
import { ImagePath } from "../../utils/ImagePath";
import {
  moderateScale,
  moderateScaleVertical,
  scale,
  textScale,
} from "../../utils/ResponsiveSize";
import FontFamily from "../../utils/FontFamily";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CustomButton from "../../components/CustomButton";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ADD_FEEDBACK } from "../../api/API_SERVICES";
import { useNavigation } from "@react-navigation/native";
import { MaterialIndicator } from "react-native-indicators";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSubmitFeedback = async () => {
    if (feedback.trim() === "") {
      showMessage({
        type: "danger",
        icon: "danger",
        message: "Please enter the feedback",
      });
      return null;
    }

    const userData = await AsyncStorage.getItem("userData");
    const res = JSON.parse(userData);
    const data = {
      userId: res?.data?._id,
      feedback: feedback,
      provideFeedback: checked,
    };

    try {
      setLoading(true);
      const response = await ADD_FEEDBACK(data);
      if (response?.status === true) {
        setLoading(false);
        navigation.navigate("End");
      }
    } catch (error) {
      setLoading(false);
      showMessage({
        message: error.message || "Error submitting feedback",
        type: "danger",
        icon: "danger",
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.main}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          style={{ flex: 1 }}
        >
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <StatusBar />
            <View style={styles.bgHolder}>
              <Image
                source={ImagePath.bg1}
                resizeMode="stretch"
                style={styles.lineImageHolder}
              />
            </View>
            <View style={styles.logoImageHolder}>
              <Image source={ImagePath.dawadle} style={styles.logoImage} />
            </View>
            <View style={styles.contentHolder}>
              <Text style={styles.textStyle}>Thank you for using my</Text>
              <Text style={[styles.textStyle, { color: AppColor.primary }]}>
                first prototype!
              </Text>
              <Text style={styles.textStyle}>
                It means a lot. I’d love to get your feedback on what you liked,
                disliked, and wish to see from future versions of the app
              </Text>
            </View>
            <TextInput
              placeholder="Text entry"
              placeholderTextColor={AppColor.textGray}
              value={feedback}
              onChangeText={(text) => setFeedback(text)}
              style={styles.textInputBox}
              multiline
              autoFocus
              keyboardType="default"
              returnKeyType="done"
            />
            <TouchableOpacity
              style={styles.checkBoxedHolder}
              onPress={() => setChecked(!checked)}
            >
              {checked ? (
                <FontAwesome
                  name="check-square"
                  size={textScale(25)}
                  color={AppColor.primary}
                />
              ) : (
                <MaterialCommunityIcons
                  name={"checkbox-blank-outline"}
                  size={textScale(25)}
                  color={AppColor.textGray}
                />
              )}
              <Text style={styles.tcText}>
                Are you open to being contacted to provide feedback on your
                experiences with the app?
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
        <View style={styles.buttonHolder}>
          <CustomButton title={"Submit"} handleAction={handleSubmitFeedback} />
        </View>
        {loading && (
          <View style={styles.loaderContainer}>
            <View style={styles.loaderContent}>
              <MaterialIndicator
                color={AppColor.primary}
                size={moderateScale(40)}
              />
            </View>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  bgHolder: {
    height: "30%",
    position: "absolute",
    width: "100%",
  },
  logoImage: {
    width: moderateScale(173),
    height: moderateScale(80),
  },
  logoImageHolder: {
    position: "absolute",
    marginTop: "20%",
    alignItems: "center",
    alignSelf: "center",
  },
  contentHolder: {
    marginTop: "50%",
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
  },
  textStyle: {
    color: AppColor.buttonBack1,
    fontSize: textScale(13),
    textAlign: "center",
    letterSpacing: scale(0.5),
    lineHeight: scale(26),
    fontWeight: "400",
  },
  textInputBox: {
    borderWidth: 2,
    marginTop: "25%",
    width: "90%",
    height: moderateScale(120),
    alignSelf: "center",
    borderRadius: moderateScale(10),
    backgroundColor: AppColor.borderColor,
    borderColor: AppColor.borderColor,
    fontSize: textScale(13),
    fontWeight: "400",
    color: AppColor.black,
    paddingHorizontal: moderateScale(15),
    textAlignVertical: "top", // Ensures the text starts at the top-left
  },
  buttonHolder: {
    marginBottom: moderateScaleVertical(25),
    width: "85%",
    alignSelf: "center",
    alignItems: "center",
  },
  tcText: {
    width: "90%",
    fontSize: textScale(13),
    fontWeight: "300",
    color: AppColor.textGray,
  },
  checkBoxedHolder: {
    marginVertical: moderateScaleVertical(10),
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    gap: moderateScale(10),
  },
  lineImageHolder: {
    width: "100%",
    height: "100%",
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  loaderContent: {
    width: "90%",
    padding: moderateScale(15),
    backgroundColor: AppColor.white,
    borderRadius: moderateScale(10),
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
});
