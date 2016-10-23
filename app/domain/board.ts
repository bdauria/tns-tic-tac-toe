import { Square, SquareState, WinningIndexesRetriever } from './';

export class Board {
  private _size: number;
  private _squares: Array<Square>;
  private _currentPlayerState: SquareState;
  private _crossScore: number;
  private _circleScore: number;
  private _isGameWon: boolean;
  private _winningIndexesRetriever: WinningIndexesRetriever;
  private _marksCount: number;

  public get size(): number {
    return this._size;
  }

  public get squares(): Array<Square> {
    return this._squares;
  }

  public get currentPlayerState(): SquareState {
    return this._currentPlayerState;
  }

  public get circleScore(): number {
    return this._circleScore;

  }
  public get crossScore(): number {
    return this._crossScore;
  }

  public get isGameWon(): boolean {
    return this._isGameWon;
  }

  private get nextState(): SquareState {
    if (this._currentPlayerState == SquareState.Cross) {
      return SquareState.Circle;
    }
    else {
      return SquareState.Cross;
    }
  }

  public get isDraw(): boolean {
    return !this.isGameWon && this.isBoardFull;
  }

  private get isBoardFull(): boolean {
    return this._marksCount == this._size * this._size;
  }

  constructor(size: number) {
    this._squares = new Array<Square>();
    this._size = size;
    this._crossScore = 0;
    this._circleScore = 0;
    this._currentPlayerState = SquareState.Cross;
    this.startNewGame();
  }

  public startNewGame(): void {
    this._isGameWon = false;
    this._marksCount = 0;
    this.initializeBoard();
    this._winningIndexesRetriever = new WinningIndexesRetriever(this._squares, this._size);
  }

  public mark(square: Square): void {
    if (square.canChangeState) {
      square.state = this._currentPlayerState;
      this._marksCount++;
      this.setGameWonStateFrom(square);
      this.changeCurrentPlayerState();
    }
  }

  public getWinningIndexesFor(square): Array<number> {
    return this._winningIndexesRetriever.getWinningIndexesFor(square);
  }

  private initializeBoard() {
    this._squares = new Array<Square>();
    for (let x = 0; x < this._size; x++) {
      for (let y = 0; y < this._size; y++) {
        this._squares.push(new Square(x, y));
      }
    }
  }

  private setGameWonStateFrom(square: Square): void {
    this._isGameWon = this.getWinningIndexesFor(square) != undefined;
    if (this._isGameWon) {
      this.incrementWinnerScore();
    }
  }

  private incrementWinnerScore(): void {
    if (this._currentPlayerState == SquareState.Cross) {
      this._crossScore++;
    }
    else {
      this._circleScore++;
    }
  }

  private changeCurrentPlayerState() {
    if (!this._isGameWon) {
      this._currentPlayerState = this.nextState;
    }
  }
}
