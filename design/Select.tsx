import { SelectHTMLAttributes, ReactNode } from 'react';
import cls from '@5alid/cls';

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
}

export function TextareaInput(props: SelectInputProps) {
  return (
    <select {...props} className={cls(props.className)}>
      {props.children}
    </select>
  );
}
