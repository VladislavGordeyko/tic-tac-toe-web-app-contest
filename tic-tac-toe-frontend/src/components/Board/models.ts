import { SquareValue } from '../Square/models';

export interface IBoard {
    onClick: (index: number) => void;
    squares: SquareValue[];
    status: string;
}