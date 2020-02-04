import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from '@core/core.module';
import { PagesModule } from '@pages/pages.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environments } from '../environments/environment';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, CoreModule, PagesModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environments.production })],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
