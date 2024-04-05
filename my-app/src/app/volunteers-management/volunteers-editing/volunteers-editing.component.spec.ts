import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteersEditingComponent } from './volunteers-editing.component';

describe('VolunteersEditingComponent', () => {
  let component: VolunteersEditingComponent;
  let fixture: ComponentFixture<VolunteersEditingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VolunteersEditingComponent]
    });
    fixture = TestBed.createComponent(VolunteersEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
