import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ImagePath } from "../../utils/ImagePath";
import AppColor from "../../utils/AppColor";
import {
  moderateScale,
  moderateScaleVertical,
  scale,
  textScale,
} from "../../utils/ResponsiveSize";
import FontFamily from "../../utils/FontFamily";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import DawdleLogo from "../../components/DawdleLogo";
import CircularProgress from "react-native-circular-progress-indicator";
import CustomButton from "../../components/CustomButton";

const Congratulation = ({ route }) => {
  const [progress, setProgress] = useState(0);
  const { taskId, subtaskId ,comingFrom} = route.params;
  console.log(comingFrom,"Line 23")
  const navigation = useNavigation();
 
  const handleNextClicked = () =>{
    if(comingFrom==='Already_finished'){
      navigation.replace("Rating",{taskId:taskId,subtaskId:subtaskId})
    }
    else{
      navigation.replace("CreateNewSubTask",{taskId:taskId,subtaskId:subtaskId});
    }
   
  }

  useEffect(() => {
    // Animate the progress to 100 over 2.8 seconds
    let interval = null;
    const startAnimation = () => {
      let currentProgress = 0;
      interval = setInterval(() => {
        currentProgress += 1;
        setProgress(currentProgress);

        if (currentProgress >= 100) {
          clearInterval(interval);
        }
      }, 1500 / 100);
    };
    startAnimation();
    return () => clearInterval(interval);
  }, []);


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
      <View style={styles.contentHolder}>
        <View style={styles.circularProgressContainer}>
          <CircularProgress
           value={progress}
            radius={100}
            activeStrokeWidth={15}
            inActiveStrokeWidth={10}
            activeStrokeColor={AppColor.primary}
            inActiveStrokeColor={AppColor.primary}
            inActiveStrokeOpacity={0.2}
            showProgressValue={false}
          />
          {/* <Feather
            name="check"
            size={textScale(80)}
            color={AppColor.primary}
            style={styles.iconCentered}
          /> */}
          <Image
          source={ImagePath.checked}
          resizeMode="contain"
          style={{width:moderateScale(90),position:'absolute'}}
          />
        </View>
      </View>
      <View style={styles.message}>
        <Text style={styles.messageHolder}>Congratulations!</Text>
        <Text style={styles.quoteText}>
          You successfully focused for the duration of your timer!
        </Text>
      </View>
      <View style={styles.buttonHolder}>
        <CustomButton title={"Next"} handleAction={handleNextClicked} />
      </View>
    </View>
  );
};

export default Congratulation;

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
    height: "65%",
  },
  quoteText: {
    fontSize: textScale(13),
    width:moderateScale(274),
    fontFamily: FontFamily.Inter_Medium,
    color: AppColor.textGray,
    textAlign: "center",
    fontWeight: "500",
    lineHeight:scale(22)
  },
  messageHolder: {
    lineHeight: textScale(22),
    fontFamily: FontFamily.Inter_SemiBold,
    color: AppColor.primary,
    fontSize: textScale(21),
    fontWeight: "500",
  },
  contentHolder: {
    marginTop: moderateScaleVertical(75),
    alignItems: "center",
    alignSelf: "center",
    gap: moderateScaleVertical(25),
  },
  message: {
    marginVertical: "30%",
    alignItems: "center",
    gap: moderateScaleVertical(90),
    width: "80%",
    alignSelf: "center",
  },
  logoHolder: {
    flexDirection: "row",
    marginTop:
      Platform.OS === "android" ? moderateScaleVertical(50) : moderateScale(15),
    height: moderateScale(40),
    alignItems: "center",
    paddingHorizontal: moderateScale(10),
  },
  circularProgressContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  iconCentered: {
    position: "absolute",
  },
  buttonHolder: {
    width: "80%",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    bottom: '4%',
  },
});
