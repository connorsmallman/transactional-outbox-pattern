export interface DomainEvent {
  readonly payload: any;
  readonly dateTimeOccurred: Date;
}
