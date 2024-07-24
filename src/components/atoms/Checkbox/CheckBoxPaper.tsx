import React from 'react';

import {colors} from '@constants/colors';
import {Checkbox} from 'react-native-paper';
import {View} from 'react-native';

type TCheckboxProps = {
  checked?: boolean;
  setChecked: (checked: boolean) => void;
  label: string;
};

const CheckBoxPaper = ({checked, setChecked, label}: TCheckboxProps) => {
  return (
    <View>
      <Checkbox.Item
        color={colors.primaryAccent}
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => {
          setChecked(!checked);
        }}
        label={label}
        position="leading"
      />
    </View>
  );
};

export default CheckBoxPaper;
