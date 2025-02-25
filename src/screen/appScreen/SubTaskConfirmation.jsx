import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
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
import CustomButton from "../../components/CustomButton";
import CustomButtonInactive from "../../components/CustomButtonInactive";
import { useNavigation } from "@react-navigation/native";
import DawdleLogo from "../../components/DawdleLogo";
import AsyncStorage from "@react-native-async-storage/async-storage";

const quotes = [
  { text: "Believe you can, and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Do not wait to strike till the iron is hot; but make it hot by striking.", author: "William Butler Yeats" },
  { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
  { text: "It does not matter how slowly you go, as long as you do not stop.", author: "Confucius" },
  { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
  { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
  { text: "Keep your face always toward the sunshine—and shadows will fall behind you.", author: "Walt Whitman" },
  { text: "Your present circumstances don’t determine where you can go; they merely determine where you start.", author: "Nido Qubein" },
  { text: "You are braver than you believe, stronger than you seem, and smarter than you think.", author: "A.A. Milne" },
  { text: "Hardships often prepare ordinary people for an extraordinary destiny.", author: "C.S. Lewis" },
  { text: "Don’t watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "When you feel like giving up, remember why you started.", author: "Unknown" },
  { text: "Courage doesn’t always roar. Sometimes courage is the quiet voice at the end of the day saying, 'I will try again tomorrow.'", author: "Mary Anne Radmacher" },
  { text: "Success is stumbling from failure to failure with no loss of enthusiasm.", author: "Winston Churchill" },
  { text: "A winner is a dreamer who never gives up.", author: "Nelson Mandela" },
  { text: "Everything you’ve ever wanted is on the other side of fear.", author: "George Addair" },
  { text: "Failure is simply the opportunity to begin again, this time more intelligently.", author: "Henry Ford" },
  { text: "It always seems impossible until it’s done.", author: "Nelson Mandela" },
  { text: "Life isn’t about waiting for the storm to pass; it’s about learning to dance in the rain.", author: "Vivian Greene" },
  { text: "Perseverance is not a long race; it is many short races one after the other.", author: "Walter Elliot" },
  { text: "Rise above the storm, and you will find the sunshine.", author: "Mario Fernández" },
  { text: "Strength doesn’t come from what you can do. It comes from overcoming the things you once thought you couldn’t.", author: "Rikki Rogers" },
  { text: "Opportunities don’t happen. You create them.", author: "Chris Grosser" },
  { text: "Don’t be afraid to give up the good to go for the great.", author: "John D. Rockefeller" },
  { text: "Sometimes we’re tested not to show our weaknesses, but to discover our strengths.", author: "Unknown" },
  { text: "Dream big and dare to fail.", author: "Norman Vaughan" },
  { text: "The struggle you’re in today is developing the strength you need for tomorrow.", author: "Robert Tew" },
];

const SubTaskConfirmation = ({ route }) => {
  const { taskId, comingFrom } = route.params;
  const [quote, setQuote] = useState({});
  console.log(taskId, comingFrom, "Line 26kjdf");
  const navigation = useNavigation();

  const [id, setId] = useState();
  const [name, setName] = useState();
  const [reward, setReward] = useState();
  const [subtaskId,setSubtaskId] = useState();
  useEffect(() => {
    fetchUserData();
    fetchRandomQuote();
  }, []);

  const fetchUserData = async () => {
    const userData = await AsyncStorage.getItem("userData");
    const res = JSON.parse(userData);
    setId(res?.data?._id);
    const subTaskDetails = await AsyncStorage.getItem("subTaskDetails");
    const subTaskResponse = JSON.parse(subTaskDetails);
    console.log(subTaskDetails, "Line 49");
    setName(subTaskResponse?.name);
    setReward(subTaskResponse?.rewards);
    setSubtaskId(subTaskResponse?._id)
  };

  const fetchRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
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
      <View
        style={{
          marginTop: moderateScaleVertical(75),
          marginHorizontal: moderateScale(25),
          gap: moderateScaleVertical(25),
        }}
      >
        <Image
          source={ImagePath.quote}
          resizeMode="contain"
          style={{ width: moderateScale(47), height: moderateScale(38) }}
        />
        <Text style={styles.quoteText}>{quote.text}</Text>
        <Text style={styles.quoteText}>– {quote.author}</Text>
      </View>
      <View
        style={{
          marginVertical: "50%",
          alignItems: "center",
          gap: moderateScaleVertical(15),
          width: "95%",
          alignSelf: "center",
        }}
      >
        <Text style={[styles.quoteText, { lineHeight: textScale(22),fontSize:textScale(13) }]}>
          Would you like to add time to the timer and {"\n"}continue working on
          the subtask?
        </Text>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            marginVertical: moderateScaleVertical(10),
          }}
        >
          <View style={{ width: "45%" }}>
            <CustomButton
              title={"YES"}
              handleAction={() =>
                navigation.navigate("SubTaskTimer", {
                  taskId: taskId,
                  userId: id,
                  name: name,
                  rewards: reward,
                  comingFrom: comingFrom,
                })
              }
            />
          </View>
          <View style={{ width: "45%" }}>
            <CustomButtonInactive
              title={"NO"}
              handleAction={() => navigation.navigate('Rating',{taskId:taskId,subtaskId:subtaskId})}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default SubTaskConfirmation;

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
  subHeadText: {
    fontFamily: FontFamily.Inter_Bold,
    fontSize: textScale(24),
    color: AppColor.primary,
    textAlign: "center",
  },
  buttonHolder: {
    width: "80%",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    bottom: moderateScale(50),
  },
  text: {
    fontFamily: FontFamily.Inter_Light,
    fontSize: textScale(13),
    color: AppColor.buttonBack1,
    marginTop: "10%",
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
    fontSize: textScale(16),
    color: AppColor.black,
  },
  contentHolder: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: moderateScaleVertical(10),
    gap: moderateScaleVertical(10),
  },
  quoteText: {
    fontSize: textScale(13),
    // fontFamily: FontFamily.Inter_Medium,
    color: AppColor.buttonBack1,
    textAlign: "center",
    fontWeight: "400",
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
