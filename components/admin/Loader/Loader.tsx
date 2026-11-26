import LegacyIcon from "components/compat/LegacyIcon";
import cx from "classnames";
import s from "./Loader.module.scss";

interface LoaderProps {
  className?: string | undefined;
  size?: number;
}

export default function Loader({ className, size = 21 }: LoaderProps) {
  return (
    <div className={cx(s.root, className)}>
      <LegacyIcon
        className="la la-spinner la-spin"
        style={{ fontSize: size }}
      />
    </div>
  );
}
