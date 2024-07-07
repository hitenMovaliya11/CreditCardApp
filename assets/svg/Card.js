import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const Card = props => {
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
        d="M26.333.333H3.667A2.824 2.824 0 00.833 3.167V18.75a2.824 2.824 0 002.834 2.833h5.666v7.084L15 25.833l5.667 2.834v-7.084h5.666a2.823 2.823 0 002.834-2.833V3.167A2.824 2.824 0 0026.333.333zm0 18.417H3.667v-2.833h22.666v2.833zm0-7.083H3.667v-8.5h22.666v8.5z"
        fill={props.isSelected ? '#FFFFFF' : '#aba698'}
      />
    </Svg>
  );
};

export default Card;
