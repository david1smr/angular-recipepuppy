import { Injectable } from '@angular/core';
import { ServerService } from '@core/services/server.service';
import { Receta } from '@core/models/receta/receta';
import { FormGroup, FormArray } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class BusquedaRecetasService {
    constructor(private server: ServerService) {}

    fetchRecipes(url: string) {
        return this.server.get<FetchRecipesResponse>(url, 2);
    }


    extractFetchUrlFromForms(
        searchForm: FormGroup,
        ingredientsForm: FormGroup
    ) {
        const textoBusqueda = searchForm.get('textoBusqueda').value.trim();
        const ingredientsList = ingredientsForm.get(
            'ingredientList'
        ) as FormArray;

        return `/api/?q=${textoBusqueda}`;
    }
}

export interface FetchRecipesResponse {
    title: string;
    version: number;
    href: string;
    results: Receta[];
}
