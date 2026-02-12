import {useCallback} from 'react';
import {Pressable, Text, View} from 'react-native';

import {useTranslation} from 'react-i18next';
import {KeyboardStickyView} from 'react-native-keyboard-controller';
import {StyleSheet} from 'react-native-unistyles';

import {useGetExtractInfo} from '@api/generated/endpoints/download/download.ts';
import {CopyIcon} from '@assets';
import {AppButton, AppTextInput, KeyboardDismissPressable} from '@components';

import {useDownload} from './useDownload';

export const EntryScreen = () => {
  const {t, i18n} = useTranslation('entry');
  const onLocalePress = useCallback(() => {
    const next = i18n.language === 'ru' ? 'en' : 'ru';
    i18n.changeLanguage(next);
  }, [i18n]);

  const {setUrl, onDownloadPress} = useDownload();
  const {isError, data, isLoading} = useGetExtractInfo({
    url: 'https://youtu.be/y4ZBSzYUTL0?si=mfBI_qcLrY2QOJ5H',
  });

  return (
    <>
      <KeyboardDismissPressable style={styles.container}>
        <Pressable style={styles.locale} onPress={onLocalePress}>
          <Text style={styles.localeLabel}>{i18n.language === 'ru' ? 'RU' : 'EN'}</Text>
        </Pressable>

        {/*<View style={styles.header}>*/}
        {/*  <Text style={styles.title}>{t('title')}</Text>*/}
        {/*  <Text style={styles.subtitle}>{t('subtitle')}</Text>*/}
        {/*</View>*/}

        <KeyboardStickyView style={styles.footer}>
          <AppTextInput.Root>
            <View style={styles.urlInputRow}>
              <AppTextInput.Container containerStyle={styles.flex}>
                <AppTextInput.Input textContentType={'URL'} onChangeText={setUrl} />
                <AppTextInput.Placeholder text={t('placeholder')} />
              </AppTextInput.Container>
              <AppButton
                buttonType={'transparent'}
                onPress={onDownloadPress}
                CenterComponent={t('download')}
              />
            </View>
            <AppTextInput.Message />
          </AppTextInput.Root>
          <AppButton
            containerStyle={styles.flex}
            LeftComponent={CopyIcon}
            CenterComponent={t('clipboard')}
          />
        </KeyboardStickyView>
      </KeyboardDismissPressable>
    </>
  );
};

const styles = StyleSheet.create((theme, rt) => {
  const headerText = {
    textAlign: 'center' as const,
    color: theme.colors.neutral[500],
  };
  return {
    container: {
      flex: 1,
      backgroundColor: theme.colors.white,
      paddingTop: rt.insets.top,
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
    header: {
      paddingTop: '50%',
      gap: 8,
      paddingHorizontal: theme.paddings.screenHorizontal,
    },
    title: {
      ...headerText,
      ...theme.fonts.s22w500,
    },
    subtitle: {
      ...headerText,
      ...theme.fonts.s16w500,
    },
    footer: {
      position: 'absolute',
      start: 0,
      end: 0,
      flex: 1,
      bottom: 0,
      paddingHorizontal: theme.paddings.screenHorizontal,
      paddingTop: 14,
      paddingBottom: 12 + rt.insets.bottom,
      gap: 12,
      backgroundColor: theme.colors.white,
      boxShadow: theme.shadows.tab,
    },
    urlInputRow: {
      flexDirection: 'row',
      gap: 8,
    },
    flex: {
      flex: 1,
    },
  };
});
