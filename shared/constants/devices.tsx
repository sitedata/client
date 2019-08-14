import * as SettingsConstants from './settings'
import * as Tabs from './tabs'
import * as Types from './types/devices'
import * as WaitingConstants from './waiting'
import * as RPCTypes from './types/rpc-gen'
import {isMobile} from './platform'
import {TypedState} from './reducer'
import HiddenString from '../util/hidden-string'

export const rpcDeviceToDevice = (d: RPCTypes.DeviceDetail): Types.Device =>
  makeDevice({
    created: d.device.cTime,
    currentDevice: d.currentDevice,
    deviceID: Types.stringToDeviceID(d.device.deviceID),
    lastUsed: d.device.lastUsedTime,
    name: d.device.name,
    provisionedAt: d.provisionedAt,
    provisionerName: d.provisioner ? d.provisioner.name : undefined,
    revokedAt: d.revokedAt,
    revokedByName: d.revokedByDevice ? d.revokedByDevice.name : undefined,
    type: Types.stringToDeviceType(d.device.type),
  })

const emptyDevice = {
  created: 0,
  currentDevice: false,
  deviceID: Types.stringToDeviceID(''),
  lastUsed: 0,
  name: '',
  type: Types.stringToDeviceType('desktop'),
}

export const makeDevice = (d?: Partial<Types.Device>): Types.Device =>
  d ? Object.assign({...emptyDevice}, d) : emptyDevice

export const devicesTabLocation = isMobile
  ? [Tabs.settingsTab, SettingsConstants.devicesTab]
  : [Tabs.devicesTab]
export const waitingKey = 'devices:devicesPage'

export const isWaiting = (state: TypedState) => WaitingConstants.anyWaiting(state, waitingKey)
export const getDevice = (state: TypedState, id: Types.DeviceID | null) =>
  id ? state.devices.deviceMap.get(id, emptyDevice) : emptyDevice
export const getDeviceCounts = (state: TypedState) => ({
  numActive: state.devices.deviceMap.count(v => !v.revokedAt),
  numRevoked: state.devices.deviceMap.count(v => !!v.revokedAt),
})
export const getEndangeredTLFs = (state: TypedState, id: Types.DeviceID | null) =>
  id ? state.devices.endangeredTLFMap.get(id, emptySet) : emptySet
