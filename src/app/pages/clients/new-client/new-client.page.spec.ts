import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewClientPage } from './new-client.page';

describe('NewClientPage', () => {
  let component: NewClientPage;
  let fixture: ComponentFixture<NewClientPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewClientPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewClientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
