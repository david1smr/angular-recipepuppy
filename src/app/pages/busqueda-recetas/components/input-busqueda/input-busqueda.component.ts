import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-input-busqueda',
    templateUrl: './input-busqueda.component.html',
    styleUrls: ['./input-busqueda.component.styl']
})
export class InputBusquedaComponent implements OnInit {
    @Input()
    parentFormGroup: FormGroup;
    @Output()
    escapePress = new EventEmitter();

    constructor() {}

    ngOnInit() {}
}
