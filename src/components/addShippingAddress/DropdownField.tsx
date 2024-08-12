import React, {useState, useRef, memo} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Dropdown, IDropdownRef} from 'react-native-element-dropdown';
import {colors, spacing} from '@/themes';
import {ic_down_arrow} from '@/assets/icons';

type DropdownFieldProps = {
  label: string;
  placeholder: string;
  value: string | null;
  data: Array<{label: string; value: string}>;
  onChange: (value: string, label: string) => void;
};

const DropdownField = ({
  label,
  placeholder,
  value,
  data,
  onChange,
}: DropdownFieldProps): JSX.Element => {
  const dropdownRef = useRef<IDropdownRef>(null);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <TouchableOpacity
      onPress={() => {
        if (dropdownRef.current) {
          dropdownRef.current.open();
        }
      }}
      style={isFocus ? styles.boxInputFocus : styles.boxInput}>
      <Text style={styles.txtLabel}>{label}</Text>
      <Image style={styles.iconDownArrow} source={ic_down_arrow} />

      <Dropdown
        ref={dropdownRef}
        style={[styles.dropdown, isFocus && {borderColor: colors.primary}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          onChange(item.value, item.label);
          if (dropdownRef.current) {
            dropdownRef.current.close();
          }
          setIsFocus(false);
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  boxInput: {
    marginTop: spacing.lg,
    borderRadius: 4,
    backgroundColor: colors.disabled_field,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  txtLabel: {
    color: colors.text_secondary,
    fontFamily: 'NunitoSans',
    fontSize: 12,
  },
  boxInputFocus: {
    marginTop: spacing.lg,
    borderRadius: 4,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderWidth: 0.4,
    borderColor: colors.primary,
  },
  dropdown: {
    height: 48,
    borderColor: 'gray',
    borderWidth: 0,
    borderRadius: 4,
    justifyContent: 'center',
  },
  placeholderStyle: {
    color: colors.placeholder,
    fontFamily: 'NunitoSans',
    fontSize: 16,
    fontWeight: '600',
  },
  selectedTextStyle: {
    color: colors.primary,
    fontFamily: 'NunitoSans',
    fontSize: 16,
    fontWeight: '600',
  },
  iconStyle: {
    width: 0,
    height: 0,
  },
  iconDownArrow: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 20,
    top: '50%',
  },
});

export default DropdownField;
