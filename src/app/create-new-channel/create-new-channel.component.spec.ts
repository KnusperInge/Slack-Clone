import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewChannelComponent } from './create-new-channel.component';

describe('CreateNewChannelComponent', () => {
  let component: CreateNewChannelComponent;
  let fixture: ComponentFixture<CreateNewChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewChannelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
