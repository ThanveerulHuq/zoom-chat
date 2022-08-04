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

export interface State {
  text: string;
  sid: string;
}

export interface Buttons {
  fields: string[];
  states: State[];
  min: number;
  max: number;
  key: string;
  redirectToState: boolean;
}

export interface Sender {
  id: string;
  name: string;
  img: string;
  timestamp: number;
}

export interface ChannelInfo {
  channelId: string;
  messages: Message[];
  end: boolean;
  botActive: boolean;
  showTypingIndicator: boolean;
  members: any[];
  sender: Sender;
  input: boolean;
  eventType: string;
  messageTimestamp: number;
}

export interface Message {
  type: string;
  text: string;
  isEditorActive?: boolean;
  pause?: number;
  id?: string;
  buttons?: Button;
  key?: string;
  input?: Input[];
  name?: string;
}

export interface ButtonState {
  text: string;
  sid: string;
}

export interface Button {
  fields: string[];
  states: ButtonState[];
  min: number;
  max: number;
  key: string;
  redirectToState: boolean;
}
export interface Input {
  name: string;
  key: string;
  type: string;
  text: string;
  validateDomains: boolean;
  value: string;
  disabled: boolean;
}
