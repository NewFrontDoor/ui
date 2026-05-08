import {
  createContext,
  createElement,
  useContext,
  type ElementType,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode
} from 'react';

export type RadioValue = string | number | boolean;

export type RadioProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'name' | 'checked' | 'onChange'
> & {
  value: RadioValue;
};

export type RadioGroupProps = Omit<HTMLAttributes<HTMLElement>, 'onChange'> & {
  name?: string;
  selectedValue?: RadioValue;
  onChange?: (value: RadioValue) => void;
  children: ReactNode;
  Component?: ElementType;
};

type RadioGroupContextValue = {
  name?: string;
  selectedValue?: RadioValue;
  onChange?: (value: RadioValue) => void;
};

const RadioGroupContext = createContext<RadioGroupContextValue>({});

export function Radio({value, ...props}: RadioProps) {
  const {name, selectedValue, onChange} = useContext(RadioGroupContext);
  const optionalProps =
    selectedValue === undefined
      ? {}
      : {
          checked: value === selectedValue,
          'aria-checked': value === selectedValue
        };

  return createElement('input', {
    ...props,
    ...optionalProps,
    role: 'radio',
    type: 'radio',
    name,
    value: String(value),
    onChange: () => onChange?.(value)
  });
}

export function RadioGroup({
  Component = 'div',
  name,
  selectedValue,
  onChange,
  children,
  ...rest
}: RadioGroupProps) {
  return createElement(
    RadioGroupContext.Provider,
    {value: {name, selectedValue, onChange}},
    createElement(Component, {role: 'radiogroup', ...rest}, children)
  );
}
