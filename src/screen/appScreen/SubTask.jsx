import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { ImagePath } from "../../utils/ImagePath";
import AppColor from "../../utils/AppColor";
import {
  moderateScale,
  moderateScaleVertical,
  scale,
  textScale,
} from "../../utils/ResponsiveSize";
import FontFamily from "../../utils/FontFamily";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import DawdleLogo from "../../components/DawdleLogo";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SubTask = ({ route }) => {
  const { taskId, userId } = route.params;
  console.log(taskId, userId, "Line 27");
  const [task, setTask] = useState("");
  const [subTask, setSubTask] = useState("");
  const navigation = useNavigation();

  const handleNextScreen = async () => {
    if (task.trim() === "") {
      showMessage({
        type: "warning",
        icon: "warning",
        message: "Please enter the subtask name",
        backgroundColor: AppColor.primary,
      });
      return null;
    }
    if (subTask.trim() === "") {
      showMessage({
        type: "warning",
        icon: "warning",
        message: "Please enter the small reward name",
        backgroundColor: AppColor.primary,
      });
      return null;
    }
    await AsyncStorage.setItem("reward", subTask);
    navigation.navigate("SubTaskTimer", {
      taskId: taskId,
      userId: userId,
      name: task,
      rewards: subTask,
    });
  };
  return (
    <KeyboardAvoidingView
    style={styles.main}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
  >
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
      <ScrollView  contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        <View style={styles.contentHolder}>
          <Text style={styles.subHeadText}>Subtask</Text>
          <Text style={styles.text}>
            Give a name to the easiest subtask {"\n"} you can do right away
          </Text>
          <TextInput
            style={styles.textInputBox}
            placeholder="Insert text here"
            placeholderTextColor={AppColor.textGray}
            value={task}
            autoFocus={true}
            keyboardType="default"
            keyboardAppearance="default"
            onChangeText={(text) => setTask(text)}
          />

          <Text style={styles.text}>
            Please choose a small reward for {"\n"}once you complete the subtask
          </Text>
          <TextInput
            style={styles.textInputBox}
            placeholder="Insert text here"
            placeholderTextColor={AppColor.textGray}
            value={subTask}
            keyboardType="default"
            keyboardAppearance="default"
            onChangeText={(text) => setSubTask(text)}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonHolder}>
        <CustomButton title={"Next"} handleAction={handleNextScreen} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default SubTask;

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
  backgroundHolder: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "40%",
  },
  subHeadText: {
    fontSize: textScale(21),
    color: AppColor.primary,
    textAlign: "center",
    fontWeight: "600",
  },
  buttonHolder: {
    width: "80%",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    bottom:Platform.OS==='android'? moderateScale(10):moderateScale(25),
  },
  text: {
    fontFamily: FontFamily.Inter_Light,
    marginTop: "12%",
    textAlign: "center",
    lineHeight: textScale(20),
    fontSize: textScale(13),
    color: AppColor.buttonBack1,
    fontWeight: "300",
  },
  textInputBox: {
    borderWidth: moderateScale(2),
    width: "90%",
    borderColor: AppColor.borderColor,
    backgroundColor: AppColor.borderColor,
    borderRadius: moderateScale(15),
    height: moderateScale(63),
    paddingHorizontal: moderateScale(10),
    fontFamily: FontFamily.Inter_Regular,
    marginTop: moderateScaleVertical(5),
    fontSize: textScale(13),
    color: AppColor.black,
    fontWeight: "400",
  },
  contentHolder: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: Platform.OS === "ios" ? "10%" : "20%",
    gap: moderateScaleVertical(10),
  },
  logoHolder: {
    flexDirection: "row",
    marginTop:
      Platform.OS === "android" ? moderateScaleVertical(50) : moderateScale(15),
    height: moderateScale(40),
    alignItems: "center",
    paddingHorizontal: moderateScale(10),
  },
  scrollViewContent: {
    flexGrow: 1,
    // justifyContent: "center",
    paddingBottom: moderateScaleVertical(100),
  },
});
