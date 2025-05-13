import { Box, type BoxProps } from '@chakra-ui/react';

export function CBox({ children, ...props }: BoxProps) {
  return <Box {...props}>{children}</Box>;
}
