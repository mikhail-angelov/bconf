import { Component, Inject } from '@angular/core'; // eslint-disable-line no-unused-vars
import { RouteConfig } from '@angular/router-deprecated';

import template from './app.template.html';
// import { routes } from './router.config';

@Component({
  selector: 'my-app',
  template: template
})
// @RouteConfig(routes)
export class AppComponent {

  constructor(@Inject('ENVIRONMENT') environment) {
    this.environment = environment;
  }
}
