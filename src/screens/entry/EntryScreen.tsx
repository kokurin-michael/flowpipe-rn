import {useCallback, useRef} from 'react';
import {Text, useWindowDimensions, View} from 'react-native';

import type BottomSheet from '@gorhom/bottom-sheet';
import {useTranslation} from 'react-i18next';
import {KeyboardStickyView} from 'react-native-keyboard-controller';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native-unistyles';

import {ActivityOverlay, AppTextInput, KeyboardDismissPressable} from '@components';

export const EntryScreen = () => {
  const {t} = useTranslation('entry');
  const bottomSheetRef = useRef<BottomSheet>(null);

  const renderItem = useCallback(
    ({item}) => (
      <View style={styles.itemContainer}>
        <Text>{item}</Text>
      </View>
    ),
    [],
  );

  const {top} = useSafeAreaInsets();
  const {height} = useWindowDimensions();

  return (
    <>
      <KeyboardDismissPressable style={styles.container}>
        <ActivityOverlay isVisible={false} />
        <KeyboardStickyView style={styles.input}>
          <AppTextInput.Root initialState={'error'} initialText={'Hello default'}>
            <AppTextInput.Container>
              <AppTextInput.Input />
              <AppTextInput.Placeholder text={'Placeholder'} />
            </AppTextInput.Container>
            <AppTextInput.Message message={'Message'} />
          </AppTextInput.Root>
        </KeyboardStickyView>
      </KeyboardDismissPressable>

      {/*<BottomSheet*/}
      {/*  ref={bottomSheetRef}*/}
      {/*  enablePanDownToClose*/}
      {/*  footerComponent={() => (*/}
      {/*    <View style={{paddingVertical: 20, backgroundColor: 'white'}}>*/}
      {/*      <Text>{'blalalalalalalalalalalal'}</Text>*/}
      {/*    </View>*/}
      {/*  )}*/}
      {/*  backdropComponent={props => (*/}
      {/*    <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.6} />*/}
      {/*  )}*/}
      {/*  topInset={top}>*/}
      {/*  <BottomSheetFlatList*/}
      {/*    ListHeaderComponent={() => (*/}
      {/*      <View style={{paddingVertical: 20, backgroundColor: 'white'}}>*/}
      {/*        /!*<AppTextInput.Root>*!/*/}
      {/*        /!*  <AppTextInput.Container>*!/*/}
      {/*        /!*    <AppTextInput.Input />*!/*/}
      {/*        /!*    <AppTextInput.Placeholder text={'Placeholder'} />*!/*/}
      {/*        /!*  </AppTextInput.Container>*!/*/}
      {/*        /!*  <AppTextInput.Message message={'Message'} />*!/*/}
      {/*        /!*</AppTextInput.Root>*!/*/}
      {/*      </View>*/}
      {/*    )}*/}
      {/*    stickyHeaderIndices={[0]}*/}
      {/*    contentContainerStyle={{paddingHorizontal: 16, minHeight: height - top}}*/}
      {/*    data={Array.from({length: 4}, (_, i) => i)}*/}
      {/*    keyExtractor={(_, index) => index.toString()}*/}
      {/*    renderItem={renderItem}*/}
      {/*  />*/}
      {/*</BottomSheet>*/}
    </>
  );
};

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: rt.insets.top,
  },
  input: {
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
  },
  contentContainer: {
    backgroundColor: 'white',
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: '#eee',
  },
}));
