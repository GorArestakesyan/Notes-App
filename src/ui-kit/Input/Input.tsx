import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { SvgProps } from 'react-native-svg';
import { theme } from '@constants/theme';
import { useInputStyles } from './Input.useStyles';
import { renderIcon } from '../utils/renderIcon';

export interface IInputProps extends TextInputProps {
  error?: boolean;
  errorMessage?: string;

  leftIcon?: React.ReactElement<SvgProps> | React.ReactNode;
  rightIcon?: React.ReactElement<SvgProps> | React.ReactNode;
  iconSize?: number;
  iconColor?: string;
}

export const Input = ({
  error,
  errorMessage,
  leftIcon,
  rightIcon,
  iconSize = 20,
  iconColor,
  style,
  ...props
}: IInputProps) => {
  const styles = useInputStyles(error);

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        {renderIcon({
          icon: leftIcon,
          iconSize,
          iconColor,
          iconStyle: styles.leftIcon,
        })}
        <TextInput
          style={[
            styles.input,
            leftIcon ? styles.inputWithLeftIcon : undefined,
            rightIcon ? styles.inputWithRightIcon : undefined,
            style,
          ]}
          placeholderTextColor={theme.colors.textMuted}
          {...props}
        />
        {renderIcon({
          icon: rightIcon,
          iconSize,
          iconColor,
          iconStyle: styles.rightIcon,
        })}
      </View>
      {error && errorMessage && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}
    </View>
  );
};
