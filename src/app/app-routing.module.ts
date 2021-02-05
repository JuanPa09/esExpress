import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'recuperacion',
    loadChildren: () => import('./recuperacion/recuperacion.module').then( m => m.RecuperacionPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'contacto',
    loadChildren: () => import('./contacto/contacto.module').then( m => m.ContactoPageModule)
  },
  {
    path: 'ubicaciones',
    loadChildren: () => import('./ubicaciones/ubicaciones.module').then( m => m.UbicacionesPageModule)
  },
  {
    path: 'nueva-ubicacion',
    loadChildren: () => import('./nueva-ubicacion/nueva-ubicacion.module').then( m => m.NuevaUbicacionPageModule)
  },
  {
    path: 'nueva-ubicacion-mapa',
    loadChildren: () => import('./nueva-ubicacion-mapa/nueva-ubicacion-mapa.module').then( m => m.NuevaUbicacionMapaPageModule)
  },
  {
    path: 'loading-splash',
    loadChildren: () => import('./loading-splash/loading-splash.module').then( m => m.LoadingSplashPageModule)
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./pedidos/pedidos.module').then( m => m.PedidosPageModule)
  },
  {
    path: 'start-splash',
    loadChildren: () => import('./start-splash/start-splash.module').then( m => m.StartSplashPageModule)
  },
  {
    path: 'realizar-pedido',
    loadChildren: () => import('./realizar-pedido/realizar-pedido.module').then( m => m.RealizarPedidoPageModule)
  },
  {
    path: 'detalle-pedido',
    loadChildren: () => import('./detalle-pedido/detalle-pedido.module').then( m => m.DetallePedidoPageModule)
  },
  {
    path: 'nuevo-pedido',
    loadChildren: () => import('./nuevo-pedido/nuevo-pedido.module').then( m => m.NuevoPedidoPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
