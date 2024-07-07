import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const Edu = props => {
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
        d="M10.75.167v1.955a10.032 10.032 0 00-3.698-.709A9.878 9.878 0 00.04 4.318l4.717 4.717H6.33v1.572a6.623 6.623 0 004.406 1.927v3.216H6.5V20a2.842 2.842 0 002.833 2.833H23.5a4.244 4.244 0 004.25-4.25V.167h-17zm-1.573 9.08V6.203h-3.23L4.474 4.728a7.182 7.182 0 012.578-.481c1.899 0 3.67.736 5.016 2.068l1.997 1.997-.283.284a3.826 3.826 0 01-2.72 1.133c-.666 0-1.318-.17-1.885-.481zm15.74 9.336A1.42 1.42 0 0123.5 20a1.42 1.42 0 01-1.417-1.417V15.75h-8.5v-3.67a6.6 6.6 0 002.21-1.458l.284-.284 4.009 3.995h1.997v-1.997l-8.5-8.458V3h11.334v15.583z"
        fill={props.isSelected ? '#FFFFFF' : '#aba698'}
      />
    </Svg>
  );
};

export default Edu;
