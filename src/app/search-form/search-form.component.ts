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

    @Output() submit: EventEmitter<SearchCriteria> = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder,
        private dataService: DataService) {}

    ngOnInit() {
        this.fetchFormData();
        this.initializeForm();
    }

    private fetchFormData() {
        this.dataService.getCountries().subscribe(data => this.countrySuggestions = data);
        this.dataService.getDevices().subscribe(data => this.deviceSuggestions = data);
    }

    private initializeForm() {
        this.searchForm = this.formBuilder.group({
            selectedCountries: [],
            selectedDevices: []
        });
    }

    onSubmit() {
        this.submit.emit({
            countries: this.searchForm.value.selectedCountries,
            devices: this.searchForm.value.selectedDevices
        });
    }
}