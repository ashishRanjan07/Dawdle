import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { moderateScale, scale, textScale } from "../utils/ResponsiveSize";
import AppColor from "../utils/AppColor";
import FontFamily from "../utils/FontFamily";

const CustomButton = ({ title, handleAction,disabled }) => {
  return (
    <TouchableOpacity style={styles.main} onPress={handleAction} disabled={disabled}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  main: {
    borderWidth: 2,
    width:'100%',
    height: moderateScale(59),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: moderateScale(38),
    borderColor: AppColor.primary,
    backgroundColor: AppColor.primary,
  },
  text: {
    fontSize: textScale(13),
    color: AppColor.white,
    opacity:1,
    // fontFamily: FontFamily.Inter_SemiBold,
    fontWeight:'500',
    letterSpacing:scale(0.2),
    textTransform:'uppercase'
  },
});
