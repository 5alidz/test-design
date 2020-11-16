import { InputHTMLAttributes, ReactNode } from 'react';
import cls from '@5alid/cls';

interface CheckboxInputProps extends InputHTMLAttributes<HTMLInputElement> {
  children: ReactNode;
}

export function CheckboxInput(props: CheckboxInputProps) {
  return <input {...props} type='checkbox' className={cls(props.className)} />;
}
