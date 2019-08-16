import * as React from 'react'
import * as Types from '../constants/types/people'
import * as Kb from '../common-adapters'
import * as Styles from '../styles'
import * as Container from '../util/container'
import * as SignupGen from '../actions/signup-gen'
import Todo from './todo/container'
import FollowNotification from './follow-notification'
import Announcement from './announcement/container'
import FollowSuggestions from './follow-suggestions'
import {Props} from '.'
import AirdropBanner from '../wallets/airdrop/banner/container'

export const itemToComponent: (item: Types.PeopleScreenItem, props: Props) => React.ReactNode = (
  item,
  props
) => {
  switch (item.type) {
    case 'todo':
      return (
        <Todo
          badged={item.badged}
          confirmLabel={item.confirmLabel}
          icon={item.icon}
          instructions={item.instructions}
          key={item.todoType}
          metadata={item.metadata}
          todoType={item.todoType}
        />
      )
    case 'notification':
      return (
        // @ts-ignore not sure why this is being weird w/ records
        <FollowNotification
          type={item.type}
          newFollows={item.newFollows}
          notificationTime={item.notificationTime}
          badged={item.badged}
          numAdditional={item.numAdditional}
          key={String(item.notificationTime.getTime())}
          onClickUser={props.onClickUser}
        />
      )
    case 'announcement':
      return (
        <Announcement
          appLink={item.appLink}
          badged={item.badged}
          confirmLabel={item.confirmLabel}
          dismissable={item.dismissable}
          iconUrl={item.iconUrl}
          id={item.id}
          key={item.text}
          text={item.text}
          url={item.url}
        />
      )
  }
  return null
}

const EmailVerificationBanner = ({email}) => {
  const dispatch = Container.useDispatch()
  React.useEffect(
    () =>
      // Only have a cleanup function
      () => dispatch(SignupGen.createClearJustSignedUpEmail()),
    []
  )
  return (
    <Kb.Banner color="green">{`Welcome to Keybase! A verification link was sent to ${email}.`}</Kb.Banner>
  )
}

export const PeoplePageList = (props: Props) => (
  <Kb.Box style={{...Styles.globalStyles.flexBoxColumn, position: 'relative', width: '100%'}}>
    {Styles.isMobile && <AirdropBanner showSystemButtons={false} />}
    {!!props.signupEmail && <EmailVerificationBanner email={props.signupEmail} />}
    {props.newItems
      .filter(item => item.type !== 'todo' || item.todoType !== 'verifyAllEmail' || !props.signupEmail)
      .map(item => itemToComponent(item, props))}
    <FollowSuggestions suggestions={props.followSuggestions} />
    {props.oldItems.map(item => itemToComponent(item, props))}
  </Kb.Box>
)
