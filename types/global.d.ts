import type {SystemStyleObject} from '@styled-system/css';
import type {Interpolation, Theme} from '@emotion/react';

export type SxStyleProp = SystemStyleObject;

export interface SxProps {
  /**
   * The sx prop lets you style elements inline, using values from your
   * theme. To use the sx prop, add the custom pragma as a comment to the
   * top of your module and import the jsx function.
   *
   * ```ts
   * // @jsx jsx
   *
   * import { jsx } from 'theme-ui'
   * ```
   */
  sx?: SxStyleProp;

  css?: Interpolation<Theme>;
}

declare module 'react' {
  interface Attributes {
    sx?: SxStyleProp;
    css?: Interpolation<Theme>;
  }
}
