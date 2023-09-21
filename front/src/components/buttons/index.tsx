'use client';

import cn from '@/utils/cn';
import { Button as UiButton } from '@nextui-org/react';
import type { buttonPropsUI } from 'next-ui';

const Button = ({ children, disabled, className, isLoading, ...other }: buttonPropsUI) => {
  return (
    <div className={cn({ 'cursor-not-allowed opacity-70': disabled || isLoading })}>
      <UiButton
        className={cn(
          'border-black border-1 bg-slate-50 rounded-lg py-2 w-28 transition duration-500 outline outline-offset-0 text-md font-medium',
          {
            'hover:text-white hover:bg-black': !disabled,
          },
          className,
        )}
        isDisabled={disabled}
        isLoading={isLoading}
        {...other}
      >
        {isLoading ? 'Loading' : children}
      </UiButton>
    </div>
  );
};

export default Button;
