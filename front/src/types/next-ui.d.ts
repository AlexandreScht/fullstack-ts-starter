declare module 'next-ui' {
  import type { ButtonProps } from '@nextui-org/button';
  import type { InputProps } from '@nextui-org/input';
  import type { SwitchProps } from '@nextui-org/switch';

  // TODO : Communs types

  type inputType =
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';

  type InputReactProps = React.InputHTMLAttributes<HTMLInputElement>;
  type ButtonReactProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

  type itemsContent = [ReactNode, ReactNode?];

  type customClass = [string, string?];

  // { length: 1 | 2 }
  // * input fields types
  type inputFieldCustomClassNames = {
    endContents?: customClass;
    startContents?: customClass;
  };

  type NewInputType<Props> = {
    [K in keyof Props]: K extends 'startContent' | 'endContent' ? never : Props[K];
  };

  type inputCustomProps = {
    name: string;
    type: InputType;
    showError?: boolean;
    error?: boolean;
    startContents?: itemsContent;
    endContents?: itemsContent;
    classNames?: inputFieldCustomClassNames;
  };

  type inputPropsUI = inputCustomProps & InputReactProps & InputProps;

  // * button types
  type buttonPropsUI = ButtonReactProps & ButtonProps;

  // * button toggleSwitch types

  type toggleButtonsClassNames = {
    base?: string;
    label?: string;
    startContent?: string;
    endContent?: string;
    wrapper?: string;
    thumb?: string;
    thumbIcon?: customClass;
  };

  type NewButtonsType<Props> = Props & {
    [K in keyof Props]: K extends 'thumbIcon' ? never : Props[K];
  };

  type toggleCustomProps = {
    thumbIcons?: itemsContent;
    required?: boolean;
    classNames?: toggleButtonsClassNames;
  };

  type toggleButtonsPropsUI = toggleCustomProps & ButtonReactProps & SwitchProps;
}
