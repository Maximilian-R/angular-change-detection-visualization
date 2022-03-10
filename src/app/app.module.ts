import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NodeComponent } from './tree/node/node.component';
import { RootComponent } from './tree/root/root.component';
import { OnpushComponent } from './strategy-component/onpush/onpush.component';
import { DefaultComponent } from './strategy-component/default/default.component';
import { ContextMenuComponent } from './context-menu/context-menu.component';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [
    AppComponent,
    RootComponent,
    NodeComponent,
    OnpushComponent,
    DefaultComponent,
    ContextMenuComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
