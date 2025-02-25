import {
  Alert,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { ImagePath } from "../../../utils/ImagePath";
import {
  moderateScale,
  moderateScaleVertical,
  scale,
  textScale,
} from "../../../utils/ResponsiveSize";
import FontFamily from "../../../utils/FontFamily";
import AppColor from "../../../utils/AppColor";
import CustomButton from "../../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const Priority = () => {
  const navigation = useNavigation();
  return (
    <>
      <LinearGradient
        colors={["#D69565", "#161614"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.secondGradient}
      >
        <StatusBar
          barStyle={"dark-content"}
          backgroundColor={"transparent"}
          translucent={true}
        />
        <SafeAreaView />
        <View
          style={{
            // flex: 1,
            alignItems: "center",
            height:Platform.OS==='android'?'90%':'85%',
          }}
        >
          <View style={{ width: "100%", alignItems: "center",height:'80%' }}>
            <Image
              source={ImagePath.logoWhite}
              resizeMode="contain"
              style={styles.logoHolder}
            />
            <Text style={styles.headerText}>interventions coming soon</Text>
            <View style={styles.container}>
              <Text style={styles.text}>PRIORITY LIST</Text>
              <View style={styles.listView}>
                <Text style={styles.numberText}>1.</Text>
                <View style={styles.line} />
              </View>

              <View style={styles.listView}>
                <Text style={styles.numberText}>2.</Text>
                <View style={styles.line} />
              </View>

              <View style={styles.listView}>
                <Text style={styles.numberText}>3.</Text>
                <View style={styles.line} />
              </View>

              <View style={styles.listView}>
                <Text style={styles.numberText}>4.</Text>
                <View style={styles.line} />
              </View>

              <View style={styles.listView}>
                <Text style={styles.numberText}>5.</Text>
                <View style={styles.line} />
              </View>
              <Text style={styles.comingSoonText}>coming soon</Text>
            </View>
          
          </View>
          <View style={{ width: "80%",height:Platform.OS==='android'?'23%':'18%',alignItems:'center',justifyContent:'center'}}>
              <CustomButton
                title={"I AM DAWDLING RIGHT NOW"}
                handleAction={() => navigation.navigate("Add Task")}
              />
            </View>
        </View>
      </LinearGradient>
    </>
  );
};

export default Priority;

const styles = StyleSheet.create({
  secondGradient: {
    flex: 1,
    position: "absolute",
    ...StyleSheet.absoluteFillObject,
  },
  listView: {
    width: "85%",
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: moderateScaleVertical(15),
    gap: moderateScale(10),
  },
  numberText: {
    fontFamily: FontFamily.Inter_Medium,
    color: AppColor.black,
    fontSize: textScale(21),
    fontWeight: "500",
  },
  line: {
    borderWidth: 1,
    width: "90%",
    height: moderateScale(1),
    borderColor: AppColor.textGray,
    backgroundColor: AppColor.textGray,
  },
  comingSoonText: {
    fontFamily: FontFamily.Inter_Regular,
    color: AppColor.textGray,
    fontSize: textScale(13),
    marginVertical: moderateScaleVertical(15),
  },
  container: {
    borderWidth: 2,
    width: "85%",
    marginTop: moderateScaleVertical(50),
    // height: moderateScale(425),
    borderRadius: moderateScale(10),
    borderColor: AppColor.white,
    backgroundColor: AppColor.white,
    alignItems: "center",
  },
  text: {
    fontFamily: FontFamily.Inter_Medium,
    color: AppColor.primary,
    fontSize: textScale(13),
    fontWeight: "700",
    marginVertical: moderateScaleVertical(15),
  },
  headerText: {
    textTransform: "uppercase",
    fontSize: textScale(15),
    fontFamily: FontFamily.Inter_SemiBold,
    fontWeight: "500",
    color: AppColor.white,
    letterSpacing: scale(1),
    textAlign: "center",
  },
  logoHolder: {
    width: moderateScale(150),
    height: moderateScale(100),
  },
});
