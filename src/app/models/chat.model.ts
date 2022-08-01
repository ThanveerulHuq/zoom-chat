export interface PopupMessage {
  message: string;
  info: boolean;
}

export interface Bot {
  name: string;
  company: string;
  description: string;
  img: string;
  widgetIcon: string;
  s3ImagePath: string;
  bottomMargin: number;
}

export interface Color {
  headerBackgroundColor: string;
  headerTextColor: string;
  chatBackgroundColor: string;
  chatTextColor: string;
}

export interface AlertSelectedUsers {
  enable: boolean;
  users: string[];
}

export interface VisitorOnlineStatusAlerts {
  enable: boolean;
  alertSelectedUsers: AlertSelectedUsers;
}

export interface Widget {
  show: boolean;
  delayTime: number;
}

export interface PopupMessage2 {
  show: boolean;
  delayTime: number;
}

export interface Settings {
  widgetSound: boolean;
  showPoweredByInsentText: boolean;
  bot: Bot;
  color: Color;
  leadRouting?: any;
  visitorOnlineStatusAlerts: VisitorOnlineStatusAlerts;
  enableFileSharing: boolean;
  widget: Widget;
  popupMessage: PopupMessage2;
  disableFileSharing: boolean;
}

export interface Form {
  key: string;
  formId: string;
  formName: string;
  formFields: string[];
  url: string;
}

export interface Element {
  key: string;
  elementId: string;
  elementName: string;
  cssSelectors: string;
  clickUrl: string;
  enableForAllURLs?: boolean;
}

export interface ExternalTriggers {
  forms: Form[];
  elements: Element[];
}

export interface Session {
  id: string;
  updateInterval: number;
}

export interface User {
  id: string;
}

export interface PrivacyPolicy {
  url: string;
  text: string;
}

export interface SessionResponse {
  channelId: string;
  popupMessage: PopupMessage;
  settings: Settings;
  externalTriggers: ExternalTriggers;
  initiateSocketConnection: boolean;
  session: Session;
  subscriptionChannel: string;
  user: User;
  privacyPolicy: PrivacyPolicy;
  messageTimestamp: number;
}

export interface AuthorizeResponse {
  auth: string;
  channel_data: string;
}
