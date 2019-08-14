import * as Styles from '../styles'
import {ServiceIdWithContact} from '../constants/types/team-building'
import {IconType} from '../common-adapters/icon.constants'

const services: {[K in ServiceIdWithContact]: {color: string; icon: IconType; label: string}} = {
  contact: {
    color: '#000',
    icon: 'iconfont-identity-twitter',
    label: 'Your contacts', // TODO: rethink this for the empty state when we're actually using it
  },
  email: {
    color: '#000',
    icon: 'iconfont-mention',
    label: 'Email', // TODO: rethink this for the empty state when we're actually using it
  },
  facebook: {
    color: '#3B5998',
    icon: 'iconfont-identity-facebook',
    label: 'Facebook',
  },
  github: {
    color: '#333',
    icon: 'iconfont-identity-github',
    label: 'GitHub',
  },
  hackernews: {
    color: '#FF6600',
    icon: 'iconfont-identity-hn',
    label: 'Hacker News',
  },
  keybase: {
    color: '#4C8EFF',
    icon: 'iconfont-contact-book',
    label: 'Keybase and contacts',
  },
  pgp: {
    color: '#000',
    icon: 'iconfont-identity-pgp',
    label: 'PGP',
  },
  reddit: {
    color: '#ff4500',
    icon: 'iconfont-identity-reddit',
    label: 'Reddit',
  },
  twitter: {
    color: '#1DA1F2',
    icon: 'iconfont-identity-twitter',
    label: 'Twitter',
  },
}

const serviceIdToAccentColor = (service: ServiceIdWithContact): string => services[service].color
const serviceIdToIconFont = (service: ServiceIdWithContact): IconType => services[service].icon
const serviceIdToLabel = (service: ServiceIdWithContact): string => services[service].label

const inactiveServiceAccentColor = Styles.globalColors.black_50

// xxx merge with
const serviceLabel = (service: ServiceIdWithContact) => {
  switch (service) {
    case 'keybase':
      return 'A Keybase user'
    case 'contact':
      return 'A contact'
    case 'twitter':
      return 'A Twitter user'
    case 'facebook':
      return 'A Facebook user'
    case 'github':
      return 'A GitHub user'
    case 'reddit':
      return 'A Reddit user'
    case 'hackernews':
      return 'A HN user'
    case 'pgp':
      return 'A PGP user'
    default:
      return 'A user'
  }
}

export {serviceIdToIconFont, serviceIdToAccentColor, inactiveServiceAccentColor, serviceIdToLabel, serviceLabel}
