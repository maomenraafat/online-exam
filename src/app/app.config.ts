import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { BASE_URL_TOKEN } from 'auth-api';
import { environment } from './environments/environments';
import { provideStore } from '@ngrx/store';
import { authReducer } from './store/auth.reducer';
import { headersInterceptor } from './core/interceptors/headers.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([headersInterceptor])),
    {
      provide: BASE_URL_TOKEN,
      useValue: environment.baseUrl,
    },
    provideStore({ auth: authReducer }),
  ],
};
