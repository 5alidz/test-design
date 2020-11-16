import { ButtonHTMLAttributes, ReactNode } from 'react';
import cls from '@5alid/cls';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Button(props: ButtonProps) {
  return (
    <button {...props} className={cls(props.className)}>
      {props.children}
    </button>
  );
}
