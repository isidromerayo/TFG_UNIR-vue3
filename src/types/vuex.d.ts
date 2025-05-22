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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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