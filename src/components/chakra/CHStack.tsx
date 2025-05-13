import { HStack, type StackProps } from '@chakra-ui/react';

export function CHStack({ children, ...props }: StackProps) {
  return <HStack {...props}>{children}</HStack>;
}
