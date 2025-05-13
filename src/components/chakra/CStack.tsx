import { Stack, type StackProps } from '@chakra-ui/react';

export function CStack({ children, ...props }: StackProps) {
  return <Stack {...props}>{children}</Stack>;
}
