import { Store } from 'vuex'

declare module 'vuex' {
  interface State {
    carrito: any[]
    usuario: any
    totalCarrito: number
    isLoggedIn: boolean
  }

  interface Store<S = State> {
    state: S
  }

   
  export * from '../node_modules/vuex/types/index.d.ts';
}

declare module 'vuex' {
  export * from 'vuex/types/index'
}

declare module 'vuex/types/index' {
  interface Store<S> {
    state: S
  }
} 