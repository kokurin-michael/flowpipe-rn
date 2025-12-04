import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native-unistyles';
import { ActivityOverlay, AppTextInput, KeyboardDismissPressable } from '@components';
import { KeyboardStickyView } from 'react-native-keyboard-controller';

export const EntryScreen = () => {
  const {t} = useTranslation('entry');

  return (<KeyboardDismissPressable style={styles.container}>
    <ActivityOverlay isVisible={false} />
    <KeyboardStickyView style={styles.input}>
        <AppTextInput placeholder={t('input')}/>
    </KeyboardStickyView>
  </KeyboardDismissPressable>)
}

const styles = StyleSheet.create((theme, rt) => ({
  container: {flex: 1, backgroundColor: theme.colors.white, justifyContent: 'center', alignItems: 'center', paddingTop: rt.insets.top},
  input: {position: 'absolute', start: 0, end: 0, flex: 1, paddingHorizontal: theme.paddings.screenHorizontal, bottom: rt.insets.bottom}
}))