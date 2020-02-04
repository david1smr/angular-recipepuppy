import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemRecetaComponent } from './item-receta.component';

describe('ItemRecetaComponent', () => {
  let component: ItemRecetaComponent;
  let fixture: ComponentFixture<ItemRecetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemRecetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
