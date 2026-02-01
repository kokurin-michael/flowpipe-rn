import type {ComponentType} from 'react';
import type {StyleProp, ViewStyle} from 'react-native';
import type {SvgProps} from 'react-native-svg';

type AppButtonType = 'filled' | 'outline' | 'transparent';

interface AppButtonProps {
  containerStyle?: StyleProp<ViewStyle>;
  buttonType?: AppButtonType;
  isDisabled?: boolean;
  LeftComponent?: ComponentType<SvgProps>;
  CenterComponent?: ComponentType<SvgProps> | string;
  RightComponent?: ComponentType<SvgProps>;

  onPress?: () => void;
}

export type {AppButtonProps, AppButtonType};
