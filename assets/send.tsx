import React from 'react';
import { Svg, Path } from 'react-native-svg';

export const SendIcon = () => {
  return (
    <Svg
      width="40px"
      height="40px"
      viewBox="0 0 24 24"
      fill="none"
      accessibilityLabel="Send icon"
    >
      <Path
        d="M20 4L3 11L10 14L13 21L20 4Z"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
