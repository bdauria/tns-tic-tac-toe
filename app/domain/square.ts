export class Square {
  private _state: SquareState;

  public get state(): SquareState {
    return this._state;
  }

  public set state(value: SquareState) {
    this._state = value;
  }

  private _xPosition: number;

  public get xPosition(): number {
    return this._xPosition;
  }

  private _yPosition: number;

  public get yPosition(): number {
    return this._yPosition;
  }

  constructor(x: number, y: number) {
    this._state = SquareState.Blank;
    this._xPosition = x;
    this._yPosition = y;
  }

  public get canChangeState(): boolean {
    return this._state == SquareState.Blank;
  }
}

export enum SquareState {
  Blank,
  Cross,
  Circle
}
