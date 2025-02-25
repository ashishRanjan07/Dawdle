import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  Platform,
  Modal,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import {
  moderateScale,
  moderateScaleVertical,
  scale,
  textScale,
} from "../../utils/ResponsiveSize";
import FontFamily from "../../utils/FontFamily";
import AppColor from "../../utils/AppColor";
import CustomButton from "../../components/CustomButton";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import DawdleLogo from "../../components/DawdleLogo";
import { showMessage } from "react-native-flash-message";
import { ADD_SUBTASK, UPDATE_TIMER } from "../../api/API_SERVICES";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { BlurView } from "@react-native-community/blur";
import DNDManager from "../../../DNDManager";
import { MaterialIndicator } from "react-native-indicators";

const SubTaskTimer = ({ route }) => {
  const { taskId, userId, name, rewards, comingFrom } = route.params;
  console.log(taskId, userId, name, rewards, comingFrom, "Line 29");

  const [selectedTime, setSelectedTime] = useState("00:00:00");
  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState(null);
  const navigation = useNavigation();
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [loading, setLoading] = useState(false);

  const formatTime = (h, m, s) => {
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    setSelectedTime("00:00:00");
  }, []);

  useFocusEffect(
    useCallback(() => {
      setSelectedTime("00:00:00");
    }, [])
  );

  const handleButtonClicked = () => {
    const selectedTime = formatTime(hours, minutes, seconds);
    console.log("Selected time:", selectedTime);

    const totalTimeInSeconds =
      parseInt(hours || "0", 10) * 3600 +
      parseInt(minutes || "0", 10) * 60 +
      parseInt(seconds || "0", 10);
    setTime(totalTimeInSeconds);
    console.log("Selected time in seconds:", totalTimeInSeconds);
    setShowModal(true);
  };

  const handleModalContinue = async () => {
    if (time <= 0) {
      showMessage({
        type: "danger",
        icon: "danger",
        message: "Please select a valid time greater than 0 seconds.",
      });
      setShowModal(false);
      return;
    }
    setShowModal(false);
    const savedData = await AsyncStorage.getItem("subTaskDetails");
    const parsedSaveData = JSON.parse(savedData);
    console.log(parsedSaveData, "Line 74");
    const updateTimerData = {
      userId: userId,
      taskId: taskId,
      subtaskId: parsedSaveData?._id,
      updatedTimer: time,
    };
    const data = {
      userId: userId,
      taskId: taskId,
      name: name,
      rewards: rewards,
      timer: time,
    };
    try {
      setLoading(true);
      console.log(data, "line 94");
      let response;
      if (comingFrom === "home") {
        console.log("home");
        response = await UPDATE_TIMER(updateTimerData);
        console.log(response, "Line 94");
      } else {
        response = await ADD_SUBTASK(data);
      }
      if (response.status === true) {
        console.log("jii");
        if (comingFrom !== "home") {
          const subtasks = response?.data?.subtasks;
          const lastSubtask = subtasks[subtasks.length - 1];
          await AsyncStorage.setItem(
            "subTaskDetails",
            JSON.stringify(lastSubtask)
          );
          if (Platform.OS === "android") {
            const response = DNDManager.enableDND();
            console.log(response, "Line 120");
          }
        }
        setLoading(false);
        navigation.navigate("Home", {
          time: time,
          taskId: taskId,
          subtaskId: parsedSaveData?._id,
        });
      }
    } catch (error) {
      setLoading(false);
      showMessage({
        type: "danger",
        icon: "danger",
        message: "select the timer correctly",
      });
    }
  };

  const renderScrollNumbers = (limit, selectedValue, setValue, label) => {
    return (
      <View style={styles.scrollContainer}>
        <View style={styles.fixedBox} />
        <ScrollView
          horizontal={false}
          showsVerticalScrollIndicator={false}
          snapToInterval={moderateScale(50)}
          decelerationRate="fast"
          onMomentumScrollEnd={(event) => {
            const offsetY = event.nativeEvent.contentOffset.y;
            const selected = Math.round(offsetY / moderateScale(50));
            setValue(selected);
          }}
          contentContainerStyle={{
            paddingVertical: moderateScale(100),
          }}
        >
          {Array.from({ length: limit }, (_, i) => (
            <View key={i} style={styles.scrollItem}>
              <Text
                style={[
                  styles.scrollText,
                  selectedValue === i ? styles.selectedScrollText : null,
                ]}
              >
                {i.toString().padStart(2, "0")}
                {selectedValue === i ? label : null}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={"transparent"}
        translucent={true}
      />
      <View style={styles.gradientContainer}>
        <LinearGradient
          colors={["#FF7E1D", "#FF7E1D"]}
          start={{ x: 0.5, y: 1 }}
          end={{ x: 0.5, y: 0 }}
          style={styles.firstGradient}
        />
        <LinearGradient
          colors={["#D69565", "#161614"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.secondGradient}
        />
      </View>
      <SafeAreaView />
      <View style={styles.logoHolder}>
        {/* <DawdleLogo color={AppColor.white} /> */}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {comingFrom === "home"
            ? `How much time would ${"\n"}you like to add to the${"\n"} timer for the same subtask?`
            : ` How long will it take for you to ${"\n"} complete this subtask?`}
        </Text>
      </View>
      <View style={styles.pickerContainer}>
        {Platform.OS === "ios" ? (
          <>
            <View style={styles.picker}>
              {/* <Text style={styles.label}>Hours</Text> */}
              <Picker
                selectedValue={hours}
                onValueChange={(itemValue) => setHours(itemValue)}
                style={styles.pickerStyle}
                itemStyle={styles.pickerItemStyle}
              >
                {Array.from({ length: 24 }, (_, i) => (
                  <Picker.Item
                    key={i}
                    label={`${i === hours ? `${i} H` : i}`}
                    value={i}
                    color={
                      Platform.OS === "android"
                        ? AppColor.black
                        : AppColor.white
                    }
                    fontFamily={FontFamily.Inter_SemiBold}
                  />
                ))}
              </Picker>
            </View>

            <View style={styles.picker}>
              {/* <Text style={styles.label}>Minutes</Text> */}
              <Picker
                selectedValue={minutes}
                onValueChange={(itemValue) => setMinutes(itemValue)}
                style={styles.pickerStyle}
                itemStyle={styles.pickerItemStyle}
              >
                {Array.from({ length: 60 }, (_, i) => (
                  <Picker.Item
                    key={i}
                    label={`${i === minutes ? `${i} M` : i}`}
                    value={i}
                    color={
                      Platform.OS === "android"
                        ? AppColor.black
                        : AppColor.white
                    }
                    fontFamily={FontFamily.Inter_SemiBold}
                  />
                ))}
              </Picker>
            </View>

            <View style={styles.picker}>
              {/* <Text style={styles.label}>Seconds</Text> */}
              <Picker
                selectedValue={seconds}
                onValueChange={(itemValue) => setSeconds(itemValue)}
                style={styles.pickerStyle}
                itemStyle={styles.pickerItemStyle}
              >
                {Array.from({ length: 60 }, (_, i) => (
                  <Picker.Item
                    key={i}
                    label={`${i === seconds ? `${i} S` : i}`}
                    value={i}
                    color={i === seconds ? AppColor.white : AppColor.textGray}
                    // fontFamily={i === seconds ?"800":"600"}
                  />
                ))}
              </Picker>
            </View>
          </>
        ) : (
          <View style={styles.pickerContainer2}>
            <View style={styles.scrollSection}>
              {/* <Text style={styles.label}>Hours</Text> */}
              {renderScrollNumbers(24, hours, setHours, "H")}
            </View>
            {/* <Text style={styles.colon}>:</Text> */}
            <View style={styles.scrollSection}>
              {/* <Text style={styles.label}>Minutes</Text> */}
              {renderScrollNumbers(60, minutes, setMinutes, "M")}
            </View>
            {/* <Text style={styles.colon}>:</Text> */}
            <View style={styles.scrollSection}>
              {/* <Text style={styles.label}>Seconds</Text> */}
              {renderScrollNumbers(60, seconds, setSeconds, "S")}
            </View>
          </View>
        )}
      </View>
      <View style={styles.buttonHolder}>
        <CustomButton
          title={"START THE TIMER"}
          handleAction={handleButtonClicked}
        />
      </View>

      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <BlurView
            style={StyleSheet.absoluteFillObject}
            blurType="dark"
            blurAmount={1}
            reducedTransparencyFallbackColor="#ffffff"
          />
          <View style={styles.modalPicker}>
            <Text style={styles.modalText1}>Attention</Text>
            <Text style={styles.modalText}>
              {Platform.OS === "android"
                ? "For the duration of the subtask, your notifications will be disabled. We highly recommend placing your device in another room to minimize distractions, if you don’t need your device for the subtask."
                : `For the duration of the timer,${"\n"} we highly recommend placing your device in another room to minimize distractions, if possible.`}
            </Text>
            <View style={{ width: "70%" }}>
              <CustomButton
                title={"CONTINUE"}
                handleAction={handleModalContinue}
              />
            </View>
          </View>
        </View>
      </Modal>
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
    </>
  );
};

export default SubTaskTimer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    marginVertical: moderateScaleVertical(60),
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    // fontFamily: FontFamily.Inter_Regular,
    fontSize: textScale(15),
    textAlign: "center",
    color: AppColor.white,
    width: "80%",
    lineHeight: moderateScale(25),
    marginBottom: moderateScale(10),
    fontWeight: "500",
  },
  scrollContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: moderateScaleVertical(50),
  },
  timeSegmentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  scrollView: {
    height: moderateScaleVertical(200),
    width: moderateScale(100),
  },
  timeText: {
    fontFamily: FontFamily.Inter_Regular,
    fontSize: textScale(18),
    color: AppColor.white,
    textAlign: "center",
    lineHeight: moderateScale(45),
  },
  colon: {
    fontFamily: FontFamily.Inter_Regular,
    fontSize: textScale(18),
    color: AppColor.white,
    textAlign: "center",
    lineHeight: moderateScale(45),
  },
  buttonHolder: {
    width: "80%",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    bottom: moderateScale(50),
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalText: {
    fontFamily: FontFamily.Inter_Regular,
    color: AppColor.buttonBack1,
    fontSize: textScale(13),
    textAlign: "center",
    lineHeight: scale(27.4),
    fontWeight: "400",
    width: "90%",
  },
  modalText1: {
    fontFamily: FontFamily.Inter_Regular,
    textAlign: "center",
    color: AppColor.primary,
    fontSize: textScale(20),
    fontWeight: "400",
  },
  modalPicker: {
    borderWidth: 2,
    borderColor: AppColor.white,
    width: "90%",
    padding: moderateScale(10),
    backgroundColor: AppColor.white,
    borderRadius: moderateScale(10),
    alignItems: "center",
    justifyContent: "center",
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
  gradientContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  firstGradient: {
    flex: 1,
    position: "absolute",
    ...StyleSheet.absoluteFillObject,
  },
  secondGradient: {
    flex: 1,
    position: "absolute",
    ...StyleSheet.absoluteFillObject,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    justifyContent: "space-around",
    width: "80%",
    alignSelf: "center",
  },
  picker: {
    flex: 1,
    justifyContent: "center",
  },
  label: {
    fontSize: textScale(18),
    color: AppColor.white,
    textAlign: "center",
    fontFamily: FontFamily.Inter_Medium,
    fontWeight: "500",
  },
  pickerStyle: {
    width: "118%",
  },
  pickerItemStyle: {
    // fontSize: textScale(18),
    // fontFamily: FontFamily.Inter_SemiBold,
    // color: AppColor.white,
    // textAlign: "center",
  },
  pickerContainer2: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -moderateScale(100),
    marginBottom: moderateScaleVertical(100),
    width: "100%",
    height: "60%",
  },
  scrollSection: {
    alignItems: "center",
    marginHorizontal: moderateScale(10),
  },
  fixedBox: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    height: moderateScale(50),
    width: "100%",
    marginTop: -moderateScale(25),
    borderColor: AppColor.white,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderRadius: moderateScale(5),
    zIndex: 1,
  },
  scrollItem: {
    width: moderateScale(50),
    height: moderateScale(50),
    justifyContent: "center",
    alignItems: "center",
  },
  scrollText: {
    fontSize: textScale(16),
    fontFamily: FontFamily.Inter_Regular,
    color: AppColor.white,
    opacity: 0.5,
  },
  selectedScrollText: {
    fontFamily: FontFamily.Inter_Bold,
    color: AppColor.white,
    opacity: 1,
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
