import { twMerge } from 'tailwind-merge'

export function Label(props) {
  return (
    <label
      {...props}
      className={twMerge(
        "text-zinc-50 font-medium text-sm tracking-tight leading-normal",
        props.className,
      )}
    />
  );
}
