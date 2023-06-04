import React from 'react';
import { Text, TextProps } from '@mantine/core';

export default function Typography({ children, ...props }: TextProps) {
  return <Text {...props}>{children}</Text>;
}
