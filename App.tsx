import { LogBox, StyleSheet } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./src/navigation/AuthStack";
import FlashMessage from "react-native-flash-message";
import Dummy from "./Dummy";
import RootNavigator from "./src/navigation/RootNavigator";

const App = () => {
  LogBox.ignoreLogs(["Warning: ..."]);
  LogBox.ignoreAllLogs();
  LogBox.ignoreLogs(["Remote debugger"]);

  return (
    <NavigationContainer>
      {/* <AuthStack /> */}
      <RootNavigator/>
      <FlashMessage
        position={"top"}
        animated={true}
        titleStyle={{ textTransform: "capitalize" }}
      />
    </NavigationContainer>
    // <Dummy/>
  );
};

export default App;

const styles = StyleSheet.create({});
