import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketEmptyComponentComponent } from './basket-empty-component.component';

describe('BasketEmptyComponentComponent', () => {
  let component: BasketEmptyComponentComponent;
  let fixture: ComponentFixture<BasketEmptyComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasketEmptyComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasketEmptyComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
