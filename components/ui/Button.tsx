import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  onClick,
  href,
}) => {
  const classes = `btn btn--${variant} btn--${size} ${className}`;

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
  };

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        onClick={onClick}
        {...motionProps}
      >
        {children}
        {icon && <span style={{ display: 'inline-flex' }}>{icon}</span>}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      onClick={onClick}
      {...motionProps}
    >
      {children}
      {icon && <span style={{ display: 'inline-flex' }}>{icon}</span>}
    </motion.button>
  );
};
