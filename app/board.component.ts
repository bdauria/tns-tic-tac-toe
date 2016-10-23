import { ViewChildren, Component, OnInit, ViewChild, QueryList, ElementRef } from '@angular/core';
import { Board , SquareState , Square } from './domain/';
import { GridLayout } from 'ui/layouts/grid-layout';
import { StackLayout } from 'ui/layouts/stack-layout';
import { Color } from 'color';
import * as platform from 'platform';

@Component({
    selector: 'ttt-board',
    templateUrl: 'board.component.html',
    styleUrls: ['board.component.css']
})
export class BoardComponent implements OnInit {
  public board: Board = new Board(3);

  @ViewChild('boardGrid') boardGrid: ElementRef;

  private get boardGridView(): GridLayout {
    return this.boardGrid.nativeElement;
  }

  @ViewChildren('square') squares: QueryList<ElementRef>;

  private get squareViews(): Array<StackLayout> {
    return this.squares.map(s => s.nativeElement);
  }

  private currentPlayerState = SquareState.Cross;

  public ngOnInit() {
    this.makeBoardGridSquared();
  }

  private makeBoardGridSquared(): void {
    const heightOverflow = 120;
    const height = this.screenHeight - heightOverflow;
    const minimumSideDimension = Math.min(this.screenWidth, height);
    this.boardGridView.height = minimumSideDimension;
    this.boardGridView.width = minimumSideDimension;
  }

  public get gamePanelStateImageVisibility(): string {
    return this.board.isDraw? 'collapsed': 'visible';
  }

  public get boardSideSpecification(): string {
    var specs = [];
    for (let i = 0; i < this.board.size; i++) {
      specs.push('*');
    }
    return specs.join(',');
  }

  private get screenWidth(): number {
    return platform.screen.mainScreen.widthDIPs;
  }

  private get screenHeight(): number {
    return platform.screen.mainScreen.heightDIPs;
  }

  public classOf(square: Square): string {
    return (square.xPosition + square.yPosition) % 2 == 0 
      ? 'light-square'
      : 'dark-square';
  }

  public get gamePanelCaption(): string {
    if (this.board.isDraw) {
      return 'Draw';
    }
    return this.board.isGameWon ? 'Winner': 'Next to play';
  }

  public mark(square): void {
    this.board.mark(square);
    const winningIndexes = this.board.getWinningIndexesFor(square);
    if (winningIndexes) {
      for (let index of winningIndexes) {
        let view = this.squareViews[index];
        view.animate({ backgroundColor: new Color("#BA4A00"), duration: 2000 });
      }
    }
  }

  public restartGame(): void {
    this.board.startNewGame();
  }
}
