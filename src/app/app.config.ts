import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

//Se importa modulo para hacer peticiones http
import { provideHttpClient, withFetch } from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),  //Se importa provider para hacer peticiones http
  provideHttpClient(withFetch())]
};
