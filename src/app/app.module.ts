import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ZoomchatComponent } from './zoomchat/zoomchat.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ToastModule } from 'primeng/toast';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [AppComponent, ZoomchatComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    OverlayPanelModule,
    TableModule,
    ButtonModule,
    ToastModule,
    HttpClientModule,
    PanelModule,
    CardModule,
    InputTextModule,
    RouterModule.forRoot([
      { path: 'fe-assignment', component: ZoomchatComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
