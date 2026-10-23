import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentInteraction } from './component-interaction';

describe('ComponentInteraction', () => {
  let component: ComponentInteraction;
  let fixture: ComponentFixture<ComponentInteraction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComponentInteraction],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentInteraction);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
