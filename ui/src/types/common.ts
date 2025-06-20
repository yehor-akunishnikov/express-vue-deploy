export type AlertConfig = {
  title?: string;
  description?: string;
  severity: ALERT_SEVERITY;
  durationMs?: number;
  id?: string;
};

export enum ALERT_SEVERITY {
  ERROR = "Error",
  WARNING = "Warning",
  INFO = "Info",
}
