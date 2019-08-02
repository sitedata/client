import CryptoRoot from './container'

export const newRoutes = {
  cryptoRoot: {
    getScreen: (): typeof CryptoRoot => require('./container').default,
  },
}

export const newModalRoutes = {}
