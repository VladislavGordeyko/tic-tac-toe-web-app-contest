export interface ISquare {
    value: SquareValue;
    onClick: () => void;
}
  
export type SquareValue = 'X' | 'O' | null;
