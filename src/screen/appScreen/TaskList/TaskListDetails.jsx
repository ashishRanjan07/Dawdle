import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import AppColor from "../../../utils/AppColor";
import {
  moderateScale,
  moderateScaleVertical,
  scale,
  textScale,
} from "../../../utils/ResponsiveSize";
import { ImagePath } from "../../../utils/ImagePath";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import FontFamily from "../../../utils/FontFamily";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CustomButton from "../../../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MARK_TASK_COMPLETED } from "../../../api/API_SERVICES";
import { showMessage } from "react-native-flash-message";
import { MaterialIndicator } from "react-native-indicators";

const TaskListDetails = ({ route }) => {
  const navigation = useNavigation();
  const { data, userId, incomingFrom } = route.params;
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(incomingFrom, "Line 7");

  const handleCheckMark = async () => {
    setLoading(true);
    const userData = await AsyncStorage.getItem("userData");
    const res = JSON.parse(userData);
    // console.log(res?.data?._id, "line 52");
    setChecked(!checked);

    const payload = {
      taskComplete: true,
      userId: userId,
      taskId: data?._id,
    };
    console.log(payload, "line 45");
    const response = await MARK_TASK_COMPLETED(payload);
    console.log(response, "Line 49");
    if (response?.status === true) {
      setLoading(false);
      showMessage({
        type: "success",
        icon: "success",
        message: response?.message,
      });
      navigation.goBack();
    } else {
      setLoading(false);
      showMessage({
        type: "danger",
        icon: "danger",
        message: response?.message,
      });
    }
    // console.log(response, "line 46");
  };

  return (
    <View style={styles.main}>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={"transparent"}
        translucent={true}
      />
      <SafeAreaView />
      <View
        style={{
          flex: 0.89,
          alignItems: "center",
        }}
      >
        {/* Header */}
        <View style={styles.headerHolder}>
          <TouchableOpacity
            style={styles.buttonView}
            onPress={() => navigation.goBack()}
          >
            <AntDesign
              name="arrowleft"
              color={AppColor.buttonBack1}
              size={moderateScale(25)}
            />
          </TouchableOpacity>
          <Text style={styles.nameText}>{data?.taskName}</Text>
        </View>
        {/* CheckBox */}
        <View
          style={[
            styles.headerHolder,
            { justifyContent: "center", marginTop: 0 },
          ]}
        >
          {incomingFrom === "Done" ? (
            <FontAwesome
              name="check-square"
              size={textScale(19)}
              color={AppColor.primary}
            />
          ) : (
            <TouchableOpacity onPress={() => handleCheckMark()}>
              {checked ? (
                <FontAwesome
                  name="check-square"
                  size={textScale(19)}
                  color={AppColor.primary}
                />
              ) : (
                <View style={styles.checkBox} />
              )}
            </TouchableOpacity>
          )}
          <Text style={styles.cmText}>Mark Complete</Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: "100%" }}
          contentContainerStyle={{ alignItems: "center" }}
        >
          <Text style={styles.secondaryText}>
            here’s some of the information about{"\n"} the above task.
          </Text>
          <View style={styles.divider} />
          <View style={styles.contentHolder}>
            <Text style={styles.text}>Reason for task avoidance:</Text>
            <Text style={styles.text2}>{data?.avoidingTask}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.contentHolder}>
            <Text style={styles.text}>Benefits of task completion:</Text>
            <Text style={styles.text2}>{data?.benefitTask}</Text>
          </View>
          <View style={styles.divider} />
          <View
            style={{ width: "90%", marginVertical: moderateScaleVertical(10) }}
          >
            <CustomButton
              title={"ADD NEW SUBTASK"}
              disabled={incomingFrom === "Done"}
              handleAction={() =>
                navigation.navigate("SubTask", {
                  taskId: data?._id,
                  userId: userId,
                })
              }
            />
          </View>

          {data?.subtasks.map((item, index) => (
            <View style={styles.renderView} key={index}>
              <View style={styles.firstView}>
                <Text style={styles.nameText2}>{item?.name}</Text>
              </View>
              <View style={styles.firstView}>
                <Text
                  style={[
                    styles.nameText2,
                    { fontFamily: FontFamily.Inter_Regular, fontWeight: "400" },
                  ]}
                >
                  {item?.rewards}
                </Text>
              </View>
              <View style={styles.firstView}>
                <Text
                  style={[
                    styles.nameText2,
                    { fontFamily: FontFamily.Inter_Regular, fontWeight: "400" },
                  ]}
                >
                  {item?.timer} Second
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
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

export default TaskListDetails;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  buttonView: {
    alignItems: "center",
    justifyContent: "center",
    height: moderateScale(51),
    width: moderateScale(51),
    borderRadius: moderateScale(40),
    backgroundColor: AppColor.white,
    borderColor: AppColor.circleColor,
    borderWidth: 2,
  },
  nameText: {
    fontFamily: FontFamily.Inter_Bold,
    fontSize: textScale(21),
    fontWeight: "500",
    color: AppColor.buttonBack1,
    letterSpacing: scale(0.2),
  },
  headerHolder: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(10),
    width: "95%",
    marginTop: moderateScaleVertical(10),
    padding: moderateScale(10),
  },
  cmText: {
    fontFamily: FontFamily.Inter_Regular,
    fontSize: textScale(12),
    fontWeight: "500",
    color: AppColor.buttonBack1,
  },
  checkBox: {
    backgroundColor: AppColor.checkboxBackground,
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(5),
  },
  secondaryText: {
    fontFamily: FontFamily?.Inter_Medium,
    color: AppColor.textGray,
    textAlign: "center",
    fontSize: textScale(14),
    width: "70%",
    lineHeight: scale(22),
  },
  divider: {
    borderWidth: moderateScale(1),
    marginVertical: moderateScaleVertical(10),
    width: "90%",
    borderColor: AppColor.divider,
  },
  text: {
    fontFamily: FontFamily.Inter_Medium,
    fontSize: textScale(13),
    fontWeight: "500",
    color: AppColor.buttonBack1,
  },
  text2: {
    fontFamily: FontFamily.Inter_Light,
    fontSize: textScale(13),
    fontWeight: "400",
    color: AppColor.buttonBack1,
  },
  contentHolder: {
    width: "90%",
    gap: moderateScale(10),
    paddingVertical: moderateScaleVertical(10),
  },
  renderView: {
    borderWidth: 2,
    borderRadius: moderateScale(10),
    backgroundColor: AppColor.back,
    borderColor: AppColor.back,
    width: "90%",
    marginTop: moderateScaleVertical(10),
  },
  firstView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: moderateScale(10),
    borderBottomWidth: 1,
    borderColor: AppColor.divider,
  },
  nameText2: {
    fontFamily: FontFamily.Inter_Medium,
    fontSize: textScale(13),
    fontWeight: "500",
    color: AppColor.buttonBack1,
    letterSpacing: scale(0.2),
    // width: "45%",
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
