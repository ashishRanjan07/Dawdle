import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TaskList from "../screen/appScreen/TaskList/TaskList";
import TaskListDetails from "../screen/appScreen/TaskList/TaskListDetails";

const Stack = createNativeStackNavigator();

const TaskListStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TaskList" component={TaskList} />
      <Stack.Screen name="TaskListDetails" component={TaskListDetails} />
    </Stack.Navigator>
  );
};

export default TaskListStack;

const styles = StyleSheet.create({});
