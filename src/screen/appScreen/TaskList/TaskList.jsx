import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AppColor from "../../../utils/AppColor";
import FontFamily from "../../../utils/FontFamily";
import {
  moderateScale,
  moderateScaleVertical,
  scale,
  textScale,
} from "../../../utils/ResponsiveSize";
import { ImagePath } from "../../../utils/ImagePath";
import CustomButton from "../../../components/CustomButton";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GET_ALL_TASK } from "../../../api/API_SERVICES";
import { showMessage } from "react-native-flash-message";
import { MaterialIndicator } from "react-native-indicators";

const TaskList = () => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState("TO-DO");
  const [todoData, setTodoData] = useState([]);
  const [doneData, setDoneData] = useState([]);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const Data = [
    {
      id: 1,
      name: "Gotta Do Something",
      list: [
        {
          id: 1,
          name: "Breaking the Glass",
        },
        {
          id: 2,
          name: "Then Mopping it",
        },
        {
          id: 3,
          name: "Have to destroy the evidence",
        },
      ],
    },
    {
      id: 2,
      name: "Gotta Do Something",
      list: [
        {
          id: 1,
          name: "Breaking the Glass",
        },
        {
          id: 2,
          name: "Then Mopping it",
        },
        {
          id: 3,
          name: "Have to destroy the evidence",
        },
      ],
    },
    {
      id: 3,
      name: "Gotta Do Something",
      list: [
        {
          id: 1,
          name: "Breaking the Glass",
        },
        {
          id: 2,
          name: "Then Mopping it",
        },
        {
          id: 3,
          name: "Have to destroy the evidence",
        },
      ],
    },
  ];

  useEffect(() => {
    fetchAllTask();
    setSelectedOption("TO-DO");
  }, [isFocused]);

  const fetchAllTask = async () => {
    setLoading(true);
    const userData = await AsyncStorage.getItem("userData");
    const res = JSON.parse(userData);
    console.log(res?.data?._id, "line 52");
    setUserId(res?.data?._id);
    const response = await GET_ALL_TASK(res?.data?._id);
    // console.log(response,"Line 98")
    if (response?.status === true) {
      const toDoList = response?.data.filter(
        (task) => task.task_status === "to-do"
      );
      const doneList = response?.data.filter(
        (task) => task.task_status === "done"
      );

      setTodoData(toDoList);
      setDoneData(doneList);
      setLoading(false);
      // console.log(response?.data, "line 100");
      // setTodoData(response?.data);
    } else {
      showMessage({
        type: "danger",
        message: response?.message,
        icon: "danger",
      });
      setLoading(false);
    }
  };

  const renderItemCard = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.renderView}
        onPress={() =>
          navigation.navigate("TaskListDetails", { data: item, userId: userId })
        }
      >
        <View style={styles.firstView}>
          <Text style={styles.nameText}>{item?.taskName}</Text>
          <View style={{ width: "50%", height: moderateScale(40) }}>
            <TouchableOpacity
              style={styles.buttonView}
              onPress={() =>
                navigation.navigate("SubTask", {
                  taskId: item?._id,
                  userId: userId,
                })
              }
            >
              <Text style={styles.buttonText}>ADD SUBTASK</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.firstView}>
          <Text style={styles.subHeaderText}>{item?.description}</Text>
        </View>
        <View style={styles.firstView}>
          <Text style={styles.subHeaderText}>{item?.avoidingTask}</Text>
        </View>
        <View style={styles.firstView}>
          <Text style={styles.subHeaderText}>{item?.benefitTask}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItemDoneCard = ({ item }) => {
    console.log(item, "line 138");
    return (
      <TouchableOpacity
        style={styles.renderView}
        onPress={() =>
          navigation.navigate("TaskListDetails", {
            data: item,
            userId: userId,
            incomingFrom: "Done",
          })
        }
      >
        <View
          style={[
            styles.firstView,
            { justifyContent: "flex-start", gap: moderateScale(10) },
          ]}
        >
          <View
            style={[
              styles.buttonView,
              { backgroundColor: AppColor.green, width: moderateScale(40) },
            ]}
          >
            <Image
              source={ImagePath.right}
              resizeMode="contain"
              style={{ width: "100%" }}
            />
          </View>

          <Text style={styles.nameText}>{item?.taskName}</Text>
        </View>
        <View style={styles.firstView}>
          <Text style={styles.subHeaderText}>{item?.description}</Text>
        </View>
        <View style={styles.firstView}>
          <Text style={styles.subHeaderText}>{item?.avoidingTask}</Text>
        </View>
        <View style={styles.firstView}>
          <Text style={styles.subHeaderText}>{item?.benefitTask}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.main}>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={"transparent"}
        translucent={true}
      />
      <SafeAreaView />
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <Text style={styles.headerText}>Task List</Text>
        {loading ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 0.3,
            }}
          >
            <MaterialIndicator
              color={AppColor.primary}
              size={moderateScale(50)}
            />
          </View>
        ) : (
          <View style={styles.headerHolder}>
            <TouchableOpacity
              style={[
                styles.optionView,
                {
                  backgroundColor:
                    selectedOption === "TO-DO" ? AppColor.white : "",
                  borderColor:
                    selectedOption === "TO-DO" ? AppColor.white : AppColor.back,
                },
              ]}
              onPress={() => setSelectedOption("TO-DO")}
            >
              <Text
                style={[
                  styles.optionText,
                  {
                    color:
                      selectedOption === "TO-DO"
                        ? AppColor.primary
                        : AppColor.textGray,
                  },
                ]}
              >
                TO-DO
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionView,
                {
                  backgroundColor:
                    selectedOption === "DONE" ? AppColor.white : "",
                  borderColor:
                    selectedOption === "DONE" ? AppColor.white : AppColor.back,
                },
              ]}
              onPress={() => setSelectedOption("DONE")}
            >
              <Text
                style={[
                  styles.optionText,
                  {
                    color:
                      selectedOption === "DONE"
                        ? AppColor.green
                        : AppColor.textGray,
                  },
                ]}
              >
                DONE
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {selectedOption === "TO-DO" ? (
          <View style={styles.flatListHolder}>
            <FlatList
              data={todoData}
              renderItem={renderItemCard}
              keyExtractor={(item, index) => index}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ gap: moderateScaleVertical(10) }}
            />
          </View>
        ) : (
          <View style={styles.flatListHolder}>
            <FlatList
              data={doneData}
              renderItem={renderItemDoneCard}
              keyExtractor={(item, index) => index}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ gap: moderateScaleVertical(10) }}
            />
          </View>
        )}

        <View
          style={{
            width: "75%",
            marginBottom:moderateScaleVertical(10)
          }}
        >
          <CustomButton
            title={"ADD NEW TASK"}
            handleAction={() => navigation.navigate("Task Creation First")}
          />
        </View>
      </View>
    </View>
  );
};

