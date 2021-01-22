import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TipoPedidoPage } from './tipo-pedido.page';

describe('TipoPedidoPage', () => {
  let component: TipoPedidoPage;
  let fixture: ComponentFixture<TipoPedidoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoPedidoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TipoPedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
