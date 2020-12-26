import {css} from 'theme-ui';
import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  MouseEvent,
  RefObject,
  CSSProperties,
  TransitionEvent
} from 'react';

type CalculateStyleOptions = Required<Pick<CSSProperties, 'overflow'>> & {
  duration: number;
  easing: string;
  isExpanded?: boolean;
  contentHeight?: number;
  expandedHeight?: number;
  isDisabled?: boolean;
  initiallyExpanded?: boolean;
};

type CalculatedStyles = Required<
  Pick<CSSProperties, 'overflow' | 'transition' | 'maxHeight'>
>;

function calculateStyles({
  duration,
  easing,
  isExpanded,
  contentHeight,
  expandedHeight,
  isDisabled,
  overflow
}: CalculateStyleOptions): CalculatedStyles {
  let maxHeight;

  if (isExpanded) {
    // When expanded, use contentHeight if it is defined
    if (typeof contentHeight !== 'undefined') {
      maxHeight = contentHeight;
    }
  } else if (typeof expandedHeight !== 'undefined') {
    // When collapsed, use expandedHeight if it is defined
    maxHeight = Math.max(expandedHeight, 0);
  } else if (!isDisabled) {
    // Otherwise use 0 when expander is not disabled
    maxHeight = '0';
  }

  maxHeight = typeof maxHeight === 'undefined' ? 'unset' : `${maxHeight}px`;

  return {
    overflow,
    transition: `max-height ${duration}ms ${easing}`,
    // Unset maxHeight when it is undefined
    maxHeight
  };
}

export type CollapseState<T extends Element> = {
  contentRef: RefObject<T>;
  getCollapseProps: () => {
    css: ReturnType<typeof css>;
    onTransitionEnd(event: TransitionEvent): void;
  };
  getToggleProps: () => {
    type: string;
    role: string;
    onClick(event: MouseEvent): void;
  };
  isExpanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
};

export type UseCollapseOptions<T> = {
  duration?: number;
  easing?: string;
  initiallyExpanded?: boolean;
  contentRef: RefObject<T>;
  isDisabled?: boolean | boolean[];
};

export function useCollapse<T extends Element>({
  duration = 250,
  easing = 'ease-out',
  initiallyExpanded,
  contentRef,
  ...props
}: UseCollapseOptions<T>): CollapseState<T> {
  const isDisabled = Array.isArray(props.isDisabled)
    ? props.isDisabled
    : [props.isDisabled ?? false];
  const [isExpanded, setExpanded] = useState(initiallyExpanded ?? false);
  const [styles, setStyles] = useState<CalculatedStyles>({
    transition: `max-height ${duration}ms ${easing}`,
    overflow: isExpanded ? 'visible' : 'hidden',
    maxHeight: isExpanded ? 'unset' : '0px'
  });

  useEffect(() => {
    const resizeObserver = new ResizeObserver(([entry]) => {
      requestAnimationFrame(() => {
        if (!entry) {
          return;
        }

        const {height} = entry.target.getBoundingClientRect();

        setStyles(({overflow}) =>
          calculateStyles({
            overflow,
            duration,
            easing,
            isExpanded,
            contentHeight: height
          })
        );
      });
    });

    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [contentRef, duration, easing, isExpanded]);

  function handleTransitionEnd(event: TransitionEvent) {
    if (event.propertyName === 'max-height') {
      setStyles((oldStyles) => ({
        ...oldStyles,
        overflow: isExpanded ? 'visible' : 'hidden'
      }));
    }
  }

  function handleClick() {
    setExpanded((expanded) => !expanded);
    setStyles((oldStyles) => ({
      ...oldStyles,
      overflow: 'hidden'
    }));
  }

  function getCollapseProps() {
    const collapseStyles = {
      ...styles,
      overflow: isDisabled.map((expand) =>
        expand ? 'unset' : styles.overflow
      ),
      maxHeight: isDisabled.map((expand) =>
        expand ? 'unset' : styles.maxHeight
      )
    };

    return {
      css: css(collapseStyles),
      onTransitionEnd: handleTransitionEnd
    };
  }

  function getToggleProps() {
    return {
      type: 'button',
      role: 'button',
      onClick: handleClick
    };
  }

  return {
    contentRef,
    getCollapseProps,
    getToggleProps,
    isExpanded,
    setExpanded
  };
}
