import { VStack, type StackProps } from '@chakra-ui/react';

export function CVStack({ children, ...props }: StackProps) {
  return <VStack {...props}>{children}</VStack>;
}
