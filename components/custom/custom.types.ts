export interface ILayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  fixed?: boolean;
}

export interface IBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  'data-layout'?: string;
}

export interface IHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  sticky?: boolean;
}
