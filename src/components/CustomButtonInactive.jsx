import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {moderateScale, scale, textScale} from '../utils/ResponsiveSize';
import AppColor from '../utils/AppColor';
import FontFamily from '../utils/FontFamily';

const CustomButtonInactive = ({title,handleAction}) => {
  return (
    <TouchableOpacity style={styles.main} onPress={handleAction}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButtonInactive;

const styles = StyleSheet.create({
  main: {
    borderWidth: 2,
    width: '100%',
    height: moderateScale(60),
    alignItems: 'center',
    justifyContent:'center',
    borderRadius: moderateScale(38),
    borderColor: AppColor.inActive,
    backgroundColor: AppColor.inActive,
  },
  text: {
    fontSize: textScale(13),
    fontWeight:'500',
    color: AppColor.buttonBack1,
    // fontFamily:FontFamily.Inter_SemiBold
    letterSpacing:scale(0.2)
  },
});
