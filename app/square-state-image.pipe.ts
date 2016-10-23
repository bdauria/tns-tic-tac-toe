import { Pipe, PipeTransform } from '@angular/core';
import { SquareState } from './domain';

@Pipe({ name: 'squareStateImage' })
export class SquareStateImagePipe implements PipeTransform {
  transform(value: SquareState): string  {
    switch (value) {
      case SquareState.Circle:
        return '~/img/circle.png';
      case SquareState.Cross:
        return '~/img/cross.png';
    }
  }
}
