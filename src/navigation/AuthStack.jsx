import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../screen/authScreen/Splash";
import Welcome from "../screen/authScreen/Welcome";
import LoginOption from "../screen/authScreen/LoginOption";
import Confirmation from "../screen/appScreen/Confirmation";
import TaskCreationFirst from "../screen/appScreen/TaskCreationFirst";
import TaskCreationSecond from "../screen/appScreen/TaskCreationSecond";
import SubTask from "../screen/appScreen/SubTask";
import SubTaskTimer from "../screen/appScreen/SubTaskTimer";
import Home from "../screen/appScreen/Home";
import Congratulation from "../screen/appScreen/Congratulation";
import CreateNewSubTask from "../screen/appScreen/CreateNewSubTask";
import Rating from "../screen/appScreen/Rating";
import CoffeePage from "../screen/appScreen/CoffeePage";
import Feedback from "../screen/appScreen/Feedback";
import EndPage from "../screen/appScreen/EndPage";
import SubTaskConfirmation from "../screen/appScreen/SubTaskConfirmation";
import BottomNavigation from "./BottomNavigation";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="LoginOption" component={LoginOption} />
      {/* <Stack.Screen name="Confirmation" component={Confirmation} /> */}
      {/* <Stack.Screen name="Task Creation First" component={TaskCreationFirst} /> */}
      {/* <Stack.Screen name="Task Creation Second" component={TaskCreationSecond} /> */}
      {/* <Stack.Screen name="SubTask" component={SubTask} />
      <Stack.Screen name="SubTaskTimer" component={SubTaskTimer} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Congratulation" component={Congratulation} />
      <Stack.Screen name="CreateNewSubTask" component={CreateNewSubTask} />
      <Stack.Screen name="Rating" component={Rating} />
      <Stack.Screen name="CoffeePage" component={CoffeePage} />
      <Stack.Screen name="Feedback" component={Feedback} />
      <Stack.Screen name="End" component={EndPage} />
      <Stack.Screen name="SubTaskConfirmation" component={SubTaskConfirmation} /> */}
      {/* <Stack.Screen name="BottomNavigation" component={BottomNavigation}/> */}
      

    </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
