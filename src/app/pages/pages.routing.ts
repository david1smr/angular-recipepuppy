import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusquedaRecetasComponent } from './busqueda-recetas/busqueda-recetas.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: BusquedaRecetasComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
