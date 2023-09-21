'use client';

import ToggleButton from '@/components/buttons/toggle';
import cn from '@/utils/cn';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/Fi';
import { BsFillCloudsFill, BsStars } from 'react-icons/bs';

const ToggleThemeSwitcher = () => {
  const { setTheme, theme } = useTheme();
  const [isSelected, setIsSelected] = useState(theme === 'light');

  useEffect(() => {
    console.log(theme);

    setTheme(isSelected ? 'light' : 'dark');
  }, [isSelected, setTheme]);

  return (
    <div className="w-full flex justify-between">
      <ToggleButton
        isSelected={isSelected}
        onValueChange={setIsSelected}
        startContent={<FiSun />}
        endContent={<FiMoon />}
        thumbIcons={[BsFillCloudsFill, BsStars]}
        classNames={{
          endContent: 'fill-indigo-500 stroke-violet-500 text-2xl',
          startContent: 'fill-amber-500 stroke-red-500 text-2xl',
          thumb: cn(
            'w-6 h-6 border-2',
            'group-data-[hover=true]:border-yellow-500 group-data-[hover]:group-data-[selected]:border-red-500',
            'group-data-[selected=true]:ml-6',
            'bg-slate-400',
            'border-black group-data-[selected=true]:border-white',
            'group-data-[selected=true]:bg-white',
            'group-data-[selected]:group-data-[pressed]:ml-6',
          ),
          thumbIcon: ['group-data-[selected=true]:text-slate-500', 'text-yellow-500'],
          wrapper: 'px-2 py-1 w-full h-full',
          base: 'w-16 h-8 ',
        }}
      >
        light/dark
      </ToggleButton>
    </div>
  );
};

export default ToggleThemeSwitcher;
