import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { environment } from './environments/environment';

/* eslint-disable @typescript-eslint/no-explicit-any */
if (environment.production) {
  (window as any).dataLayer = (window as any).dataLayer || [];
  // eslint-disable-next-line no-inner-declarations
  function gtag(...args: any[]) {
    (window as any).dataLayer.push(args);
  }
  gtag('js', new Date());
  gtag('config', 'G-7TEP5F5EBQ');
}

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
