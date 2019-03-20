import { Component } from '@angular/core';
import { SearchCriteria } from './model/search-criteria.model';
import { DataService } from './services/data.service';
import { UserSearchResult } from './model/user-search-result.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'tester-search-app';

    searchResults: Array<UserSearchResult>;

    constructor(private dataService: DataService) {

    }

    onSubmitSearchForm(searchCriteria: SearchCriteria) {
        this.dataService.search(searchCriteria)
          .subscribe(results => this.searchResults = results);
    }
}
