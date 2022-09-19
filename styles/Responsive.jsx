import { css } from "styled-components";

export const BREAK_POINTS = {
  mobile: (...args) => css`
    @media (max-width: 640px) {
      ${css(...args)}
    }
  `,
  tablet: (...args) => css`
    @media (min-width: 641px) and (max-width: 800px) {
      ${css(...args)}
    }
  `,
  laptop: (...args) => css`
    @media (min-width: 801px) and (max-width: 1024px) {
      ${css(...args)}
    }
  `,
  desktop: (...args) => css`
    @media (min-width: 1025px) {
      ${css(...args)}
    }
  `,
};
