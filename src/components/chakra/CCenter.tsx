import { Center, type CenterProps } from '@chakra-ui/react';

export function CCenter({ children, ...props }: CenterProps) {
  return <Center {...props}>{children}</Center>;
}
