import {
    StyleSheet,
    Text,
    StatusBar,
    View,
    Platform,
    Modal,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
  } from "react-native";
  import React, { useState } from "react";
  import LinearGradient from "react-native-linear-gradient";
  import {
    moderateScale,
    moderateScaleVertical,
    scale,
    textScale,
  } from "./src/utils/ResponsiveSize";
  import AppColor from "./src/utils/AppColor";
  import FontFamily from "./src/utils/FontFamily";
  import CustomButton from "./src/components/CustomButton";
  
  const Dummy = () => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [showModal, setShowModal] = useState(false);
  
    const formatTime = (h, m, s) =>
      `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s
        .toString()
        .padStart(2, "0")}`;
  
    const handleStartTimer = () => {
      const selectedTime = formatTime(hours, minutes, seconds);
      console.log("Selected Time:", selectedTime);
      setShowModal(true);
    };
  
    // const renderScrollNumbers = (limit, selectedValue, setValue) => {
    //   return (
    //     <View style={styles.scrollWrapper}>
    //       <ScrollView
    //         horizontal={false}
    //         showsVerticalScrollIndicator={false}
    //         snapToInterval={moderateScale(50)}
    //         decelerationRate="fast"
    //         onMomentumScrollEnd={(event) => {
    //           const offsetY = event.nativeEvent.contentOffset.y;
    //           const selected = Math.round(offsetY / moderateScale(50));
    //           setValue(selected);
    //         }}
    //         contentContainerStyle={{ paddingVertical: moderateScale(150) }} // Padding to center the list
    //       >
    //         {Array.from({ length: limit }, (_, i) => (
    //           <View key={i} style={styles.scrollItem}>
    //             <Text
    //               style={[
    //                 styles.scrollText,
    //                 selectedValue === i ? styles.selectedScrollText : null,
    //               ]}
    //             >
    //               {i.toString().padStart(2, "0")}
    //             </Text>
    //           </View>
    //         ))}
    //       </ScrollView>
    //       <View style={styles.fixedCenterBox} />
    //     </View>
    //   );
    // };
  

    const renderScrollNumbers = (limit, selectedValue, setValue) => {
        return (
          <View style={styles.scrollContainer}>
            <View style={styles.fixedBox} /> 
            <ScrollView
              horizontal={false}
              showsVerticalScrollIndicator={false}
              snapToInterval={moderateScale(50)} // Ensures snapping to each value
              decelerationRate="fast"
              onMomentumScrollEnd={(event) => {
                const offsetY = event.nativeEvent.contentOffset.y;
                const selected = Math.round(offsetY / moderateScale(50)); // Calculate the selected value
                setValue(selected); // Update the state
              }}
              contentContainerStyle={{
                paddingVertical: moderateScale(100), // Align items with the fixed box
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
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        );
      };

      
    return (
      <>
        <StatusBar backgroundColor="#FF7E1D" barStyle="light-content" />
        <SafeAreaView style={{ flex: 1, backgroundColor: "red" }}>
          <View style={styles.gradientContainer}>
            <LinearGradient
              colors={["#FF7E1D", "#FF7E1D"]}
              style={styles.firstGradient}
            />
            <LinearGradient
              colors={["#D69565", "#161614"]}
              style={styles.secondGradient}
            />
          </View>
  
          <View style={styles.container}>
            <View style={styles.textContainer}>
              <Text style={styles.heading}>
                How long will it take for you to complete this subtask?
              </Text>
            </View>
  
            <View style={styles.pickerContainer}>
              <View style={styles.scrollSection}>
                <Text style={styles.label}>Hours</Text>
                {renderScrollNumbers(24, hours, setHours)}
              </View>
              <Text style={styles.colon}>:</Text>
              <View style={styles.scrollSection}>
                <Text style={styles.label}>Minutes</Text>
                {renderScrollNumbers(60, minutes, setMinutes)}
              </View>
              <Text style={styles.colon}>:</Text>
              <View style={styles.scrollSection}>
                <Text style={styles.label}>Seconds</Text>
                {renderScrollNumbers(60, seconds, setSeconds)}
              </View>
            </View>
  
            <View style={styles.buttonHolder}>
              <CustomButton
                title="START THE TIMER"
                handleAction={()=> console.log(hours,minutes,seconds,"Line 116")}
              />
            </View>
          </View>
  
          <Modal
            visible={showModal}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setShowModal(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalPicker}>
                <Text style={styles.modalTitle}>Attention</Text>
                <Text style={styles.modalText}>
                  For the duration of the subtask, your notifications will be
                  disabled. We recommend placing your device in another room to
                  minimize distractions.
                </Text>
                <CustomButton
                  title="CONTINUE"
                  handleAction={() => setShowModal(false)}
                />
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      </>
    );
  };
  
  export default Dummy;
  
  const styles = StyleSheet.create({
    gradientContainer: {
      ...StyleSheet.absoluteFillObject,
    },
    firstGradient: {
      flex: 1,
      position: "absolute",
    },
    secondGradient: {
      flex: 1,
      position: "absolute",
    },
    container: {
      flex: 1,
      justifyContent: "center",
    },
    textContainer: {
      alignItems: "center",
      marginBottom: moderateScaleVertical(20),
    },
    heading: {
      fontSize: textScale(16),
      fontFamily: FontFamily.Inter_SemiBold,
      color: AppColor.white,
      textAlign: "center",
    },
    pickerContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: moderateScaleVertical(40),
    },
    scrollSection: {
      alignItems: "center",
      marginHorizontal: moderateScale(10),
      position: "relative",
    },
    scrollWrapper: {
      height: moderateScale(150),
      width: moderateScale(50),
      overflow: "hidden",
    },
    scrollItem: {
      height: moderateScale(50),
      justifyContent: "center",
      alignItems: "center",
    },
    fixedCenterBox: {
      position: "absolute",
      top: "50%",
      transform: [{ translateY: -moderateScale(25) }],
      height: moderateScale(50),
      width: "100%",
      borderColor: AppColor.white,
      borderWidth: 2,
      borderRadius: moderateScale(5),
    },
    scrollText: {
      fontSize: textScale(16),
      fontFamily: FontFamily.Inter_Regular,
      color: AppColor.white,
    },
    selectedScrollText: {
      fontFamily: FontFamily.Inter_Bold,
      color: AppColor.primary,
    },
    colon: {
      fontSize: textScale(16),
      fontFamily: FontFamily.Inter_SemiBold,
      color: AppColor.white,
      marginHorizontal: moderateScale(5),
    },
    buttonHolder: {
      alignSelf: "center",
      marginTop: moderateScaleVertical(30),
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalPicker: {
      backgroundColor: AppColor.white,
      padding: moderateScale(20),
      borderRadius: moderateScale(10),
      alignItems: "center",
      width: "85%",
    },
    modalTitle: {
      fontSize: textScale(18),
      fontFamily: FontFamily.Inter_Bold,
      color: AppColor.primary,
      marginBottom: moderateScale(10),
    },
    modalText: {
      fontSize: textScale(14),
      fontFamily: FontFamily.Inter_Regular,
      color: AppColor.black,
      textAlign: "center",
      marginBottom: moderateScale(20),
    },
    scrollContainer: {
        position: "relative",
        width: moderateScale(50),
        height: moderateScale(150), // Height of the entire scroll section
        overflow: "hidden",
      },
      fixedBox: {
        position: "absolute",
        top: "50%",
        left: 0,
        right: 0,
        height: moderateScale(50), // Height of the selected box
        width: "100%",
        marginTop: -moderateScale(25), // Center-align the box
        borderColor: AppColor.white,
        borderWidth: 2,
        borderRadius: moderateScale(5),
        zIndex: 1, // Ensures it stays above the ScrollView
      },
      scrollItem: {
        width: moderateScale(50),
        height: moderateScale(50), // Match snapToInterval
        justifyContent: "center",
        alignItems: "center",
      },
      scrollText: {
        fontSize: textScale(16),
        fontFamily: FontFamily.Inter_Regular,
        color: AppColor.white,
      },
      selectedScrollText: {
        fontFamily: FontFamily.Inter_Bold,
        color: AppColor.primary,
      },
  });
  