export interface ISelectorYearProps {
  yearsData: string[] | undefined;
  value: string;
  onValueChange?(value: string): void;
}
