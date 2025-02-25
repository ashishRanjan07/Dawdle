import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Priority from "../screen/appScreen/Priority/Priority";
import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "../utils/ResponsiveSize";
import AppColor from "../utils/AppColor";
import Feather from "react-native-vector-icons/Feather";

import { ImagePath } from "../utils/ImagePath";
import FontFamily from "../utils/FontFamily";
import Motivation from "../screen/appScreen/Motivation/Motivation";
import Feedback from "../screen/appScreen/Feedback/Feedback";
import AddTask from "../screen/appScreen/AddTask/AddTask";
import TaskList from "../screen/appScreen/TaskList/TaskList";
import TaskListStack from "./TaskListStack";

const Tab = createBottomTabNavigator();

const BottomNavigation = ({route}) => {
  const {comingFrom} = route.params;
  console.log(comingFrom,"line 26")
  return (
    <Tab.Navigator initialRouteName={comingFrom?comingFrom:'Home'}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarAllowFontScaling: false,
        tabBarActiveTintColor: AppColor.black,
        tabBarInactiveTintColor: AppColor.textGray,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarStyle: styles.bottomNavHolder,
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
            return (
              <Feather
                name={iconName}
                size={moderateScale(27)}
                color={focused ? AppColor.primary : AppColor.textGray}
              />
            );
          } else if (route.name === "Feedback") {
            return (
              <Image
                source={ImagePath.feedbackIcon}
                resizeMode="contain"
                style={{
                  width: moderateScale(27),
                  height: moderateScale(27),
                }}
                tintColor={focused ? AppColor.primary : AppColor.textGray}
              />
            );
          } else if (route.name === "Add Task") {
            iconName = "plus-square";
            return (
              <Feather
                name={iconName}
                size={moderateScale(27)}
                color={focused ? AppColor.primary : AppColor.textGray}
              />
            );
          } else if (route.name === "Task List") {
            return (
              <Image
                source={ImagePath.taskList}
                resizeMode="contain"
                style={{
                  width: moderateScale(27),
                  height: moderateScale(27),
                }}
                tintColor={focused ? AppColor.primary : AppColor.textGray}
              />
            );
          } else if (route.name === "Motivation") {
            iconName = "star";
            return (
              <Feather
                name={iconName}
                size={moderateScale(27)}
                color={focused ? AppColor.primary : AppColor.textGray}
              />
            );
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={Priority} />
      <Tab.Screen name="Feedback" component={Feedback} />
      <Tab.Screen name="Add Task" component={AddTask} />
      <Tab.Screen name="Task List" component={TaskListStack} />
      <Tab.Screen name="Motivation" component={Motivation} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  iconHolder: {
    width: moderateScale(50),
    height: moderateScale(50),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: moderateScale(10),
    // marginTop:moderateScaleVertical(15)
  },
  tabBarLabelStyle: {
    fontFamily: FontFamily.Inter_Regular,
    fontSize: textScale(10),
    fontWeight: "500",
    marginVertical: moderateScaleVertical(5),
  },
  bottomNavHolder: {
    backgroundColor: AppColor.white,
    height: moderateScale(90),
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: moderateScale(25),
    borderTopRightRadius: moderateScale(25),
    paddingTop: moderateScaleVertical(10),
    position: "absolute",
  },
});
