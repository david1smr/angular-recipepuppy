import { environments } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { CoreModule } from '@core/core.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ApiReponse } from '@core/models/api-response/api-response';
import { Observable, of } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';

@Injectable({
    providedIn: CoreModule
})
export class ServerService {
    constructor(private http: HttpClient) {}

    get<T = any>(
        url: string,
        retryTimes: number = 0
    ): Observable<ApiReponse<T>> {
        const fullURL = this.getFullURL(url);
        const options = {
            headers: new HttpHeaders().set(
                'X-Requested-With',
                'For use with cors-anywhere'
            )
        };
        

        return this.http.get<T>(fullURL, options).pipe(
            retry(retryTimes),
            map(response => {
                return ApiReponse.success(response);
            }),
            catchError(this.handleError)
        );
    }

    private handleError(error) {
        // Hay muchas veces que el api devuelve un error aunque los datos vengan correctamente
        let text = error.error.replace(/<.*>/g, '');
        var remove_after= text.indexOf('var');
        var result =  text.substring(0, remove_after);
        if (result) {
            result = JSON.parse(result)
            return of(ApiReponse.success(result));
        }
        return of(ApiReponse.error(error));
    }

    private getFullURL(url: string) {
        return environments.corsHelperURL + '/' + environments.endpointURL + url;
    }
}
