import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

export const EntryScreen = () => {
  const {t} = useTranslation('entry');

  return (<View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
    <Text style={{
      fontFamily: 'FormularNeutral-Bold',
      fontSize: 20,
      color: 'black',
      lineHeight: 20,
    }}>{t('helloWorld')}</Text>
  </View>)
}