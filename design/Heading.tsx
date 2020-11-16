import cls from '@5alid/cls';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface HeadingProps extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const font = 'font-title font-bold' as const;

const fontSize = {
  1: 'text-h1',
  2: 'text-h2',
  3: 'text-h3',
  4: 'text-h4',
  5: 'text-h5',
  6: 'text-h6',
};

export function Heading({ level = 4, className, ...props }: HeadingProps) {
  if (level == 1)
    return (
      <h1 {...props} className={cls(font, fontSize[level], className)}>
        {props.children}
      </h1>
    );
  if (level == 2)
    return (
      <h2 {...props} className={cls(font, fontSize[level], className)}>
        {props.children}
      </h2>
    );
  if (level == 3)
    return (
      <h3 {...props} className={cls(font, fontSize[level], className)}>
        {props.children}
      </h3>
    );
  if (level == 4)
    return (
      <h4 {...props} className={cls(font, fontSize[level], className)}>
        {props.children}
      </h4>
    );
  if (level == 5)
    return (
      <h5 {...props} className={cls(font, fontSize[level], className)}>
        {props.children}
      </h5>
    );
  if (level == 6)
    return (
      <h6 {...props} className={cls(font, fontSize[level], className)}>
        {props.children}
      </h6>
    );
  return (
    <h3 {...props} className={cls(font, fontSize[level], className)}>
      {props.children}
    </h3>
  );
}
