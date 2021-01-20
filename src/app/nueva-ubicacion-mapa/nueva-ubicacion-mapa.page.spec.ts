import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NuevaUbicacionMapaPage } from './nueva-ubicacion-mapa.page';

describe('NuevaUbicacionMapaPage', () => {
  let component: NuevaUbicacionMapaPage;
  let fixture: ComponentFixture<NuevaUbicacionMapaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaUbicacionMapaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NuevaUbicacionMapaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
