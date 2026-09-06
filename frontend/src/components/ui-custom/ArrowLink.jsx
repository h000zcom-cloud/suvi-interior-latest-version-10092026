import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const ArrowLink = ({ to, href, children, className, dark = false, ...rest }) => {
  const cls = cn("arrow-link", dark ? "text-ivory/80 hover:text-brass" : "text-charcoal", className);
  const inner = (
    <>
      <span className="link-underline">{children}</span>
      <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
    </>
  );
  if (href) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <Link to={to} className={cls} {...rest}>
      {inner}
    </Link>
  );
};
