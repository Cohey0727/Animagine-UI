import clsx from "clsx";
import styles from "./Col.styles";
import { Merge } from "@/utils";
import { neumorphismStyles, getCommonStylesClasses, CommonStyleProps } from "@/components/style";

type ColProps = Merge<
  React.ComponentProps<"div">,
  {
    variant?: "default" | "convex" | "concave";
    fullSize?: boolean;
  } & CommonStyleProps
>;

const Col = (props: ColProps) => {
  const { variant = "default", fullSize, className, ...rest } = props;
  const spacingClasses = getCommonStylesClasses(props);
  return (
    <div
      className={clsx(
        styles.root,
        variant !== "default" && neumorphismStyles[variant],
        fullSize && styles.fullSize,
        ...spacingClasses,
        className,
      )}
      {...rest}
    />
  );
};

export type { ColProps };
export default Col;
