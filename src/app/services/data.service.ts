import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { UserSearchResult } from '../model/user-search-result.model';
import { SearchCriteria } from './../model/search-criteria.model';

@Injectable()
export class DataService {
    getDevices(): Observable<Array<string>> {
        return of(['iPhone', 'Samsung']);
    }

    getCountries(): Observable<Array<string>> {
        return of(['UK', 'US']);
    }

    search(query: SearchCriteria): Observable<Array<UserSearchResult>> {
        return of([
            {
                firstName: 'Mark',
                lastName: 'Twain',
                country: 'UK',
                lastLogin: new Date(),
                experience: 20
            },
            {
                firstName: 'Thomas',
                lastName: 'Edison',
                country: 'UK',
                lastLogin: new Date(),
                experience: 15
            }
        ]);
    }
}