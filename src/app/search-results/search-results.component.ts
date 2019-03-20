import { Component, Input } from '@angular/core';
import { UserSearchResult } from '../model/user-search-result.model';

@Component({
    selector: 'search-results',
    templateUrl: './search-results.component.html'
})
export class SearchResultsComponent {
    @Input() users: Array<UserSearchResult>;
}