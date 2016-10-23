// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic, NativeScriptModule } from "nativescript-angular/platform";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BoardComponent } from './board.component';
import { SquareStateImagePipe } from './square-state-image.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    SquareStateImagePipe
  ],
  bootstrap: [AppComponent],
  imports: [NativeScriptModule]
})
class AppComponentModule {}

platformNativeScriptDynamic().bootstrapModule(AppComponentModule);
