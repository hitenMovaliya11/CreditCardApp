import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const Drop = props => {
  return (
    <Svg
      width={props.isSelected ? 30 : 24}
      height={props.isSelected ? 30 : 24}
      fill={props.isSelected ? '#FFFFFF' : '#aba698'}
      viewBox={`0 0 ${props.isSelected ? 30 : 24} ${
        props.isSelected ? 30 : 24
      }`}
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M12 .333C4.45 6.78.667 12.347.667 17.05.667 24.105 6.05 28.667 12 28.667s11.333-4.562 11.333-11.617c0-4.703-3.782-10.27-11.333-16.717zm0 25.5c-4.746 0-8.5-3.64-8.5-8.783 0-3.315 2.763-7.707 8.5-12.948 5.738 5.241 8.5 9.619 8.5 12.948 0 5.142-3.754 8.783-8.5 8.783zm-5.907-8.5c.524 0 .949.369 1.048.879.58 3.145 3.23 4.221 5.156 4.066.61-.029 1.12.453 1.12 1.062 0 .567-.454 1.034-1.02 1.063-3.018.184-6.545-1.545-7.353-5.837-.113-.638.397-1.233 1.049-1.233z"
        fill={props.isSelected ? '#FFFFFF' : '#aba698'}
      />
    </Svg>
  );
};

export default Drop;
