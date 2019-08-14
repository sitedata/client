import * as React from 'react'
import * as Kb from '../common-adapters/index'
import * as Styles from '../styles'
import {
  serviceIdToIconFont,
  serviceIdToAccentColor,
  serviceIdToLabel,
  inactiveServiceAccentColor,
} from './shared'
import * as Constants from '../constants/team-building'
import {ServiceIdWithContact} from '../constants/types/team-building'

export type Props = {
  selectedService: ServiceIdWithContact
  onChangeService: (newService: ServiceIdWithContact) => void
  onScroll: () => void
  serviceResultCount: {[K in ServiceIdWithContact]?: number | null}
  showServiceResultCount: boolean
  showLabels: boolean,
}

export type IconProps = {
  service: ServiceIdWithContact
  label: string
  labelPresence: number // how much to show the label [0, 1]
  onClick: () => void
  count: number | null
  showCount: boolean
  isActive: boolean
}

export class ServiceTabBar extends React.Component<Props> { }