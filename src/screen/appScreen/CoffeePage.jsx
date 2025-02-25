import {
  Image,
  Platform,
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
  textScale,
} from "../../utils/ResponsiveSize";
import FontFamily from "../../utils/FontFamily";
import { useNavigation } from "@react-navigation/native";
import DawdleLogo from "../../components/DawdleLogo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "../../components/CustomButton";

const CoffeePage = () => {
  const navigation = useNavigation();
  const [reward,setReward] = useState();


  // useEffect(() => {
  //   fetchReward();
  //   const timer = setTimeout(() => {
  //     navigation.replace("Feedback");
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, [navigation]);
  const handleNextClicked = () =>{
    navigation.replace("Feedback");
  }

  useEffect(()=>{
    fetchReward();
  },[navigation])

  const fetchReward = async () => {
    console.log("hii")
    const data = await AsyncStorage.getItem("reward");
    console.log("hii2",data);
    setReward(data)
    
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
          Awesome!{"\n"} It’s time for your reward:
        </Text>
      </View>
      <View style={{ marginTop: "60%", zIndex: 1, alignItems: "center" }}>
        <Text style={styles.secondaryText}>{reward}</Text>
      </View>
      {/* <View style={{ marginTop: "60%", zIndex: 1, alignItems: "center" }}>
        <Text style={styles.buttonText}>
          Screen will automatically advance to the homepage
        </Text>
      </View> */}
       <View style={styles.buttonHolder}>
        <CustomButton title={"Next"} handleAction={handleNextClicked} />
      </View>
      <View style={styles.backgroundHolder}>
        <Image
          source={ImagePath.bg2}
          resizeMode="stretch"
          style={{ width: "100%", height: "100%" }}
        />
      </View>
    </View>
  );
};

export default CoffeePage;

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
    height: "75%",
  },
  quoteText: {
    fontSize: textScale(21),
    // fontFamily: FontFamily.Inter_Medium,
    color: AppColor.black,
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
    width: "80%",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    bottom: moderateScale(50),
    zIndex:1
  },
  textHolder: {
    width: "90%",
    alignSelf: "center",
    marginTop: Platform.OS==='ios'?'15%':'20%',
  },
  secondaryText: {
    fontFamily: FontFamily.Inter_Bold,
    fontSize: textScale(21),
    color: AppColor.primary,
    textAlign: "center",
    fontWeight: "600",
  },
  buttonText: {
    fontFamily: FontFamily.Inter_Regular,
    fontSize: textScale(13),
    color: AppColor.textGray,
    fontWeight: "400",
    width:'90%',
    textAlign: "center",
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
