import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { ImagePath } from "../../utils/ImagePath";
import AppColor from "../../utils/AppColor";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "../../utils/ResponsiveSize";
import FontFamily from "../../utils/FontFamily";
import CustomButton from "../../components/CustomButton";
import CustomButtonInactive from "../../components/CustomButtonInactive";
import { useNavigation } from "@react-navigation/native";
import DawdleLogo from "../../components/DawdleLogo";

const CreateNewSubTask = ({ route }) => {
  const { taskId, subtaskId } = route.params;
  console.log(taskId,subtaskId, "Line 18");
  const navigation = useNavigation();

  const handleNoClicked = async () => {
    navigation.navigate("SubTaskConfirmation", {
      taskId: taskId,
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
      <View style={styles.logoHolder}>
        <DawdleLogo color={AppColor.white} />
      </View>
      <View style={styles.backgroundHolder}>
        <Image
          source={ImagePath.bg2}
          resizeMode="stretch"
          style={{ width: "100%", height: "100%" }}
        />
      </View>

      <View style={styles.message}>
        <Text style={[styles.quoteText,{fontSize:textScale(16),fontFamily:'500',color:AppColor.buttonBack1}]}>
          Were you able to complete{"\n"}the subtask?
        </Text>
        <View style={styles.buttonHolder}>
          <View style={{ width: "45%" }}>
            <CustomButton
              title={"YES"}
              handleAction={() =>
                navigation.navigate("Rating", {
                  taskId: taskId,
                  subtaskId: subtaskId,
                })
              }
            />
          </View>
          <View style={{ width: "45%" }}>
            <CustomButtonInactive title={"NO"} handleAction={handleNoClicked} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CreateNewSubTask;

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
    height: "70%",
  },
  quoteText: {
    fontSize: textScale(21),
    // fontFamily: FontFamily.Inter_Medium,
    color: AppColor.buttonBack1,
    textAlign: "center",
    fontWeight: "400",
  },
  messageHolder: {
    lineHeight: textScale(22),
    fontFamily: FontFamily.Inter_SemiBold,
    color: AppColor.primary,
    fontSize: textScale(22),
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
  logoHolder: {
    flexDirection: "row",
    marginTop:
      Platform.OS === "android" ? moderateScaleVertical(50) : moderateScale(15),
    height: moderateScale(40),
    alignItems: "center",
    paddingHorizontal: moderateScale(10),
  },
});
