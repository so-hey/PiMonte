import { Heading, type HeadingProps } from '@chakra-ui/react';

export function CHeading({ children, ...props }: HeadingProps) {
  return <Heading {...props}>{children}</Heading>;
}
