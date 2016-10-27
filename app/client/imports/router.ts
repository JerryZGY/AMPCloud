// Angular
import { Route } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
// Custom
import { Main } from './main/main';
import { Test } from './test/test';

const routes: Route[] = [
    { path: '', component: Main },
    { path: 'test', component: Test }
];

@NgModule({
    imports: [BrowserModule, RouterModule.forRoot(routes)],
    declarations: [Main, Test],
    exports: [RouterModule]
})
export class Router { }