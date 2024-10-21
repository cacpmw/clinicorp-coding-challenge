import { twMerge } from "tailwind-merge";

export function Separator(props) {
  return (
    <div {...props} className={twMerge("h-px bg-zinc-900", props.className)} />
  );
}
