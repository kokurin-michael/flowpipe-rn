import {Text} from 'react-native';

import {LegendList} from '@legendapp/list';
import {times} from 'lodash';

const DATA = times(100, num => ({title: 'Item ' + num, id: num.toString()}));

export const InfoList = () => {
  return (
    <LegendList
      data={DATA}
      renderItem={({item}) => <Text>{item.title}</Text>}
      keyExtractor={item => item.id}
      recycleItems
    />
  );
};
