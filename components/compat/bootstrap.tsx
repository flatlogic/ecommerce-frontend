"use client";

import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type LabelHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { createPortal } from "react-dom";

const classes = (...values: Array<string | false | null | undefined>) =>
  values.filter(Boolean).join(" ");

interface BaseProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  tag?: keyof React.JSX.IntrinsicElements;
}

export function Container({
  className,
  children,
  ...props
}: BaseProps & { fluid?: boolean }) {
  const { fluid, ...htmlProps } = props;
  return (
    <div
      className={classes(fluid ? "container-fluid" : "container", className)}
      {...htmlProps}
    >
      {children}
    </div>
  );
}
export function Row({
  className,
  children,
  ...props
}: BaseProps & { noGutters?: boolean }) {
  const { noGutters, ...htmlProps } = props;
  return (
    <div
      className={classes("row", noGutters && "g-0", className)}
      {...htmlProps}
    >
      {children}
    </div>
  );
}

type Breakpoint =
  | boolean
  | number
  | string
  | { size?: boolean | number | string; offset?: number; order?: number };
interface ColProps extends BaseProps {
  xs?: Breakpoint;
  sm?: Breakpoint;
  md?: Breakpoint;
  lg?: Breakpoint;
  xl?: Breakpoint;
}
function colClass(
  name: string,
  value: Breakpoint | undefined,
): string | undefined {
  if (value === undefined || value === false) return undefined;
  if (value === true) return name;
  if (typeof value === "object")
    return value.size === true
      ? name
      : value.size
        ? `${name}-${value.size}`
        : undefined;
  return `${name}-${value}`;
}
export function Col({
  className,
  children,
  xs,
  sm,
  md,
  lg,
  xl,
  ...props
}: ColProps) {
  const sized = [xs, sm, md, lg, xl].some((value) => value !== undefined);
  return (
    <div
      className={classes(
        !sized && "col",
        colClass("col", xs),
        colClass("col-sm", sm),
        colClass("col-md", md),
        colClass("col-lg", lg),
        colClass("col-xl", xl),
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  outline?: boolean;
  size?: string;
  active?: boolean;
  block?: boolean;
  href?: string;
  target?: string;
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      className,
      color = "secondary",
      outline,
      size,
      active,
      block,
      type = "button",
      href,
      target,
      ...props
    },
    ref,
  ) {
    const buttonClass = classes(
      "btn",
      `btn-${outline ? "outline-" : ""}${color === "default" ? "secondary" : color}`,
      size && `btn-${size}`,
      active && "active",
      block && "w-100",
      className,
    );
    if (href)
      return (
        <a href={href} target={target} className={buttonClass}>
          {props.children}
        </a>
      );
    return <button ref={ref} type={type} className={buttonClass} {...props} />;
  },
);
export function ButtonGroup({ className, ...props }: BaseProps) {
  return (
    <div className={classes("btn-group", className)} role="group" {...props} />
  );
}

export function Form({
  className,
  inline,
  ...props
}: React.FormHTMLAttributes<HTMLFormElement> & { inline?: boolean }) {
  return <form className={classes(inline && "d-flex", className)} {...props} />;
}
export function FormGroup({
  className,
  ...props
}: BaseProps & { check?: boolean }) {
  const { check, ...htmlProps } = props;
  return (
    <div
      className={classes(check ? "form-check" : "mb-3", className)}
      {...htmlProps}
    />
  );
}
export function Label({
  className,
  check,
  htmlFor,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement> & { check?: boolean; for?: string }) {
  const { for: legacyFor, ...htmlProps } = props;
  return (
    <label
      className={classes(check && "form-check-label", className)}
      htmlFor={htmlFor ?? legacyFor}
      {...htmlProps}
    />
  );
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  invalid?: boolean;
  valid?: boolean;
  innerRef?: React.Ref<HTMLInputElement>;
  children?: ReactNode;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, type = "text", invalid, valid, innerRef, children, ...props },
  ref,
) {
  const inputClass = classes(
    type === "checkbox" || type === "radio"
      ? "form-check-input"
      : "form-control",
    invalid && "is-invalid",
    valid && "is-valid",
    className,
  );
  if (type === "select")
    return (
      <select
        className={classes("form-control", className)}
        {...(props as SelectHTMLAttributes<HTMLSelectElement>)}
      >
        {children}
      </select>
    );
  if (type === "textarea")
    return (
      <textarea
        className={inputClass}
        {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
      />
    );
  return (
    <input
      ref={innerRef ?? ref}
      type={type}
      className={inputClass}
      {...props}
    />
  );
});

export function InputGroup({ className, ...props }: BaseProps) {
  return <div className={classes("input-group", className)} {...props} />;
}
export function InputGroupAddon({
  className,
  ...props
}: BaseProps & { addonType?: string }) {
  const { addonType, ...htmlProps } = props;
  return (
    <span
      className={classes(
        addonType === "prepend" ? "input-group-text" : "input-group-text",
        className,
      )}
      {...htmlProps}
    />
  );
}

interface ModalProps extends BaseProps {
  isOpen?: boolean;
  toggle?: () => void;
  size?: string;
  centered?: boolean;
}
export function Modal({
  isOpen,
  toggle,
  size,
  centered,
  className,
  children,
  style,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return undefined;
    document.body.classList.add("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, [isOpen]);

  if (!isOpen) return null;
  return createPortal(
    <>
      <div
        className="modal fade show"
        role="dialog"
        aria-modal="true"
        style={{ display: "block" }}
        onMouseDown={(event) => {
          if (event.currentTarget === event.target) toggle?.();
        }}
      >
        <div
          className={classes(
            "modal-dialog",
            size && `modal-${size}`,
            centered && "modal-dialog-centered",
            className,
          )}
          role="document"
          style={style}
        >
          <div className="modal-content">{children}</div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </>,
    document.body,
  );
}
export function ModalHeader({
  className,
  children,
  toggle,
  ...props
}: BaseProps & { toggle?: () => void }) {
  return (
    <div className={classes("modal-header", className)} {...props}>
      <h5 className="modal-title">{children}</h5>
      {toggle && (
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={toggle}
        />
      )}
    </div>
  );
}
export function ModalBody({ className, ...props }: BaseProps) {
  return <div className={classes("modal-body", className)} {...props} />;
}
export function ModalFooter({ className, ...props }: BaseProps) {
  return <div className={classes("modal-footer", className)} {...props} />;
}

const DropdownContext = createContext<{
  open: boolean;
  toggle: () => void;
} | null>(null);
interface DropdownProps extends BaseProps {
  isOpen?: boolean;
  toggle?: () => void;
  nav?: boolean;
}
export function Dropdown({
  isOpen = false,
  toggle = () => undefined,
  className,
  nav,
  ...props
}: DropdownProps) {
  return (
    <DropdownContext.Provider value={{ open: isOpen, toggle }}>
      <div
        className={classes("dropdown", nav && "nav-item", className)}
        {...props}
      />
    </DropdownContext.Provider>
  );
}
export function UncontrolledDropdown(props: BaseProps) {
  const [open, setOpen] = useState(false);
  return (
    <Dropdown
      {...props}
      isOpen={open}
      toggle={() => setOpen((value) => !value)}
    />
  );
}
export function DropdownToggle({
  className,
  caret,
  nav,
  tag,
  onClick,
  ...props
}: ButtonProps & { caret?: boolean; nav?: boolean; tag?: string }) {
  const context = useContext(DropdownContext);
  void caret;
  void tag;
  return (
    <Button
      className={classes("dropdown-toggle", nav && "nav-link", className)}
      aria-expanded={context?.open}
      onClick={(event) => {
        onClick?.(event);
        context?.toggle();
      }}
      {...props}
    />
  );
}
export function DropdownMenu({
  className,
  ...props
}: BaseProps & { right?: boolean; end?: boolean }) {
  const context = useContext(DropdownContext);
  const { right, end, ...htmlProps } = props;
  return (
    <div
      className={classes(
        "dropdown-menu",
        (right || end) && "dropdown-menu-end",
        context?.open && "show",
        className,
      )}
      {...htmlProps}
    />
  );
}
export function DropdownItem({
  className,
  divider,
  header,
  href,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  divider?: boolean;
  header?: boolean;
  href?: string;
}) {
  if (divider) return <hr className="dropdown-divider" />;
  if (header) return <h6 className="dropdown-header">{props.children}</h6>;
  if (href)
    return (
      <a href={href} className={classes("dropdown-item", className)}>
        {props.children}
      </a>
    );
  return (
    <button
      type="button"
      className={classes("dropdown-item", className)}
      {...props}
    />
  );
}

export function Collapse({
  isOpen,
  children,
  className,
  ...props
}: BaseProps & { isOpen?: boolean }) {
  return (
    <div
      className={classes("collapse", isOpen && "show", className)}
      {...props}
    >
      {children}
    </div>
  );
}
export function Alert({
  color = "info",
  className,
  ...props
}: BaseProps & { color?: string }) {
  return (
    <div
      role="alert"
      className={classes("alert", `alert-${color}`, className)}
      {...props}
    />
  );
}
export function Badge({
  color = "secondary",
  pill,
  className,
  ...props
}: BaseProps & { color?: string; pill?: boolean }) {
  return (
    <span
      className={classes(
        "badge",
        `text-bg-${color}`,
        pill && "rounded-pill",
        className,
      )}
      {...props}
    />
  );
}
export function Progress({
  value = 0,
  max = 100,
  color = "primary",
  className,
  ...props
}: BaseProps & { value?: number; max?: number; color?: string }) {
  const percent = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={classes("progress", className)} {...props}>
      <div
        className={`progress-bar bg-${color}`}
        style={{ width: `${percent}%` }}
      >
        {props.children}
      </div>
    </div>
  );
}
interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  borderless?: boolean;
  bordered?: boolean;
  striped?: boolean;
  hover?: boolean;
  dark?: boolean;
  size?: string;
}
export function Table({
  className,
  borderless,
  bordered,
  striped,
  hover,
  dark,
  size,
  ...props
}: TableProps) {
  return (
    <table
      className={classes(
        "table",
        borderless && "table-borderless",
        bordered && "table-bordered",
        striped && "table-striped",
        hover && "table-hover",
        dark && "table-dark",
        size && `table-${size}`,
        className,
      )}
      {...props}
    />
  );
}

export function Breadcrumb({
  className,
  tag,
  listTag,
  children,
  ...props
}: BaseProps & { listTag?: keyof React.JSX.IntrinsicElements }) {
  const Tag = tag === "div" ? "div" : "nav";
  const ListTag = listTag === "div" ? "div" : "ol";
  return (
    <Tag aria-label="breadcrumb" {...props}>
      <ListTag className={classes("breadcrumb", className)}>{children}</ListTag>
    </Tag>
  );
}
export function BreadcrumbItem({
  className,
  active,
  ...props
}: BaseProps & { active?: boolean }) {
  return (
    <li
      className={classes("breadcrumb-item", active && "active", className)}
      {...props}
    />
  );
}
export function Pagination({ className, ...props }: BaseProps) {
  return (
    <nav>
      <ul className={classes("pagination", className)} {...props} />
    </nav>
  );
}
export function PaginationItem({
  className,
  active,
  disabled,
  ...props
}: BaseProps & { active?: boolean; disabled?: boolean }) {
  return (
    <li
      className={classes(
        "page-item",
        active && "active",
        disabled && "disabled",
        className,
      )}
      {...props}
    />
  );
}
export function PaginationLink({
  className,
  previous,
  next,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  previous?: boolean;
  next?: boolean;
}) {
  return (
    <a className={classes("page-link", className)} {...props}>
      {children ?? (previous ? "‹" : next ? "›" : null)}
    </a>
  );
}

export function Nav({
  className,
  tabs,
  pills,
  ...props
}: BaseProps & { tabs?: boolean; pills?: boolean }) {
  return (
    <ul
      className={classes(
        "nav",
        tabs && "nav-tabs",
        pills && "nav-pills",
        className,
      )}
      {...props}
    />
  );
}
export function NavItem({ className, ...props }: BaseProps) {
  return <li className={classes("nav-item", className)} {...props} />;
}
export function NavLink({
  className,
  active,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { active?: boolean }) {
  return (
    <a
      className={classes("nav-link", active && "active", className)}
      {...props}
    />
  );
}
export function Navbar({ className, ...props }: BaseProps) {
  return <nav className={classes("navbar", className)} {...props} />;
}
export function NavbarBrand({
  className,
  href,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return href ? (
    <a href={href} className={classes("navbar-brand", className)} {...props} />
  ) : (
    <span className={classes("navbar-brand", className)} {...props} />
  );
}
export function NavbarText({ className, ...props }: BaseProps) {
  return <span className={classes("navbar-text", className)} {...props} />;
}

export function Toast({
  className,
  isOpen = true,
  ...props
}: BaseProps & { isOpen?: boolean }) {
  return isOpen ? (
    <div
      className={classes("toast show", className)}
      role="status"
      {...props}
    />
  ) : null;
}
export function ToastBody({ className, ...props }: BaseProps) {
  return <div className={classes("toast-body", className)} {...props} />;
}
export function UncontrolledTooltip({
  children,
}: {
  children?: ReactNode;
  target?: string | undefined;
  placement?: string | undefined;
}) {
  return <span className="visually-hidden">{children}</span>;
}
