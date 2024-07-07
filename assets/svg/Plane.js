import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const Plane = props => {
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
        d="M1.542 22.417h26.916v2.833H1.542v-2.833zm27.724-13.26a2.12 2.12 0 00-2.607-1.502l-7.522 2.012L9.362.557l-2.735.723 5.865 10.158-7.04 1.884L2.66 11.14l-2.054.553 3.669 6.36 23.474-6.276a2.156 2.156 0 001.516-2.62z"
        fill={props.isSelected ? '#FFFFFF' : '#aba698'}
      />
    </Svg>
  );
};

export default Plane;
