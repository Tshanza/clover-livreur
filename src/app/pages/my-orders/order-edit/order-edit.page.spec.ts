import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderEditPage } from './order-edit.page';

describe('OrderEditPage', () => {
  let component: OrderEditPage;
  let fixture: ComponentFixture<OrderEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
