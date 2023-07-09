export interface INotifications {
  sender: string;
  receivers: string[];
  header: string;
  body: string;
  read: boolean;
}

export interface INotificationFull extends INotifications {
  sendEmail: boolean;
}

export default INotifications;
