import './shim';
import 'rxjs/add/operator/map';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide } from '@angular/core';
import { AppComponent } from './components/app/app.component';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { FORM_PROVIDERS, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';

if (ENVIRONMENT === 'production') {
  enableProdMode();
}

bootstrap(AppComponent, [
  FORM_PROVIDERS,
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  provide(LocationStrategy, { useClass: HashLocationStrategy }),
  provide('ENVIRONMENT', { useValue: ENVIRONMENT })
]);
