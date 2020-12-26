/** @jsx jsx */
import {jsx} from 'theme-ui';
import {
  cloneElement,
  createContext,
  useContext,
  ReactNode,
  ReactElement
} from 'react';
import {useCollapse, UseCollapseOptions, CollapseState} from './use-collapse';

export const CollapseContext = createContext<CollapseState<HTMLDivElement>>(
  {} as CollapseState<HTMLDivElement>
);

export const useCollapseContext = () => useContext(CollapseContext);

type ToggleProps = {
  children: ReactElement;
};

export const Toggle = ({children}: ToggleProps) => {
  const {getToggleProps} = useCollapseContext();

  return cloneElement(children, getToggleProps());
};

type ManagerProps = UseCollapseOptions<HTMLDivElement> & {
  children: ReactNode;
};

export const Manager = ({children, ...rest}: ManagerProps) => {
  const collapse = useCollapse(rest);

  return (
    <CollapseContext.Provider value={collapse}>
      {children}
    </CollapseContext.Provider>
  );
};

type PanelProps = {
  children: ReactNode;
};

export const Panel = ({children}: PanelProps) => {
  const {contentRef, getCollapseProps} = useCollapseContext();

  return (
    <div {...getCollapseProps()}>
      <div ref={contentRef}>{children}</div>
    </div>
  );
};
