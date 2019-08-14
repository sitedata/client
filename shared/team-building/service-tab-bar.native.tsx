import * as React from 'react'
import * as Kb from '../common-adapters/index'
import * as Styles from '../styles'
import {
  serviceIdToIconFont,
  serviceIdToAccentColor,
  serviceLabel,
  inactiveServiceAccentColor,
} from './shared'
import * as Constants from '../constants/team-building'
import {Props, IconProps} from './service-tab-bar'

const mapRange = (v: number, fromMin: number, fromMax: number, toMin: number, toMax: number) => {
  return (v - fromMin) / (fromMax - fromMin) * (toMax - toMin) + toMin
}

export const labelHeight = 34

const ServiceIcon = (props: IconProps) => {
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

export const ServiceTabBar = (props: Props) => (
  <Kb.Animated to={{presence: props.showLabels ? 1 : 0}} config={{clamp: true, tension: 400}}>
    {({ presence }) => (
      <Kb.Box2 direction="horizontal" fullWidth={true} style={Styles.collapseStyles([styles.tabBarContainer, {height: 48 + labelHeight * presence}])}>
        <Kb.ScrollView horizontal={true}>
        {Constants.services.map(service => (
          <ServiceIcon
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

// xxx clean up platform styles
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