export default TaskList;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  headerText: {
    fontFamily: FontFamily.Inter_Bold,
    fontSize: textScale(21),
    fontWeight: "600",
    marginVertical: moderateScaleVertical(20),
    color: AppColor.wText,
  },
  optionText: {
    fontFamily: FontFamily.Inter_Medium,
    color: AppColor.primary,
    fontSize: textScale(13),
    fontWeight: "500",
  },
  headerHolder: {
    borderWidth: 2,
    width: "85%",
    height: moderateScale(60),
    backgroundColor: AppColor.back,
    borderColor: AppColor.back,
    borderRadius: moderateScale(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  optionView: {
    borderWidth: 2,
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
    height: moderateScale(40),
    // marginHorizontal: moderateScale(10),
    backgroundColor: AppColor.white,
    borderColor: AppColor.white,
    borderRadius: moderateScale(10),
    opacity: 0.9,
  },
  renderView: {
    borderWidth: 2,
    borderRadius: moderateScale(10),
    backgroundColor: AppColor.back,
    borderColor: AppColor.back,
  },
  firstView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: moderateScale(10),
    borderBottomWidth: 1,
    borderColor: AppColor.divider,
  },
  nameText: {
    fontFamily: FontFamily.Inter_Medium,
    fontSize: textScale(11),
    fontWeight: "500",
    color: AppColor.buttonBack1,
    letterSpacing: scale(0.2),
    width: "45%",
  },
  buttonView: {
    alignItems: "center",
    justifyContent: "center",
    height: moderateScale(40),
    width: "100%",
    borderRadius: moderateScale(40),
    backgroundColor: AppColor.primary,
  },
  buttonText: {
    fontFamily: FontFamily.Inter_Regular,
    fontSize: textScale(11),
    fontWeight: "500",
    color: AppColor.white,
  },
  flatListHolder: {
    marginVertical: moderateScaleVertical(20),
    width: "85%",
    flex: 0.83,
  },
  subHeaderText: {
    fontFamily: FontFamily.Inter_Regular,
    fontWeight: "400",
    fontSize: textScale(13),
    color: AppColor.textGray,
  },
});
