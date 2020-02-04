import { TestBed } from '@angular/core/testing';

import { BusquedaRecetasService } from './busqueda-recetas.service';

describe('BusquedaRecetasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusquedaRecetasService = TestBed.get(BusquedaRecetasService);
    expect(service).toBeTruthy();
  });
});
