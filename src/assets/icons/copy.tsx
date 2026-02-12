import type {FC} from 'react';
import type {SvgProps} from 'react-native-svg';
import Svg, {Path} from 'react-native-svg';

export const CopyIcon: FC<SvgProps> = props => {
  return (
    <Svg
      style={props.style}
      width={props.width ?? '16'}
      height={props.height ?? '16'}
      viewBox={props.viewBox ?? '0 0 16 16'}
      fill={'none'}>
      <Path
        clipRule={'evenodd'}
        fillRule={'evenodd'}
        d={
          'M8.46164 6.36133H4.80371V12.9528H8.46164V6.36133ZM7.53809 3.04688V5.36133H9.46164V9.6383H11.196V3.04688H7.53809ZM6.53809 5.36133H3.80371V13.9528H9.46164V10.6383H12.196V2.04688H6.53809V5.36133Z'
        }
        fill={props.color}
        {...props}
      />
    </Svg>
  );
};
