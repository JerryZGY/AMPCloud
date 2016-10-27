// Angular
import 'angular2-meteor-polyfills';
import { NgModule, Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// Custom
import { Router } from './imports/router';

@Component({
    selector: 'app',
    template: '<router-outlet></router-outlet>',
})
export class App { }

@NgModule({
    imports: [Router],
    declarations: [App],
    bootstrap: [App],
})
export class AppModule { }

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
