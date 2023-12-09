import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsperaViewComponent } from './espera-view.component';

describe('EsperaViewComponent', () => {
  let component: EsperaViewComponent;
  let fixture: ComponentFixture<EsperaViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EsperaViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EsperaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
