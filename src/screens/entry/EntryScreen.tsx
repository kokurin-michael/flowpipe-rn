import {useCallback} from 'react';
import {Pressable, Text, View} from 'react-native';

import {useTranslation} from 'react-i18next';
import {KeyboardStickyView} from 'react-native-keyboard-controller';
import {StyleSheet} from 'react-native-unistyles';

import {CopyIcon} from '@assets';
import {AppButton, AppTextInput, KeyboardDismissPressable} from '@components';

export const EntryScreen = () => {
  const {t, i18n} = useTranslation('entry');
  const onLocalePress = useCallback(() => {
    const next = i18n.language === 'ru' ? 'en' : 'ru';
    i18n.changeLanguage(next);
  }, [i18n]);

  return (
    <>
      <KeyboardDismissPressable style={styles.container}>
        <Pressable style={styles.locale} onPress={onLocalePress}>
          <Text style={styles.localeLabel}>{i18n.language === 'ru' ? 'RU' : 'EN'}</Text>
        </Pressable>

        <View style={styles.header}>
          <Text style={styles.title}>{t('title')}</Text>
          <Text style={styles.subtitle}>{t('subtitle')}</Text>
        </View>

        <KeyboardStickyView style={styles.footer}>
          <AppTextInput.Root>
            <View style={{flexDirection: 'row', gap: 8}}>
              <AppTextInput.Container containerStyle={{flex: 1}}>
                <AppTextInput.Input textContentType={'URL'} />
                <AppTextInput.Placeholder text={t('placeholder')} />
              </AppTextInput.Container>
              <AppButton buttonType={'transparent'} CenterComponent={t('download')} />
            </View>
            <AppTextInput.Message />
          </AppTextInput.Root>
          <AppButton
            containerStyle={{flex: 1}}
            LeftComponent={CopyIcon}
            CenterComponent={t('clipboard')}
          />
        </KeyboardStickyView>
      </KeyboardDismissPressable>
    </>
  );
};

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingTop: rt.insets.top,
  },
  header: {
    paddingTop: '50%',
    gap: 8,
    paddingHorizontal: theme.paddings.screenHorizontal,
  },
  title: {
    textAlign: 'center',
    ...theme.fonts.s32w500,
    color: theme.colors.neutral[500],
  },
  subtitle: {
    textAlign: 'center',
    ...theme.fonts.s22w500,
    color: theme.colors.neutral[500],
  },
  contentContainer: {
    backgroundColor: 'white',
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: '#eee',
  },
  locale: {
    position: 'absolute',
    top: rt.insets.top,
    end: theme.paddings.screenHorizontal,
  },
  localeLabel: {
    ...theme.fonts.s16w400,
    color: theme.colors.neutral[500],
  },
  footer: {
    position: 'absolute',
    start: 0,
    end: 0,
    flex: 1,
    paddingHorizontal: theme.paddings.screenHorizontal,
    paddingTop: 14,
    paddingBottom: 12 + rt.insets.bottom,
    bottom: 0,
    boxShadow: theme.shadows.tab,
    gap: 12,
    backgroundColor: theme.colors.white,
  },
}));
