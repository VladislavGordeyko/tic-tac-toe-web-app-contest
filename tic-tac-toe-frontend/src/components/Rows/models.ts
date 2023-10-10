import { SquareValue } from '../Square/models';

export interface IRows {
    squares: SquareValue[];
    onClick: (index: number) => void;
}