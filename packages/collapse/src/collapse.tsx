
import type {
  ReactNode,
  ReactElement
} from 'react';
import {
  cloneElement,
  createContext,
  useContext
} from 'react';
import type { UseCollapseOptions, CollapseState} from './use-collapse';
import {useCollapse} from './use-collapse';

type CollapseContextValue = Pick<
  CollapseState<HTMLDivElement>,
  'contentRef'
> & {
  collapseProps: ReturnType<CollapseState<HTMLDivElement>['getCollapseProps']>;
  toggleProps: ReturnType<CollapseState<HTMLDivElement>['getToggleProps']>;
};

export const CollapseContext = createContext<CollapseContextValue>(
  {} as CollapseContextValue
);

export const useCollapseContext = () => useContext(CollapseContext);

type ToggleProps = {
  children: ReactElement;
};

export const Toggle = ({children}: ToggleProps) => {
  const {toggleProps} = useCollapseContext();

  return cloneElement(children, toggleProps);
};

type ManagerProps = UseCollapseOptions<HTMLDivElement> & {
  children: ReactNode;
};

export const Manager = ({children, ...rest}: ManagerProps) => {
  const collapse = useCollapse(rest);
  const value = {
    contentRef: collapse.contentRef,
    collapseProps: collapse.getCollapseProps(),
    toggleProps: collapse.getToggleProps()
  };

  return (
    <CollapseContext.Provider value={value}>
      {children}
    </CollapseContext.Provider>
  );
};

type PanelProps = {
  children: ReactNode;
};

export const Panel = ({children}: PanelProps) => {
  const {contentRef, collapseProps} = useCollapseContext();

  return (
    <div {...collapseProps}>
      <div ref={contentRef}>{children}</div>
    </div>
  );
};
