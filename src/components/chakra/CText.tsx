import { Text, type TextProps } from '@chakra-ui/react';

export function CText({ children, ...props }: TextProps) {
  return <Text {...props}>{children}</Text>;
}
