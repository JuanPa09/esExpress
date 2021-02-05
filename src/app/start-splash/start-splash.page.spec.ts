import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StartSplashPage } from './start-splash.page';

describe('StartSplashPage', () => {
  let component: StartSplashPage;
  let fixture: ComponentFixture<StartSplashPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartSplashPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StartSplashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
