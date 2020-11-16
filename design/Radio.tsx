import { InputHTMLAttributes, ReactNode } from 'react';
import cls from '@5alid/cls';

interface RadioInputProps extends InputHTMLAttributes<HTMLInputElement> {
  children: ReactNode;
}

export function RadioInput(props: RadioInputProps) {
  return <input {...props} type='radio' className={cls(props.className)} />;
}
