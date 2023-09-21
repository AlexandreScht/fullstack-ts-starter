'use client';

import cn from '@/utils/cn';
import { Switch } from '@nextui-org/switch';
import type { customClass, itemsContent, NewButtonsType, toggleButtonsPropsUI } from 'next-ui';
import React, { useEffect, useRef, useState } from 'react';

const ToggleButton = ({
  isSelected,
  classNames,
  className,
  children,
  disabled,
  thumbIcons,
  thumbIcon,
  ...other
}: NewButtonsType<toggleButtonsPropsUI>) => {
  const [toggleSwitch, setToggleSwitch] = useState<boolean | undefined>(thumbIcon);
  const el = useRef<HTMLDivElement | null>(null);
  const [selected, setSelected] = useState<boolean | undefined>();

  useEffect(() => {
    if (!el) {
      return;
    }
    setSelected(isSelected);
    setToggleSwitch(isSelected);
  }, [isSelected]);

  return (
    <div
      className={cn(
        'z-0',
        {
          'cursor-not-allowed': disabled,
        },
        className,
      )}
    >
      <Switch
        ref={el}
        isSelected={selected}
        onChange={() => setToggleSwitch(!toggleSwitch)}
        isDisabled={disabled}
        thumbIcon={ItemsContents(thumbIcons, toggleSwitch, classNames?.thumbIcon)}
        classNames={classNames}
        {...other}
      >
        {children}
      </Switch>
    </div>
  );
};

export default ToggleButton;

function ItemsContents(JSXarr: itemsContent | undefined, toggle?: boolean, className?: customClass): JSX.Element | null {
  if (!JSXarr) {
    return null;
  }

  if (JSXarr.length === 1) {
    const JSX = JSXarr[0];
    const getClassNameIcons = className ? className[0] : '';
    return <JSX className={getClassNameIcons} />;
  }

  const getClassNameIcons = className ? (toggle ? className[0] : className[1]) ?? '' : '';
  const JSX = toggle ? JSXarr[0] : JSXarr[1] ?? '';

  return <JSX className={getClassNameIcons} />;
}

//? Les valeurs de remplacement
/*
"group-data-[hover=false]": "not:hover:",
  "group-data-[selected=false]": "not:selected:",
  "group-data-[pressed=false]": "not:pressed:",
  "group-data-[hover]:group-data-[selected]": "hover:selected:",
  "group-data-[selected]:group-data-[hover]": "selected:hover:",
  "group-data-[pressed]:group-data-[hover]": "pressed:hover:",
  "group-data-[hover]:group-data-[pressed]": "hover:pressed:",
  "group-data-[selected]:group-data-[pressed]": "selected:pressed:",
  "group-data-[pressed]:group-data-[selected]": "pressed:selected:",
  "group-data-[hover=true]": "hover:",
  "group-data-[selected=true]": "selected:",
  "group-data-[pressed=true]": "pressed:",
*/
