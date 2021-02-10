import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChoosArticlePage } from './choos-article.page';

describe('ChoosArticlePage', () => {
  let component: ChoosArticlePage;
  let fixture: ComponentFixture<ChoosArticlePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoosArticlePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChoosArticlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
