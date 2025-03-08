import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


bootstrapApplication(AppComponent,{
  providers:[
    provideRouter(routes),
    provideHttpClient(),  // Use this instead of importProvidersFrom(HttpClientModule)
    provideAnimations(), // required animations providers
    provideToastr({positionClass: 'toast-bottom-right'}), provideAnimationsAsync(), // Toastr providers
  ]
},).catch((err) => console.error(err));
