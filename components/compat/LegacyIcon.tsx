"use client";

import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  Circle,
  Home,
  KeyRound,
  Link as LinkIcon,
  LoaderCircle,
  LogOut,
  Menu,
  Maximize2,
  Minimize2,
  RefreshCw,
  Search,
  Settings,
  User,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import type { ComponentProps } from "react";

const icons: Record<string, LucideIcon> = {
  "angle-left": ChevronLeft,
  "angle-down": ChevronDown,
  "angle-up": ChevronUp,
  "arrow-right": ArrowRight,
  bars: Menu,
  book: BookOpen,
  check: Check,
  circle: Circle,
  cog: Settings,
  home: Home,
  key: KeyRound,
  link: LinkIcon,
  expand: Maximize2,
  compress: Minimize2,
  refresh: RefreshCw,
  remove: X,
  search: Search,
  "sign-out": LogOut,
  spinner: LoaderCircle,
  times: X,
  user: User,
  users: Users,
};

type Props = Omit<ComponentProps<"svg">, "ref"> & { title?: string };

export default function LegacyIcon({ className = "", title, ...props }: Props) {
  const iconName = className.match(/\bla-([a-z0-9-]+)/)?.[1] ?? "circle";
  const Icon = icons[iconName] ?? Circle;
  return (
    <Icon
      aria-hidden={title ? undefined : "true"}
      aria-label={title}
      size={16}
      className={className}
      {...props}
    />
  );
}
