export interface SystemProperties {
  TRACE_ON: string;
  TIMER_DEQUEUE_MS: string;
  __BORNHOST: string;
  TIMER_ENQUEUE_MS: string;
  TIMER_OUT_MS: string;
  MIN_OFFSET: string;
  REAL_TOPIC: string;
  MAX_OFFSET: string;
  MSG_REGION: string;
  KEYS: string;
  TIMER_DELIVER_MS: string;
  UNIQ_KEY: string;
  REAL_QID: string;
}

export interface UserProperties {
  BODY_MD5: string;
  __STARTDELIVERTIME: string;
}

export interface Body {
  body: string;
  eventName: string;
  messageId: string;
  requestId: string;
}

export interface Data {
  systemProperties?: SystemProperties;
  userProperties?: UserProperties;
  msgId: string;
  topic: string;
  body: Body;
}

export interface RootObject {
  datacontenttype?: string;
  aliyunaccountid?: string;
  data: Data;
  subject?: string;
  aliyunoriginalaccountid?: string;
  source?: string;
  type?: string;
  aliyunpublishtime?: Date;
  specversion?: string;
  aliyuneventbusname?: string;
  id?: string;
  time?: Date;
  aliyunregionid?: string;
  aliyunpublishaddr?: string;
}
