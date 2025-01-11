import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';


import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};