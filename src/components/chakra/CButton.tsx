import { Button, type ButtonProps } from '@chakra-ui/react';

export function CButton({ children, ...props }: ButtonProps) {
  return <Button {...props}>{children}</Button>;
}
