import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdateClientPage } from './update-client.page';

describe('UpdateClientPage', () => {
  let component: UpdateClientPage;
  let fixture: ComponentFixture<UpdateClientPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateClientPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateClientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
