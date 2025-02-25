import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import BottomNavigation from "./BottomNavigation";
import TaskCreationFirst from "../screen/appScreen/TaskCreationFirst";
import TaskCreationSecond from "../screen/appScreen/TaskCreationSecond";
import SubTask from "../screen/appScreen/SubTask";
import SubTaskTimer from "../screen/appScreen/SubTaskTimer";
import Home from "../screen/appScreen/Home";
import Congratulation from "../screen/appScreen/Congratulation";
import CreateNewSubTask from "../screen/appScreen/CreateNewSubTask";
import Rating from "../screen/appScreen/Rating";
import CoffeePage from "../screen/appScreen/CoffeePage";
import EndPage from "../screen/appScreen/EndPage";
import Feedback from "../screen/appScreen/Feedback";
import SubTaskConfirmation from "../screen/appScreen/SubTaskConfirmation";
import Confirmation from "../screen/appScreen/Confirmation";

const Stack = createNativeStackNavigator();
const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
        <Stack.Screen name="Confirmation" component={Confirmation} />
      <Stack.Screen name="Task Creation First" component={TaskCreationFirst} />
      <Stack.Screen
        name="Task Creation Second"
        component={TaskCreationSecond}
      />
      <Stack.Screen name="SubTask" component={SubTask} />
      <Stack.Screen name="SubTaskTimer" component={SubTaskTimer} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Congratulation" component={Congratulation} />
      <Stack.Screen name="CreateNewSubTask" component={CreateNewSubTask} />
      <Stack.Screen name="Rating" component={Rating} />
      <Stack.Screen name="CoffeePage" component={CoffeePage} />
      <Stack.Screen name="Feedback" component={Feedback} />
      <Stack.Screen name="End" component={EndPage} />
      <Stack.Screen
        name="SubTaskConfirmation"
        component={SubTaskConfirmation}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});
