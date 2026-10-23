import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Bai58Component } from './bai58-component';

describe('Bai58Component', () => {
  let component: Bai58Component;
  let fixture: ComponentFixture<Bai58Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Bai58Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Bai58Component);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
