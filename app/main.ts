import { bootstrap }      from '@angular/platform-browser-dynamic';
import { AppComponent }         from './app.component';

import { MODAL_BROWSER_PROVIDERS } from 'angular2-modal/platform-browser/index';
console.log(MODAL_BROWSER_PROVIDERS)

bootstrap(AppComponent,[MODAL_BROWSER_PROVIDERS]);

