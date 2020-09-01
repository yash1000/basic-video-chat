import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VchatComponent } from './vchat.component';

describe('VchatComponent', () => {
  let component: VchatComponent;
  let fixture: ComponentFixture<VchatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VchatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
