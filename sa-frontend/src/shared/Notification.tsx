import { notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const openNotification = (title: string, text: string, type: NotificationType, closeHandler?: () => void) => {
  notification[type]({
    message: title,
    description: text,
    onClose: closeHandler
  });
};

