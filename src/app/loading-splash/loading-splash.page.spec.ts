import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoadingSplashPage } from './loading-splash.page';

describe('LoadingSplashPage', () => {
  let component: LoadingSplashPage;
  let fixture: ComponentFixture<LoadingSplashPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingSplashPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingSplashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
