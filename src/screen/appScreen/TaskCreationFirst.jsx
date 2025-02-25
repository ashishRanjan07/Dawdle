import {
  Image,
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

const TaskCreationFirst = () => {
  const [task, setTask] = useState("");
  const [subTask, setSubTask] = useState("");
  const navigation = useNavigation();

  const handleNextClicked = () => {
    if (task.trim() === "") {
      showMessage({
        type: "warning",
        icon: "warning",
        message: "Please Enter the task name",
        backgroundColor:AppColor.primary
      });
      return null;
    }
    if (subTask.trim() === "") {
      showMessage({
        type: "warning",
        icon: "warning",
        message: "Please Enter the task description",
        backgroundColor:AppColor.primary
      });
      return null;
    }
    navigation.navigate("Task Creation Second", {
      taskName: task,
      description: subTask,
    });
  };
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
      <ScrollView>
      <View style={styles.contentHolder}>
        <Text style={styles.subHeadText}>Task</Text>
        <Text style={styles.text}>
        Give a name to the task you are dawdling on
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

        <Text style={styles.text}>Provide a brief description of the task</Text>
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
        <CustomButton title={"Next"} handleAction={handleNextClicked} />
      </View>
    </View>
  );
};

export default TaskCreationFirst;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  backgroundHolder: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "45%",
  },
  subHeadText: {
    // fontFamily: FontFamily.Inter_Bold,
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
    bottom: moderateScale(50),
  },
  text: {
    // fontFamily: FontFamily.Inter_Regular,
    fontSize: textScale(13),
    color: AppColor.buttonBack1,
    marginTop: "10%",
    fontWeight: "300",
  },
  textInputBox: {
    borderWidth: moderateScale(2),
    width: moderateScale(350),
    borderColor: AppColor.borderColor,
    backgroundColor: AppColor.borderColor,
    borderRadius: moderateScale(15),
    height: moderateScale(60),
    paddingHorizontal: moderateScale(15),
    // fontFamily: FontFamily.Inter_Regular,
    fontSize: textScale(13),
    color: AppColor.black,
    fontWeight:'400',
  },
  contentHolder: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: Platform.OS==='ios'?'10%':'20%',
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
});
