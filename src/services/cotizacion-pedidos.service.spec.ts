import { TestBed } from '@angular/core/testing';

import { CotizacionPedidosService } from './cotizacion-pedidos.service';

describe('CotizacionPedidosService', () => {
  let service: CotizacionPedidosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CotizacionPedidosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
