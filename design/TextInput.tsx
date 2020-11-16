import { InputHTMLAttributes, ReactNode } from 'react';
import cls from '@5alid/cls';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  children: ReactNode;
  type?: 'text' | 'number' | 'tel' | 'email' | 'password';
}

export function TextInput(props: TextInputProps) {
  return <input {...props} type={props.type} className={cls(props.className)} />;
}
