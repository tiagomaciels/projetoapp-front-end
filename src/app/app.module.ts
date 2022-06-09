import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainModule } from './modules/main/main.module';
import { AppHttpInterceptor } from './modules/shared/services/app-http.interceptor';
import { SharedModule } from './modules/shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MainModule,
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true,
    },{provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
