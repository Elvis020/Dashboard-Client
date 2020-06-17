import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatahttpComponent } from './datahttp.component';

describe('DatahttpComponent', () => {
  let component: DatahttpComponent;
  let fixture: ComponentFixture<DatahttpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatahttpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatahttpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
