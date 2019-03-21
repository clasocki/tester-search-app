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
    searchError: string;

    constructor(private dataService: DataService) {}

    onSubmitSearchForm(searchCriteria: SearchCriteria) {
        this.searchError = '';
        this.dataService.search(searchCriteria)
          .subscribe(
              results => this.searchResults = results,
              error => {
                  console.log('Could not load search results', error);
                  this.searchError = 'Oops! Something didn\'t go well while fetching the search results'; 
              });
    }
}
