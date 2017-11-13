import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlibaibafasteditComponent } from './alibaibafastedit.component';

describe('AlibaibafasteditComponent', () => {
  let component: AlibaibafasteditComponent;
  let fixture: ComponentFixture<AlibaibafasteditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlibaibafasteditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlibaibafasteditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
