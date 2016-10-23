import { Square } from './';

export class WinningIndexesRetriever {

  private _squares: Array<Square>;
  private _boardSize: number;

  constructor(squares: Array<Square>, boardSize: number) {
    this._squares = squares;
    this._boardSize = boardSize;
  }

  public getWinningIndexesFor(square: Square): Array<number> {
    let steps = [
      this.getWinningIndexesInRowOf,
      this.getWinningIndexesInColumnOf,
      this.getWinningIndexesInDiagonal,
      this.getWinningIndexesInAntiDiagonal
    ];
    for (let step of steps) {
      let victoriousSeriesIndexes = step.call(this, square);
      if (victoriousSeriesIndexes) {
        return victoriousSeriesIndexes;
      }
    }
  }

  private getWinningIndexesInDiagonal(square: Square): Array<number>  {
    if (square.xPosition == square.yPosition) {
      return this.getWinningIndexes(square, 0, this._boardSize + 1);
    }
  }

  private getWinningIndexesInAntiDiagonal(square: Square): Array<number>  {
    if (square.xPosition + square.yPosition == this._boardSize - 1) {
      return this.getWinningIndexes(square, this._boardSize - 1, this._boardSize - 1);
    }
  }

  private getWinningIndexesInRowOf(square: Square): Array<number>  {
    const numberOfSquares = this._boardSize * square.xPosition;
    return this.getWinningIndexes(square, numberOfSquares, 1);
  }

  private getWinningIndexesInColumnOf(square: Square): Array<number> {
    return this.getWinningIndexes(square, square.yPosition, this._boardSize);
  }

  private getWinningIndexes(
    square: Square, 
    offsetInitialValue: number,
    offsetIncrement: number): Array<number> {
      let winningSeriesIndexes = new Array<number>();
      let offset = offsetInitialValue;
      for (let i = 0; i < this._boardSize; i++) {
        if (this._squares[offset].state != square.state) {
          return undefined;
        }
        winningSeriesIndexes.push(offset);
        offset += offsetIncrement;
      }
      return winningSeriesIndexes;
    }
}
