import {useRef} from 'react';
import {View} from 'react-native';

import {useTranslation} from 'react-i18next';
import {KeyboardStickyView} from 'react-native-keyboard-controller';
import {StyleSheet} from 'react-native-unistyles';

import {CopyIcon} from '@assets';
import {AppButton, AppTextInput, LocaleSwitcher} from '@components';
import type {AppTextInputRef} from '@components/AppTextInput/types.ts';

import {DownloadBtn, InfoList} from './components';
import {useEntry} from './hooks';

export const EntryScreen = () => {
  const {t} = useTranslation('entry');

  const {onDownloadPress} = useEntry();
  const urlInputRef = useRef<AppTextInputRef>(null);

  return (
    <View style={styles.container}>
      {/*<View style={styles.header}>*/}
      {/*  <Text style={styles.title}>{t('title')}</Text>*/}
      {/*  <Text style={styles.subtitle}>{t('subtitle')}</Text>*/}
      {/*</View>*/}
      <InfoList />
      <LocaleSwitcher />
      <KeyboardStickyView style={styles.footer}>
        <AppTextInput.Root>
          <View style={styles.urlInputRow}>
            <AppTextInput.Container containerStyle={styles.flex}>
              <AppTextInput.Input ref={urlInputRef} textContentType={'URL'} />
              <AppTextInput.Clear />
              <AppTextInput.Placeholder text={t('placeholder')} />
            </AppTextInput.Container>
            <DownloadBtn onPress={() => onDownloadPress(urlInputRef.current?.getText())} />
          </View>
          <AppTextInput.Message />
        </AppTextInput.Root>
        <AppButton
          containerStyle={styles.flex}
          LeftComponent={CopyIcon}
          CenterComponent={t('clipboard')}
        />
      </KeyboardStickyView>
    </View>
  );
};

const styles = StyleSheet.create((theme, rt) => {
  // const headerText = {
  //   textAlign: 'center' as const,
  //   color: theme.colors.neutral[500],
  // };
  return {
    container: {
      flex: 1,
      backgroundColor: theme.colors.white,
      paddingTop: rt.insets.top,
    },
    // header: {
    //   paddingTop: '50%',
    //   gap: 8,
    //   paddingHorizontal: theme.paddings.screenHorizontal,
    // },
    // title: {
    //   ...headerText,
    //   ...theme.fonts.s22w500,
    // },
    // subtitle: {
    //   ...headerText,
    //   ...theme.fonts.s16w500,
    // },
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
