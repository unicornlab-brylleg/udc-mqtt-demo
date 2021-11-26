export enum AdminMqttActions {
  MakeSessionPending = 0,
  MakeSessionOngoing = 1,
  MakeSessionEnded = 2,
  MakeSessionCancelled = 3,
  MakeSessionOnHold = 4,
  MuteEveryone = 5,
  UnmuteEveryone = 6,
  KickEveryone = 7,
  HitGavel = 8,
}
