import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const Health = props => {
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
        d="M9.875 15.917H6.333v-4.25h3.542V8.125h4.25v3.542h3.542v4.25h-3.542v3.541h-4.25v-3.541zM12 .333L.667 4.583v8.628c0 7.154 4.83 13.827 11.333 15.456 6.503-1.63 11.333-8.302 11.333-15.456V4.583L12 .333zm8.5 12.878c0 5.667-3.613 10.908-8.5 12.509-4.887-1.6-8.5-6.828-8.5-12.51V6.553L12 3.366l8.5 3.188v6.658z"
        fill={props.isSelected ? '#FFFFFF' : '#aba698'}
      />
    </Svg>
  );
};

export default Health;
