import * as React from "react";
import NextLink, { LinkProps } from "next/link";

// `LinkBehavior` artık tam olarak Anchor gibi davranıyor
const LinkBehavior = React.forwardRef<HTMLAnchorElement, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & LinkProps>(
  ({ href, ...other }, ref) => {
    if (!href) {
      // hiç link yok → sadece span döner
      return <span {...other} ref={ref as any} />;
    }
    return <NextLink ref={ref} href={href} {...other} />;
  }
);

LinkBehavior.displayName = "LinkBehavior";

export default LinkBehavior;