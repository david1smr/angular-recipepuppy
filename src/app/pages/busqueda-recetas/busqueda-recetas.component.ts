import { Component, OnInit } from '@angular/core';
import {
    BusquedaRecetasService,
    FetchRecipesResponse
} from './busqueda-recetas.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import {
    startWith,
    debounceTime,
    skip,
    distinctUntilChanged,
    map,
    switchMap,
    tap,
    retry
} from 'rxjs/operators';
import { ApiReponse } from '@core/models/api-response/api-response';

@Component({
    selector: 'app-busqueda-recetas',
    templateUrl: './busqueda-recetas.component.html',
    styleUrls: ['./busqueda-recetas.component.styl']
})
export class BusquedaRecetasComponent implements OnInit {
    searchForm: FormGroup;
    ingredientsForm: FormGroup;
    recetaList: any[] = [];
    paginationLocked = false;

    get currentPage() {
        if (this.searchForm != null) {
            return +this.searchForm.get('page').value;
        }

        return 0;
    }

    paginationObservable: Observable<ApiReponse<FetchRecipesResponse>>;

    constructor(
        private service: BusquedaRecetasService,
        private fb: FormBuilder
    ) {
        this.initializeSearchForm();
        this.initializeIngredientsForm();
        this.setupFormChageObservable();
        this.setupPaginationObservable();
    }

    ngOnInit() {
        this.paginationObservable.subscribe(response => {
            if (response.isOK === true) {
                this.recetaList = response.payload.results;
            }
        });

        this.searchForm.get('page').setValue(1);
    }

    setupFormChageObservable() {
        combineLatest(
            this.searchForm
                .get('textoBusqueda')
                .valueChanges.pipe(startWith('')),
            this.ingredientsForm
                .get('ingredientList')
                .valueChanges.pipe(startWith([]))
        )
            .pipe(
                debounceTime(500),
                distinctUntilChanged((prev, curr) => {
                    return JSON.stringify(prev) === JSON.stringify(curr);
                }),
                skip(1)
            )
            .subscribe(changes => {
                this.searchForm.get('page').setValue(1);
            });
    }

    setupPaginationObservable() {
        this.paginationObservable = this.searchForm
            .get('page')
            .valueChanges.pipe(
                tap(_ => (this.paginationLocked = true)),
                switchMap(values => {
                    const URL = this.service.extractFetchUrlFromForms(
                        this.searchForm,
                        this.ingredientsForm
                    );
                    return this.service.fetchRecipes(URL);
                }),
                tap(_ => (this.paginationLocked = false))
            );
    }

    onClearSearch() {
        this.searchForm.patchValue(
            {
                textoBusqueda: ''
            },
            { emitEvent: false }
        );
    }

    onEnterPress() {
        const textoBusqueda = this.searchForm.get('textoBusqueda').value.trim();

        if (textoBusqueda.length === 0) {
            return;
        }

        this.service
            .fetchRecipes(`/api/?q=${textoBusqueda}&p=1`)
            .subscribe(response => {
                if (response.isOK) {
                    this.recetaList = response.payload.results;
                }
            });
    }

    initializeSearchForm() {
        this.searchForm = this.fb.group({
            textoBusqueda: ['', []],
            page: 1
        });
    }

    initializeIngredientsForm() {
        this.ingredientsForm = this.fb.group({
            ingredientInput: ['', []],
            ingredientList: this.fb.array([
            ])
        });
    }
}
