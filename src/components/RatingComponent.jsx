import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "../utils/ResponsiveSize";
import FontFamily from "../utils/FontFamily";
import AppColor from "../utils/AppColor";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const RatingComponent = ({ message, imageArray, onSelect }) => {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item, index }) => {
    const isSelected = selectedId === item.id;
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedId(item.id);
          onSelect(item.id, item.value);
        }}
        key={index}
        style={styles.itemHolder}
      >
        <Image
          source={isSelected ?item?.selectedImage ?item?.selectedImage:item?.image :item?.image}
          resizeMode="contain"
          style={{
            width: moderateScale(40),
            height: moderateScale(34),
            // tintColor: isSelected ? AppColor.primary : null,
          }}
        />
        <MaterialCommunityIcons
          name={isSelected ? "circle-slice-8" : "circle-outline"}
          size={24}
          color={isSelected ? AppColor.primary : AppColor.gray}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        width: "100%",
        alignItems: "center",
        alignSelf: "center",
      }}
    >
      <Text style={styles.textScale}>{message}</Text>
      <FlatList
        data={imageArray}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        numColumns={5}
      />
    </View>
  );
};

export default RatingComponent;

const styles = StyleSheet.create({
  textScale: {
    fontFamily: FontFamily.Inter_Light,
    fontSize: textScale(13),
    color: AppColor.buttonBack1,
    textAlign: "center",
    fontWeight: "300",
    width: "95%",
    alignSelf: "center",
    // borderWidth:2,
  },
  itemHolder: {
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: moderateScale(10),
    marginVertical: moderateScaleVertical(20),
    gap: moderateScale(10),
  },
});
