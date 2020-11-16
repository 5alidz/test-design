import cls from '@5alid/cls';
import { Button as BaseButton } from 'design/Button';
import { ReactNode } from 'react';

interface ButtonProps {
  color?: 'primary' | 'secondary' | 'success' | 'error';
  variant?: 'filled' | 'border';
  disabled?: boolean;
  icon?: ReactNode;
  shape?: 'default' | 'pill';
  className?: string;
  children: ReactNode;
}

const buttonHTMLStates = {
  disabled: 'disabled:opacity-50',
  focus: 'focus:outline-none focus:shadow-focus focus:border-theme-focusBorder',
  active: 'active:opacity-75',
} as const;

const buttonVariants = {
  filled: {
    primary: 'bg-theme-primary border border-theme-primary text-white',
    secondary: 'bg-theme-secondary border-theme-secondary text-white',
    success: 'bg-theme-success border-theme-success text-white',
    error: 'bg-theme-error border-theme-error text-white',
  },
  border: {
    primary: 'text-theme-primary border-theme-primary',
    secondary: 'text-theme-secondary border-theme-secondary',
    success: 'text-theme-success border-theme-success',
    error: 'text-theme-error border-theme-error',
  },
} as const;

export function Button({
  color = 'primary',
  variant = 'filled',
  disabled,
  icon,
  className,
  shape = 'default',
  children,
}: ButtonProps) {
  return (
    <BaseButton
      disabled={disabled}
      className={cls(
        ...Object.values(buttonHTMLStates),
        [shape == 'pill', 'rounded-full', 'rounded-md'],
        'px-4 py-1 font-semibold tracking-wide border select-none transition-all duration-100 flex justify-center items-center',
        buttonVariants[variant][color],
        className
      )}
    >
      {icon && <div className='pr-2'>{icon}</div>}
      <div className='whitespace-no-wrap'>{children}</div>
    </BaseButton>
  );
}

interface IconButtonProps {
  color?: 'primary' | 'secondary' | 'success' | 'error';
  variant?: 'filled' | 'border';
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

export function IconButton({ variant = 'filled', color = 'primary', disabled, children }: IconButtonProps) {
  return (
    <div className='flex items-center'>
      <BaseButton
        disabled={disabled}
        className={cls(
          ...Object.values(buttonHTMLStates),
          buttonVariants[variant][color],
          'rounded-full border flex w-8 h-8 justify-center items-center'
        )}
      >
        {children}
      </BaseButton>
    </div>
  );
}
