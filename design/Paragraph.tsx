import cls from '@5alid/cls';
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

interface ParagraphProps extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
  children: ReactNode;
}

export function Paragraph(props: ParagraphProps) {
  return (
    <p {...props} className={cls(props.className)}>
      {props.children}
    </p>
  );
}
