import React from 'react';
import {Alert, Modal, View, Text, ActivityIndicator} from 'react-native';
import colors from "../../config/colors"
import {heightToDp as hp, widthToDp as wp} from './ResponsiveUI';

const Spinner = (props) => {
  const {visible} = props;
  return (
    <Modal
      animationType="fade"
      visible={visible}
      transparent={true}
      presentationStyle={'overFullScreen'}
      onRequestClose={() => {
        console.log('back button pressed');
      }}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View
          style={{
            backgroundColor: colors.background,
            flexDirection: 'row',
            paddingVertical: hp(10),
            alignItems: 'center',
            borderRadius: hp(10),
            width: wp(200),
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color={colors.green} />
          <Text
            style={{
              color:colors.grey,              
              fontWeight: '500',
              fontSize: hp(16),
              marginLeft: wp(20),
            }}>
            {'Please wait'}
          </Text>
        </View>
      </View>
    </Modal>
  );
};
export default Spinner;
