import { css, LinariaClassName } from "@linaria/core";

const traitTypes = {
  spacing: {
    directions: ["m", "mt", "mr", "mb", "ml", "p", "pt", "pr", "pb", "pl"],
    sizes: [0, 1, 2, 3, 4, 5],
  },
  overflow: ["hidden", "auto", "scroll", "visible"],
  whitespace: ["normal", "nowrap", "pre", "pre-wrap", "pre-line", "break-spaces"],
} as const;

type Direction = (typeof traitTypes.spacing.directions)[number];
type Size = (typeof traitTypes.spacing.sizes)[number];
type OverflowType = (typeof traitTypes.overflow)[number];
type WhitespaceType = (typeof traitTypes.whitespace)[number];

type CommonStyleProps = {
  [K in Direction]?: Size;
} & {
  overflow?: OverflowType;
  overflowX?: OverflowType;
  overflowY?: OverflowType;
  whitespace?: WhitespaceType;
};

const trait = {
  spacing: {
    m: {
      0: css`
        margin: 0px;
      `,
      1: css`
        margin: 4px;
      `,
      2: css`
        margin: 8px;
      `,
      3: css`
        margin: 12px;
      `,
      4: css`
        margin: 16px;
      `,
      5: css`
        margin: 20px;
      `,
    },
    mt: {
      0: css`
        margin-top: 0px;
      `,
      1: css`
        margin-top: 4px;
      `,
      2: css`
        margin-top: 8px;
      `,
      3: css`
        margin-top: 12px;
      `,
      4: css`
        margin-top: 16px;
      `,
      5: css`
        margin-top: 20px;
      `,
    },
    mr: {
      0: css`
        margin-right: 0px;
      `,
      1: css`
        margin-right: 4px;
      `,
      2: css`
        margin-right: 8px;
      `,
      3: css`
        margin-right: 12px;
      `,
      4: css`
        margin-right: 16px;
      `,
      5: css`
        margin-right: 20px;
      `,
    },
    mb: {
      0: css`
        margin-bottom: 0px;
      `,
      1: css`
        margin-bottom: 4px;
      `,
      2: css`
        margin-bottom: 8px;
      `,
      3: css`
        margin-bottom: 12px;
      `,
      4: css`
        margin-bottom: 16px;
      `,
      5: css`
        margin-bottom: 20px;
      `,
    },
    ml: {
      0: css`
        margin-left: 0px;
      `,
      1: css`
        margin-left: 4px;
      `,
      2: css`
        margin-left: 8px;
      `,
      3: css`
        margin-left: 12px;
      `,
      4: css`
        margin-left: 16px;
      `,
      5: css`
        margin-left: 20px;
      `,
    },
    p: {
      0: css`
        padding: 0px;
      `,
      1: css`
        padding: 4px;
      `,
      2: css`
        padding: 8px;
      `,
      3: css`
        padding: 12px;
      `,
      4: css`
        padding: 16px;
      `,
      5: css`
        padding: 20px;
      `,
    },
    pt: {
      0: css`
        padding-top: 0px;
      `,
      1: css`
        padding-top: 4px;
      `,
      2: css`
        padding-top: 8px;
      `,
      3: css`
        padding-top: 12px;
      `,
      4: css`
        padding-top: 16px;
      `,
      5: css`
        padding-top: 20px;
      `,
    },
    pr: {
      0: css`
        padding-right: 0px;
      `,
      1: css`
        padding-right: 4px;
      `,
      2: css`
        padding-right: 8px;
      `,
      3: css`
        padding-right: 12px;
      `,
      4: css`
        padding-right: 16px;
      `,
      5: css`
        padding-right: 20px;
      `,
    },
    pb: {
      0: css`
        padding-bottom: 0px;
      `,
      1: css`
        padding-bottom: 4px;
      `,
      2: css`
        padding-bottom: 8px;
      `,
      3: css`
        padding-bottom: 12px;
      `,
      4: css`
        padding-bottom: 16px;
      `,
      5: css`
        padding-bottom: 20px;
      `,
    },
    pl: {
      0: css`
        padding-left: 0px;
      `,
      1: css`
        padding-left: 4px;
      `,
      2: css`
        padding-left: 8px;
      `,
      3: css`
        padding-left: 12px;
      `,
      4: css`
        padding-left: 16px;
      `,
      5: css`
        padding-left: 20px;
      `,
    },
  },
  overflow: {
    hidden: css`
      overflow: hidden;
    `,
    auto: css`
      overflow: auto;
    `,
    scroll: css`
      overflow: scroll;
    `,
    visible: css`
      overflow: visible;
    `,
  },
  overflowX: {
    hidden: css`
      overflow-x: hidden;
    `,
    auto: css`
      overflow-x: auto;
    `,
    scroll: css`
      overflow-x: scroll;
    `,
    visible: css`
      overflow-x: visible;
    `,
  },
  overflowY: {
    hidden: css`
      overflow-y: hidden;
    `,
    auto: css`
      overflow-y: auto;
    `,
    scroll: css`
      overflow-y: scroll;
    `,
    visible: css`
      overflow-y: visible;
    `,
  },
  whitespace: {
    normal: css`
      white-space: normal;
    `,
    nowrap: css`
      white-space: nowrap;
    `,
    pre: css`
      white-space: pre;
    `,
    "pre-wrap": css`
      white-space: pre-wrap;
    `,
    "pre-line": css`
      white-space: pre-line;
    `,
    "break-spaces": css`
      white-space: break-spaces;
    `,
  },
};

const getCommonStylesClasses = (props: CommonStyleProps): LinariaClassName[] => {
  const classes: LinariaClassName[] = [];

  traitTypes.spacing.directions.forEach((direction) => {
    if (direction in props && typeof props[direction as Direction] === "number") {
      const size = props[direction as Direction] as Size;
      classes.push(trait.spacing[direction as Direction][size]);
    }
  });

  if (props.overflow) classes.push(trait.overflow[props.overflow]);
  if (props.overflowX) classes.push(trait.overflowX[props.overflowX]);
  if (props.overflowY) classes.push(trait.overflowY[props.overflowY]);
  if (props.whitespace) classes.push(trait.whitespace[props.whitespace]);

  return classes;
};

export { getCommonStylesClasses };
export type { CommonStyleProps, Direction, Size, OverflowType, WhitespaceType };
export default trait;
