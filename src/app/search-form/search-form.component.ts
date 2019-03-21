import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataService } from '../services/data.service';
import { SearchCriteria } from '../model/search-criteria.model';

@Component({
    selector: 'search-form',
    templateUrl: './search-form.component.html'
})
export class SearchFormComponent implements OnInit {
    countrySuggestions: Array<string>;
    deviceSuggestions: Array<string>;

    searchForm: FormGroup;
    connectionError: boolean;

    @Output() submitForm: EventEmitter<SearchCriteria> = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder,
        private dataService: DataService) {}

    ngOnInit() {
        this.fetchFormData();
        this.initializeForm();
    }

    private fetchFormData() {
        this.connectionError = false;

        this.dataService.getCountries().subscribe(
            data => this.countrySuggestions = data,
            error => {
                console.log('Could not fetch available countries', error);
                this.connectionError = true;
            });
        this.dataService.getDevices().subscribe(
            data => this.deviceSuggestions = data,
            error => {
                console.log('Could not fetch available devices', error);
                this.connectionError = true;
            });
    }

    private initializeForm() {
        this.searchForm = this.formBuilder.group({
            selectedCountries: [],
            selectedDevices: []
        });
    }

    onSubmit() {
        this.submitForm.emit({
            countries: this.searchForm.value.selectedCountries || [],
            devices: this.searchForm.value.selectedDevices || []
        });
    }
}