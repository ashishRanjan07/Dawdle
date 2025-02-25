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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CREATE_TASK } from "../../api/API_SERVICES";

import { MaterialIndicator } from "react-native-indicators";
const TaskCreationSecond = ({ route }) => {
  const { taskName, description } = route.params;
  // console.log(taskName, description, "Line 28");
  const [task, setTask] = useState("");
  const [subTask, setSubTask] = useState("");
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleNextClicked = async () => {
    if (task.trim() === "") {
      showMessage({
        type: "warning",
        icon: "warning",
        message: "Please Enter the region to avoid the task",
        backgroundColor: AppColor.primary,
      });
      return null;
    }
    if (subTask.trim() === "") {
      showMessage({
        type: "warning",
        icon: "warning",
        message: "Please Enter the benefits of completions",
        backgroundColor: AppColor.primary,
      });
      return null;
    }
    const userData = await AsyncStorage.getItem("userData");
    const res = JSON.parse(userData);
    console.log(res?.data?._id, "line 52");
    const data = {
      userId: res?.data?._id,
      taskName: taskName,
      description: description,
      avoidingTask: task,
      benefitTask: subTask,
    };
    try {
      setLoading(true);
      const response = await CREATE_TASK(data);
      console.log(response, "Line 66");
      if (response?.status === true) {
        const tasks = response?.data?.tasks;
        const lastTaskId = tasks[tasks.length - 1]?._id;
        console.log(lastTaskId, "Task Id Line 65");
        setLoading(false);
        navigation.navigate("SubTask", {
          taskId: lastTaskId,
          userId: res?.data?._id,
        });
      } else {
        setLoading(false);
        showMessage({
          message: response?.message,
          type: "danger",
          icon: "danger",
        });
      }
    } catch (error) {
      setLoading(false);
      showMessage({
        message: error,
        type: "danger",
        icon: "danger",
      });
    }
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentHolder}>
          <Text style={styles.subHeadText}>Task</Text>
          <Text style={styles.text}>Why are you avoiding doing the task?</Text>
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
            What are the benefits of completing this task?
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
        <CustomButton
          title={"Next"}
          handleAction={handleNextClicked}
          // handleAction={() => navigation.navigate('SubTask')}
        />
      </View>
      {loading && (
        <View style={styles.loaderContainer}>
          <View style={styles.loaderContent}>
            <MaterialIndicator
              color={AppColor.primary}
              size={moderateScale(40)}
            />
            {/* <Text style={styles.loaderText}>Please Wait...</Text> */}
          </View>
        </View>
      )}
    </View>
  );
};

export default TaskCreationSecond;

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
    width: "90%",
    borderColor: AppColor.borderColor,
    backgroundColor: AppColor.borderColor,
    borderRadius: moderateScale(15),
    height: moderateScale(60),
    paddingHorizontal: moderateScale(15),
    fontFamily: FontFamily.Inter_Regular,
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
    height: moderateScale(100),
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
  loaderText: {
    fontFamily: FontFamily.Inter_SemiBold,
    color: AppColor.black,
    fontSize: textScale(14),
    fontWeight: "500",
    textAlign: "center",
    marginTop: moderateScaleVertical(20),
  },
});
