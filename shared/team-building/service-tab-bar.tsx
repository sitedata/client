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

type Props = {
  selectedService: ServiceIdWithContact
  onChangeService: (newService: ServiceIdWithContact) => void
  serviceResultCount: {[K in ServiceIdWithContact]?: number | null}
  showServiceResultCount: boolean
  showLabels: boolean,
}

type IconProps = {
  service: ServiceIdWithContact
  label: string
  labelPresence: number // how much to show the label [0, 1]
  onClick: () => void
  count: number | null
  showCount: boolean
  isActive: boolean
}

type ExtraProps = {service: ServiceIdWithContact; isActive: boolean}
const HoverIcon = Styles.styled<typeof Kb.Icon, ExtraProps>(Kb.Icon)(props => ({
  '&:hover': {
    color: serviceIdToAccentColor(props.service),
  },
  color: props.isActive ? serviceIdToAccentColor(props.service) : inactiveServiceAccentColor,
}))

const mapRange = (v: number, fromMin: number, fromMax: number, toMin: number, toMax: number) => {
  return (v - fromMin) / (fromMax - fromMin) * (toMax - toMin) + toMin
}

const ServiceIconDesktop = (props: IconProps) => (
  <Kb.ClickableBox onClick={props.onClick}>
    <Kb.Box2 direction="horizontal" centerChildren={true} style={styles.serviceIconContainer}>
      <Kb.WithTooltip text={serviceIdToLabel(props.service)}>
        <HoverIcon
          isActive={props.isActive}
          service={props.service}
          fontSize={18}
          type={serviceIdToIconFont(props.service)}
          style={styles.serviceIcon}
        />
      </Kb.WithTooltip>
      {props.showCount &&
        (props.count !== null ? (
          <Kb.Text type="BodyTinySemibold" style={styles.resultCount}>
            {props.count && props.count > 10 ? '10+' : props.count}
          </Kb.Text>
        ) : (
          <Kb.Icon
            type="icon-progress-grey-animated"
            color={Styles.globalColors.greyDark}
            style={styles.pendingIcon}
          />
        ))}
    </Kb.Box2>
    <Kb.Box2
      direction="horizontal"
      fullWidth={true}
      style={Styles.collapseStyles([
        props.isActive ? styles.activeTabBar : styles.inactiveTabBar,
        props.isActive && {backgroundColor: serviceIdToAccentColor(props.service)},
      ])}
    />
  </Kb.ClickableBox>
)

const labelHeight = 34

const ServiceIconMobile = (props: IconProps) => {
  return (<Kb.ClickableBox onClick={props.onClick} >
    <Kb.Box2 direction="vertical" centerChildren={true} style={Styles.collapseStyles([styles.serviceIconContainer, { width: mapRange(props.labelPresence, 0, 1, 72, 92) }])}>
      <Kb.Icon
        fontSize={18}
        type={serviceIdToIconFont(props.service)}
        style={Styles.collapseStyles([
          styles.serviceIcon,
          {color: props.isActive ? serviceIdToAccentColor(props.service) : inactiveServiceAccentColor},
        ])}
      />
      <Kb.Box2 direction="vertical" style={{height: labelHeight * props.labelPresence, opacity: props.labelPresence, overflow: 'hidden'}}>
        <Kb.Box2 direction="vertical" style={{height: labelHeight, width: 74}}>
          <Kb.Text type="BodyTiny" center={true} lineClamp={2}>{props.label}</Kb.Text>
        </Kb.Box2>
      </Kb.Box2>
      {!!props.showCount && props.count === null && (
        <Kb.Icon
          type="icon-progress-grey-animated"
          color={Styles.globalColors.greyDark}
          style={styles.pendingIcon}
        />
      )}
      {!!props.showCount && props.count !== null && (
        <Kb.Text type="BodyTinySemibold" style={styles.resultCount}>
          {props.count && props.count === 11 ? '10+' : props.count}
        </Kb.Text>
      )}
    </Kb.Box2>
    <Kb.Box2
      direction="horizontal"
      fullWidth={true}
      style={Styles.collapseStyles([
        props.isActive ? styles.activeTabBar : styles.inactiveTabBar,
        props.isActive && {backgroundColor: serviceIdToAccentColor(props.service)},
      ])}
    />
  </Kb.ClickableBox>)
}

const undefToNull = (n: number | undefined | null): number | null => (n === undefined ? null : n)

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

const ServiceTabBarMobile = (props: Props) => (
  <Kb.Animated to={{presence: props.showLabels ? 1 : 0}} config={{clamp: true, tension: 400}}>
    {({ presence }) => (
      <Kb.Box2 direction="horizontal" fullWidth={true} style={Styles.collapseStyles([styles.tabBarContainer, {height: 48 + labelHeight * presence}])}>
        <Kb.ScrollView horizontal={true}>
        {Constants.services.map(service => (
          <ServiceIconMobile
            key={service}
            service={service}
            label={serviceLabel(service)}
            labelPresence={presence}
            onClick={() => props.onChangeService(service)}
            count={undefToNull(props.serviceResultCount[service])}
            showCount={props.showServiceResultCount}
            isActive={props.selectedService === service}
          />
        ))}
        </Kb.ScrollView>
      </Kb.Box2>
    )}
  </Kb.Animated>
)

const ServiceTabBarDesktop = (props: Props) => (
      <Kb.Box2 direction="horizontal" fullWidth={true} style={styles.tabBarContainer}>
        {Constants.services.map(service => (
          <ServiceIconDesktop
            key={service}
            service={service}
            label={serviceLabel(service)}
            labelPresence={props.showLabels ? 1 : 0}
            onClick={() => props.onChangeService(service)}
            count={undefToNull(props.serviceResultCount[service])}
            showCount={props.showServiceResultCount}
            isActive={props.selectedService === service}
          />
        ))}
      </Kb.Box2>
)

const ServiceTabBar = Styles.isMobile ? ServiceTabBarMobile : ServiceTabBarDesktop

const styles = Styles.styleSheetCreate({
  activeTabBar: {
    backgroundColor: Styles.globalColors.blue,
    height: 2,
  },
  inactiveTabBar: {
    borderBottomWidth: 1,
    borderColor: Styles.globalColors.black_10,
    height: 2,
  },
  pendingIcon: Styles.platformStyles({
    isElectron: {height: 10, width: 10},
    isMobile: {height: 17, width: 17},
  }),
  resultCount: {},
  serviceIcon: Styles.platformStyles({
    isElectron: {
      marginRight: Styles.globalMargins.xtiny,
    },
  }),
  serviceIconContainer: Styles.platformStyles({
    common: {
      flex: 1,
      marginLeft: Styles.globalMargins.xtiny,
      marginRight: Styles.globalMargins.xtiny,
      paddingBottom: Styles.globalMargins.tiny,
      paddingTop: Styles.globalMargins.tiny,
    },
    isElectron: {
      minWidth: 40,
    },
  }),
  tabBarContainer: Styles.platformStyles({
    common: {
      marginTop: Styles.globalMargins.xtiny,
    },
    isElectron: {
      minHeight: 30,
      paddingLeft: Styles.globalMargins.small,
      paddingRight: Styles.globalMargins.small,
    },
  }),
})

export default ServiceTabBar
