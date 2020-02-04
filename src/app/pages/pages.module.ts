import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { PagesRoutingModule } from './pages.routing';
import { BusquedaRecetasComponent } from './busqueda-recetas/busqueda-recetas.component';
import { InputBusquedaComponent } from './busqueda-recetas/components/input-busqueda/input-busqueda.component';
import { ItemRecetaComponent } from './busqueda-recetas/components/item-receta/item-receta.component';

@NgModule({
    declarations: [BusquedaRecetasComponent, InputBusquedaComponent, ItemRecetaComponent],
    imports: [CommonModule, SharedModule, PagesRoutingModule]
})
export class PagesModule {}
