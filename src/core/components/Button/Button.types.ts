import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonEffects {
  ripple?: boolean;
  hover?: boolean;
  bounce?: boolean;
  glow?: boolean;
  shadowEffect?: boolean;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
  effects?: ButtonEffects;
}