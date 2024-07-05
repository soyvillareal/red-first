import { IIconsProps } from './icons.types';

export const ArrowDownIcon = ({
  className,
  width = 24,
  height = 24,
}: IIconsProps) => (
  <svg
    className={className}
    width={width}
    height={height}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1.56 1.56"
    enableBackground="new 0 0 52 52"
    xmlSpace="preserve"
  >
    <path d="M0.288 0.93c-0.024 0.024 -0.024 0.057 0 0.081l0.45 0.441c0.024 0.024 0.06 0.024 0.084 0l0.453 -0.441c0.024 -0.024 0.024 -0.057 0 -0.081l-0.084 -0.081c-0.024 -0.024 -0.06 -0.024 -0.084 0l-0.141 0.138c-0.024 0.024 -0.066 0.009 -0.066 -0.027V0.15c0 -0.03 -0.027 -0.06 -0.06 -0.06h-0.12c-0.033 0 -0.06 0.033 -0.06 0.06v0.81c0 0.036 -0.042 0.051 -0.066 0.027l-0.141 -0.138c-0.024 -0.024 -0.06 -0.024 -0.084 0z" />
  </svg>
);
