import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from  '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgentListComponent } from './agent-list/agent-list.component';
import { TacMapComponent } from './tac-map/tac-map.component';

@NgModule({
  declarations: [
    AppComponent,
    AgentListComponent,
    TacMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
