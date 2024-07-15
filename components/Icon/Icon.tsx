import { FunctionComponent, useMemo } from "react";

import { icons, iconSizes } from "./Icon.const";
import { IconProps, IconSizes } from "./Icon.type";

const Icon: FunctionComponent<IconProps> = ({
  name,
  width,
  height,
  size = IconSizes.Small,
  ...props
}: IconProps) => {
  const TagName = icons[name];

  const iconWidth = useMemo<number>(
    () => width || iconSizes[size],
    [width, size]
  );
  const iconHeight = useMemo<number>(
    () => height || iconSizes[size],
    [height, size]
  );

  return <TagName width={iconWidth} height={iconHeight} {...props} />;
};

export { Icon };
