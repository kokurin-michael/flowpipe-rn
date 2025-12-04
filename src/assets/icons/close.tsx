import {FC} from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const CloseIcon: FC<SvgProps> = props => {
  return (
    <Svg
      width={props.width ?? '24'}
      height={props.height ?? '24'}
      viewBox={props.viewBox ?? '0 0 24 24'}
      fill={'none'}>
      <Path
        clipRule={'evenodd'}
        fillRule={'evenodd'}
        d="M17.8158 6.83546L16.9804 6L11.9073 11.0731L6.83546 6.00121L6 6.83667L11.0723 11.909L6 16.9812L6.83546 17.8167L11.9073 12.7449L16.9804 17.8179L17.8158 16.9825L12.7423 11.909L17.8158 6.83546Z"
        fill={'#041D30'}
        {...props}
      />
    </Svg>
  );
};
