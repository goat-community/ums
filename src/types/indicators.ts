export interface IndicatorConfig {
  payload: unknown; //TODO ADD TYPES FOR EVERY INDICATOR PAYLOAD
  url: string;
  requestMethod: string;
}

export interface TaskIDResponse {
  task_id: string;
}
