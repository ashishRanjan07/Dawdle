import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { ImagePath } from "../../utils/ImagePath";
import AppColor from "../../utils/AppColor";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "../../utils/ResponsiveSize";
import FontFamily from "../../utils/FontFamily";
import RatingComponent from "../../components/RatingComponent";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import DawdleLogo from "../../components/DawdleLogo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
import { ADD_RATING } from "../../api/API_SERVICES";
import { MaterialIndicator } from "react-native-indicators";

const Rating = ({ route }) => {
  const { taskId, subtaskId } = route.params;
  console.log(subtaskId, "Line 29");
  const navigation = useNavigation();
  const [selections, setSelections] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSelection = (questionKey, selectedValue) => {
    setSelections((prev) => ({
      ...prev,
      [questionKey]: { value: selectedValue },
    }));
  };

  const RatingImage1 = [
    { id: 1, image: ImagePath.r11, value: "Very Easy" },
    { id: 2, image: ImagePath.r12, value: "Easy" },
    { id: 3, image: ImagePath.r13, value: "Medium" },
    { id: 4, image: ImagePath.r14, value: "Hard" },
    { id: 5, image: ImagePath.r15, value: "Very Hard" },
  ];

  const RatingImage2 = [
    { id: 1, image: ImagePath.r21, value: "Very Low" },
    { id: 2, image: ImagePath.r22, value: "Low" },
    { id: 3, image: ImagePath.r23, value: "Moderate" },
    { id: 4, image: ImagePath.r24, value: "High" },
    { id: 5, image: ImagePath.r25, value: "Very High" },
  ];
  const RatingImage3 = [
    {
      id: 1,
      image: ImagePath.r31,
      value: "Very Sad",
      selectedImage: ImagePath.cry,
    },
    { id: 2, image: ImagePath.r32, value: "Sad", selectedImage: ImagePath.sad },
    {
      id: 3,
      image: ImagePath.r33,
      value: "Normal",
      selectedImage: ImagePath.neutral,
    },
    {
      id: 4,
      image: ImagePath.r34,
      value: "Happy",
      selectedImage: ImagePath.happy,
    },
    {
      id: 5,
      image: ImagePath.r35,
      value: "Very Happy",
      selectedImage: ImagePath.smile,
    },
  ];

  const handleSubmit = async () => {
    const requiredKeys = ["difficulty", "effortUsed", "feeling"];
    const allSelected = requiredKeys.every(
      (key) => selections[key] && selections[key].value !== null
    );

    if (!allSelected) {
      showMessage({
        message: "Please make a selection for all questions.",
        type: "warning",
        icon: "warning",
      });
      return;
    }

    try {
      setLoading(true)
      const userData = await AsyncStorage.getItem("userData");
      const res = JSON.parse(userData);
      const formattedFeedback = Object.fromEntries(
        Object.entries(selections).map(([key, { value }]) => [key, value])
      );
      const userSaveData = await AsyncStorage.getItem("subTaskDetails");
      const parsedSavedData = JSON.parse(userSaveData);
      console.log(parsedSavedData, "Line 85");
      const data = {
        userId: res?.data?._id,
        taskId: taskId,
        subtaskId: parsedSavedData?._id,
        feedback: formattedFeedback,
      };

      console.log("Submission Data:", data);

      const response = await ADD_RATING(data);
      console.log("API Response:", response);
      if (response?.status === true) {
        showMessage({
          message: response?.message || "Success",
          type: "success",
          icon: "success",
        });
        setLoading(false)
        navigation.navigate("CoffeePage");
      }
    } catch (error) {
      console.error("Error in submission:", error);
      setLoading(false)
      showMessage({
        message: "An error occurred during submission.",
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
      <View style={styles.textHolder}>
        <Text style={styles.quoteText}>
          Amazing!{"\n"}
          Let’s see some statistics now:
        </Text>
      </View>
      <ScrollView
        style={{
          marginTop: "5%",
          zIndex: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            gap: moderateScaleVertical(25),
            width: "95%",
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          <RatingComponent
            message={"How difficult was it to complete the subtask?"}
            imageArray={RatingImage1}
            onSelect={(id, value) => handleSelection("difficulty", value)}
          />
          <RatingComponent
            message={"How much effort did the subtask take?"}
            imageArray={RatingImage2}
            onSelect={(id, value) => handleSelection("effortUsed", value)}
          />
          <RatingComponent
            message={"How do you feel upon having completed the subtask?"}
            imageArray={RatingImage3}
            onSelect={(id, value) => handleSelection("feeling", value)}
          />
        </View>
        <View style={styles.buttonHolder2}>
          <CustomButton title={"SUBMIT"} handleAction={handleSubmit} />
        </View>
      </ScrollView>
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

export default Rating;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  quoteText: {
    fontSize: textScale(21),
    // fontFamily: FontFamily.Inter_Medium,
    fontWeight: "500",
    color: AppColor.buttonBack1,
    textAlign: "center",
  },
  message: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "30%",
    alignItems: "center",
    gap: moderateScaleVertical(40),
    width: "90%",
    alignSelf: "center",
  },
  buttonHolder: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  textHolder: {
    width: "95%",
    alignSelf: "center",
    marginTop: Platform.OS === "ios" ? "10%" : "20%",
    marginBottom: "5%",
  },
  buttonHolder2: {
    width: "80%",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: "15%",
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
    zIndex:1
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
