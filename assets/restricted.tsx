import React from 'react';
import { Svg, Path } from 'react-native-svg';

export const RestrictedIcon = () => {
  return (
    <Svg
      width="40px"
      height="40px"
      viewBox="0 0 24 24"
      fill="none"
      accessibilityLabel="Restricted to send icon"
    >
      <Path
        d="M5.63604 5.63604C4.00736 7.26472 3 9.51472 3 12C3 16.9706 7.02944 21 12 21C14.4853 21 16.7353 19.9926 18.364 18.364M5.63604 5.63604C7.26472 4.00736 9.51472 3 12 3C16.9706 3 21 7.02944 21 12C21 14.4853 19.9926 16.7353 18.364 18.364M5.63604 5.63604L12 12L18.364 18.364"
        stroke="#ffffff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </Svg>
  );
};
