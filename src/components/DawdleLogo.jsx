import { Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { moderateScaleVertical, textScale } from "../utils/ResponsiveSize";
import AppColor from "../utils/AppColor";

import { DotIndicator } from "react-native-indicators";
import FontFamily from "../utils/FontFamily";

const DawdleLogo = ({ color }) => {
  return (
    <View>
      <View
        style={{
          marginBottom:
            Platform.OS === "android" ? moderateScaleVertical(-8) : null,
            alignItems:'center'
        }}
      >
        <DotIndicator
          color={color ? color : AppColor.primary}
          size={textScale(5)}
          count={3}
        />
      </View>
      <Text style={[styles.text2, { color: color ? color : AppColor.primary }]}>
        {" "}
        dawdle
      </Text>
    </View>
  );
};

export default DawdleLogo;

const styles = StyleSheet.create({
  text2: {
    fontFamily: FontFamily.LeagueSpartan_Bold,
    color: AppColor.primary,
    fontSize: textScale(24),
    textAlign:'center',
  },
});
