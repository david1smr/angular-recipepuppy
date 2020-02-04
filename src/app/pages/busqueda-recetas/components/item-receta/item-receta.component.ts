import { Component, OnInit, Input } from '@angular/core';
import { Receta } from '@core/models/receta/receta';
import { Ingrediente } from '@core/models/receta/ingredientes';

@Component({
    selector: 'app-item-receta',
    templateUrl: './item-receta.component.html',
    styleUrls: ['./item-receta.component.styl']
})
export class ItemRecetaComponent implements OnInit {
    @Input()
    receta: Receta;
    ingredientes: Ingrediente

    constructor() {}

    ngOnInit() {}

    onOpenExternalLink() {
        if (this.receta.href == null) {
            return;
        }
        
        window.open(this.receta.href, '_blank');
    }
}
