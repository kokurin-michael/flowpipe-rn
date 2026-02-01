import {Pressable, Text, View} from 'react-native';

import {StyleSheet} from 'react-native-unistyles';

import type {AppButtonProps, AppButtonType} from './types';

export const AppButton = ({
  buttonType = 'filled',
  containerStyle,
  LeftComponent,
  CenterComponent,
  RightComponent,
  isDisabled,
}: AppButtonProps) => {
  return (
    <Pressable
      style={({pressed}) => [styles.container(buttonType, pressed, isDisabled), containerStyle]}>
      {({pressed}) => (
        <View style={styles.content}>
          {LeftComponent ? (
            <LeftComponent
              {...styles.color(buttonType, pressed, isDisabled)}
              width={iconSize}
              height={iconSize}
            />
          ) : null}
          {CenterComponent ? (
            typeof CenterComponent === 'string' ? (
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={[styles.title, styles.color(buttonType, pressed, isDisabled)]}>
                {CenterComponent}
              </Text>
            ) : (
              <CenterComponent
                {...styles.color(buttonType, pressed, isDisabled)}
                width={iconSize}
                height={iconSize}
              />
            )
          ) : null}
          {RightComponent ? (
            <RightComponent
              {...styles.color(buttonType, pressed, isDisabled)}
              width={iconSize}
              height={iconSize}
            />
          ) : null}
        </View>
      )}
    </Pressable>
  );
};

const iconSize = 24;

const styles = StyleSheet.create(theme => ({
  container: (buttonType: AppButtonType, isPressed: boolean, isDisabled: boolean | undefined) => {
    let borderColor: string | undefined;
    let backgroundColor: string | undefined;

    switch (buttonType) {
      case 'filled': {
        borderColor = isPressed ? theme.colors.primary[500] : undefined;

        backgroundColor = isDisabled ? theme.colors.neutral[200] : theme.colors.neutral[500];
        break;
      }

      case 'outline': {
        borderColor = isDisabled
          ? theme.colors.neutral[50]
          : isPressed
            ? theme.colors.primary[500]
            : theme.colors.neutral[100];

        backgroundColor = isDisabled ? theme.colors.neutral[50] : undefined;
        break;
      }

      case 'transparent': {
        backgroundColor = theme.colors.transparent;
        break;
      }
    }

    const borderWidth = buttonType === 'outline' || (buttonType === 'filled' && isPressed) ? 1 : 0;

    return {
      borderWidth: borderWidth,
      borderColor: borderColor,
      backgroundColor: backgroundColor,
      minHeight: 48,
      justifyContent: 'center',
      paddingVertical: 12 - borderWidth,
      paddingHorizontal: 12,
    };
  },
  color: (buttonType: AppButtonType, isPressed: boolean, isDisabled: boolean | undefined) => {
    let color: string | undefined;

    switch (buttonType) {
      case 'filled': {
        color = isDisabled
          ? theme.colors.neutral[50]
          : isPressed
            ? theme.colors.primary[500]
            : theme.colors.white;
        break;
      }

      case 'outline': {
        color = isDisabled
          ? theme.colors.neutral[200]
          : isPressed
            ? theme.colors.primary[500]
            : theme.colors.neutral[500];
        break;
      }

      case 'transparent': {
        color = isDisabled
          ? theme.colors.neutral[300]
          : isPressed
            ? theme.colors.primary[500]
            : theme.colors.neutral[500];
        break;
      }
    }

    return {
      color: color,
    };
  },
  content: {
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  title: {
    textAlign: 'center',
    ...theme.fonts.s16w500,
  },
}));
