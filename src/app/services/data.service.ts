import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserSearchResult } from '../model/user-search-result.model';
import { SearchCriteria } from './../model/search-criteria.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
    private readonly url = 'http://localhost:5000';
    constructor(private httpClient: HttpClient) {}

    getDevices(): Observable<Array<string>> {
        const query = `${this.url}/devices`;

        return this.httpClient.get<Array<string>>(query);
    }

    getCountries(): Observable<Array<string>> {
        const query = `${this.url}/countries`;

        return this.httpClient.get<Array<string>>(query);
    }

    search(query: SearchCriteria): Observable<Array<UserSearchResult>> {
        const queryString = `testers?search=${JSON.stringify(query)}`;
        const url = `${this.url}/${queryString}`;

        return this.httpClient.get<Array<UserSearchResult>>(url)
            .pipe(
                map(results => results.sort(
                    (a, b) => (a.experience < b.experience) 
                        ? 1 
                        : ((b.experience < a.experience) ? -1 : 0)
                    )
                )
            );
    }
}