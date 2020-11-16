import { TextareaHTMLAttributes, ReactNode } from 'react';
import cls from '@5alid/cls';

interface TextareaInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  children: ReactNode;
}

export function TextareaInput(props: TextareaInputProps) {
  return <textarea {...props} className={cls(props.className)} />;
}
