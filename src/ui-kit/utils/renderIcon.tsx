import React from 'react';
import { View, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

export interface RenderIconOptions {
  icon?: React.ReactElement<SvgProps> | React.ReactNode;
  iconSize?: number;
  iconColor?: string;
  iconStyle?: ViewStyle;
}

export const renderIcon = ({
  icon,
  iconSize,
  iconColor,
  iconStyle,
}: RenderIconOptions): React.ReactNode => {
  if (!icon) return null;

  if (React.isValidElement(icon)) {
    const svgProps: any = {};

    if (iconSize !== undefined) {
      svgProps.width = iconSize;
      svgProps.height = iconSize;
    }

    if (iconColor) {
      svgProps.fill = iconColor;
      svgProps.color = iconColor;
      svgProps.stroke = iconColor;
    }

    const iconWithProps = React.cloneElement(
      icon as React.ReactElement<any>,
      svgProps,
    );

    if (iconStyle) {
      return <View style={iconStyle}>{iconWithProps}</View>;
    }

    return iconWithProps;
  }

  if (iconStyle) {
    return <View style={iconStyle}>{icon}</View>;
  }

  return icon;
};
