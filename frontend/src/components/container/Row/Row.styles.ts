import { css } from "@linaria/core";

const styles = {
  root: css`
    display: flex;
    flex-direction: row;
  `,
  fullSize: css`
    width: 100%;
    height: 100%;
  `,
} as const;

export default styles;
