import { InjectionToken } from '@angular/core';
import { environment } from '../environments/environment';

export const ENVIRONMENT = new InjectionToken('environment', {
  providedIn: 'root',
  factory: () => environment,
});
