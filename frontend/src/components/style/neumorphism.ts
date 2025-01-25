import { css } from "@linaria/core";

const neumorphismStyles = {
  convex: css`
    border-radius: 16px;
    box-shadow:
      20px 20px 60px #bebebe,
      -20px -20px 60px #ffffff;
  `,
  concave: css`
    border-radius: 16px;
    box-shadow:
      inset 20px 20px 60px #bebebe,
      inset -20px -20px 60px #ffffff;
  `,
};

export default neumorphismStyles;
