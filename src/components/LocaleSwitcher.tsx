import {Pressable, Text} from 'react-native';

import {useTranslation} from 'react-i18next';
import type {StyleProp, ViewStyle} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';

export const LocaleSwitcher = ({style}: {style?: StyleProp<ViewStyle>}) => {
  const {i18n} = useTranslation();

  const onLocalePress = () => {
    const next = i18n.language === 'ru' ? 'en' : 'ru';
    i18n.changeLanguage(next);
  };

  return (
    <Pressable style={style ?? styles.container} onPress={onLocalePress}>
      <Text style={styles.label}>{i18n.language === 'ru' ? 'RU' : 'EN'}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    position: 'absolute',
    top: rt.insets.top,
    end: theme.paddings.screenHorizontal,
  },
  label: {
    ...theme.fonts.s16w400,
    color: theme.colors.neutral[500],
  },
}));
