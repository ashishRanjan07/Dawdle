import React, { useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  Platform,
  AppState
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { ImagePath } from "../../utils/ImagePath";
import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from "../../utils/ResponsiveSize";
import AppColor from "../../utils/AppColor";
import CustomButton from "../../components/CustomButton";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import DNDManager from "../../../DNDManager";

const images = [
  ImagePath.banner1,
  ImagePath.banner2,
  ImagePath.banner3,
  ImagePath.banner4,
  ImagePath.banner5,
];

const Home = ({ route }) => {
  const { time, taskId, subtaskId } = route.params;

  const [remainingTime, setRemainingTime] = useState(time);
  const translateX = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(0)).current;
  const [duration, setDuration] = useState(time * 1000);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [currentImages, setCurrentImages] = useState(images.slice(0, 3));
  const [currentIndex, setCurrentIndex] = useState(3);
  const timerStartTime = useRef(Date.now());
  const appState = useRef(AppState.currentState);

  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: duration,
      useNativeDriver: false,
    }).start();

    const progressListener = progress.addListener(({ value }) => {
      if (value === 1 && !buttonClicked) {
        if (Platform.OS === "android") {
          DNDManager.disableDND();
        }
        navigation.navigate("Congratulation", {
          taskId: taskId,
          subtaskId: subtaskId,
          comingFrom: "Automatically_Redirect",
        });
      }
    });

    return () => progress.removeListener(progressListener);
  }, [duration, buttonClicked]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(interval);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   const calculateInterval = () => {
  //     if (time <= 60) {
  //       return 6000;
  //     } else {
  //       return (time * 1000) / 10;
  //     }
  //   };

  //   const updateInterval = calculateInterval();

  //   const interval = setInterval(() => {
  //     Animated.timing(translateX, {
  //       toValue: -width,
  //       duration: 900,
  //       useNativeDriver: true,
  //     }).start(() => {
  //       translateX.setValue(0);

  //       setCurrentImages((prevImages) => {
  //         const updatedImages = [...prevImages];
  //         updatedImages.pop();
  //         updatedImages.unshift(images[currentIndex % images.length]);
  //         setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);

  //         return updatedImages;
  //       });
  //     });
  //   }, updateInterval);

  //   return () => clearInterval(interval);
  // }, [translateX, currentIndex, time]);

  // const handleButtonPress = () => {
  //   setButtonClicked(true);
  //   if (Platform.OS === "android") {
  //     DNDManager.disableDND();
  //   }
  //   navigation.navigate("Congratulation", {
  //     taskId: taskId,
  //     subtaskId: subtaskId,
  //     comingFrom: "Already_finished",
  //   });
  // };

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  // const formattedTime = () => {
  //   const hours = Math.floor(remainingTime / 3600);
  //   const minutes = Math.floor((remainingTime % 3600) / 60);
  //   const seconds = remainingTime % 60;

  //   return `${hours}h ${minutes}m ${seconds}s`;
  // };

  useEffect(() => {
    timerStartTime.current = Date.now();

    const timerInterval = setInterval(() => {
      setRemainingTime((prevTime) => {
        const elapsedTime = Math.floor((Date.now() - timerStartTime.current) / 1000);
        return Math.max(time - elapsedTime, 0);
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [time]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === "active") {
        const elapsedTime = Math.floor((Date.now() - timerStartTime.current) / 1000);
        setRemainingTime(Math.max(time - elapsedTime, 0));
      }
      appState.current = nextAppState;
    });

    return () => subscription.remove();
  }, [time]);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: time * 1000,
      useNativeDriver: false,
    }).start();

    const progressListener = progress.addListener(({ value }) => {
      if (value === 1 && !buttonClicked) {
        if (Platform.OS === "android") {
          DNDManager.disableDND();
        }
        navigation.navigate("Congratulation", {
          taskId: taskId,
          subtaskId: subtaskId,
          comingFrom: "Automatically_Redirect",
        });
      }
    });

    return () => progress.removeListener(progressListener);
  }, [time, buttonClicked]);

  useEffect(() => {
    const calculateInterval = () => (time <= 60 ? 6000 : (time * 1000) / 10);

    const updateInterval = calculateInterval();

    const interval = setInterval(() => {
      Animated.timing(translateX, {
        toValue: -width,
        duration: 900,
        useNativeDriver: true,
      }).start(() => {
        translateX.setValue(0);
        setCurrentImages((prevImages) => {
          const updatedImages = [...prevImages];
          updatedImages.pop();
          updatedImages.unshift(images[currentIndex % images.length]);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
          return updatedImages;
        });
      });
    }, updateInterval);

    return () => clearInterval(interval);
  }, [translateX, currentIndex, time]);

  const handleButtonPress = () => {
    setButtonClicked(true);
    if (Platform.OS === "android") {
      DNDManager.disableDND();
    }
    navigation.navigate("Congratulation", {
      taskId: taskId,
      subtaskId: subtaskId,
      comingFrom: "Already_finished",
    });
  };

  const formattedTime = () => {
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };



  return (
    <>
      <LinearGradient
        colors={["#D69565", "#161614"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.secondGradient}
      >
        <View style={styles.cardStack}>
          {currentImages.map((image, index) => {
            const isLastImage = index === currentImages.length - 1;
            const rotation = (index - 1) * 3.0;
            const topOffset = index * 0.1;

            return (
              <Animated.View
                key={index}
                style={[
                  styles.card,
                  {
                    top: topOffset,
                    transform: [
                      { translateX: isLastImage ? translateX : 0 },
                      { rotate: `${rotation}deg` },
                    ],
                    opacity: isLastImage ? 1 : 0.9,
                  },
                ]}
              >
                <Image
                  source={image}
                  style={styles.cardImage}
                  resizeMode="contain"
                />
              </Animated.View>
            );
          })}
        </View>
        <View style={styles.contentHolder}>
          <View style={styles.progressBarContainer}>
            <Animated.View
              style={[styles.progressBar, { width: progressWidth }]}
            />
          </View>
          <View style={styles.textHolder}>
            <Text style={[styles.quoteText, { fontSize: textScale(13) }]}>
              {formattedTime()} left
            </Text>
          </View>
          <View style={styles.buttonHolder}>
            <CustomButton
              title={"I’VE FINISHED THE TASK EARLY"}
              handleAction={handleButtonPress}
            />
          </View>
        </View>
      </LinearGradient>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  secondGradient: {
    flex: 1,
    position: "absolute",
    ...StyleSheet.absoluteFillObject,
  },
  cardStack: {
    marginTop: moderateScaleVertical(80),
    width: width,
    height: "58%",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  card: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 20,
    overflow: "hidden",
    // shadowColor: AppColor.textGray,
    // shadowOffset: { width: 0, height: 5 },
    shadowRadius: 8,
    // elevation: 4,
    // borderWidth:2,
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    width: "100%",
    zIndex: 1,
    position: "absolute",
    bottom: 0,
    padding: moderateScale(10),
    gap: moderateScaleVertical(5),
  },
  quoteText: {
    fontSize: textScale(21),
    // backgroundColor:AppColor.borderColor2,
    // fontFamily: FontFamily.Inter_Medium,
    paddingLeft: moderateScale(5),
    color: AppColor.white,
    fontWeight: "500",
    width: "100%",
  },
  imageHolder: {
    position: "absolute",
    marginTop:
      Platform.OS === "ios"
        ? moderateScaleVertical(70)
        : moderateScaleVertical(20),
  },
  image: {
    width: moderateScale(39),
    height: moderateScale(31),
  },
  progressBarContainer: {
    width: "90%",
    height: moderateScale(14),
    backgroundColor: "#745A47",
    borderRadius: moderateScaleVertical(10),
    overflow: "hidden",
    alignSelf: "center",
    marginVertical: 10,
    borderWidth: 2,
    borderColor: "#745A47",
  },
  progressBar: {
    height: "100%",
    backgroundColor: AppColor.white,
    borderColor: AppColor.white,
  },
  contentHolder: {
    marginTop: "20%",
  },
  textHolder: {
    width: "90%",
    alignSelf: "center",
  },
  buttonHolder: {
    width: "80%",
    alignSelf: "center",
    alignItems: "center",
    marginTop: moderateScaleVertical(20),
  },
  authorText: {
    fontSize: textScale(20),
    color: AppColor.white,
    fontWeight: "500",
  },
});
