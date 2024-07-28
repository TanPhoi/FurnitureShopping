import {ic_next} from '@/assets/icons';
import {colors, spacing} from '@/themes';
import React, {JSX} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type ProfileTabProps = {
  label: string;
  content: string;
  onPress: () => void;
};
const ProfileTab = ({
  label,
  content,
  onPress,
}: ProfileTabProps): JSX.Element => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View>
        <Text style={styles.txtLabel}>{label}</Text>
        <Text style={styles.txtContent}>{content}</Text>
      </View>

      <Image style={styles.icon} source={ic_next} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    borderRadius: 6,
    marginBottom: spacing.sm,
  },
  icon: {
    width: 20,
    height: 20,
  },
  txtLabel: {
    color: colors.primary,
    fontFamily: 'NunitoSans',
    fontSize: 18,
    fontWeight: '700',
  },
  txtContent: {
    marginTop: spacing.xs,
    color: colors.text_secondary,
    fontFamily: 'NunitoSans',
    fontSize: 12,
    textAlign: 'justify',
    lineHeight: 15,
  },
});

export default ProfileTab;
