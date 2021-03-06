export const recordTypes: Record<number, string> = {
  0x00: 'RESET',
  0x01: 'PASSING',
  0x02: 'STATUS',
  0x45: 'FIRST_CONTACT',
  0xff: 'ERROR',
  0x03: 'VERSION',
  0x04: 'RESEND',
  0x05: 'CLEAR_PASSING',
  0x18: 'WATCHDOG',
  0x20: 'PING',
  0x2d: 'SIGNALS',
  0x13: 'SERVER_SETTINGS',
  0x15: 'SESSION',
  0x28: 'GENERAL_SETTINGS',
  0x2f: 'LOOP_TRIGGER',
  0x30: 'GPS_INFO',
  0x4a: 'TIMELINE',
  0x24: 'GET_TIME',
  0x16: 'NETWORK_SETTINGS',
};
