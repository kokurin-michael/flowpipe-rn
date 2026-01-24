import {useMemo} from 'react';
import {Text} from 'react-native';

import {StyleSheet} from 'react-native-unistyles';

import {useAppTextInput} from '../useAppTextInput';

export const Message = ({message}: MessageProps) => {
  const {type} = useAppTextInput();

  const messageStyle = useMemo(() => {
    switch (type) {
      case 'error': {
        return styles.error;
      }

      case 'success': {
        return styles.success;
      }
    }
  }, [type]);

  return (
    <Text numberOfLines={2} ellipsizeMode={'tail'} style={messageStyle}>
      {message}
    </Text>
  );
};

export interface MessageProps {
  message: string;
}

const styles = StyleSheet.create(theme => ({
  success: {
    color: theme.colors.primary[500],
  },
  error: {
    color: theme.colors.error[500],
  },
  message: {
    ...theme.fonts.s12w400,
  },
}));
