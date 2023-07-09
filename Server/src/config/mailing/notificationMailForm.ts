import INotifications from "@interfaces/model/notifications";
type NotificationMailForm = (
  name1: string,
  name2: string,
  notiDocument: INotifications
) => string;
const notificationMailForm: NotificationMailForm = (
  senderName: string,
  receiverName: string,
  notification: INotifications
) => {
  return `
  <!doctype html>
  <html lang="vi-VN">

  <head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>VietCraft Notifications</title>
    <meta name="description" content="Notifications Email Template">
    <style type="text/css">
      a:hover {text-decoration: none !important;}
      :focus {outline: none;border: 0;}
    </style>
  </head>

  <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" bgcolor="#eaeeef"
    leftmargin="0">
    <!--100% body table-->
    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
      style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
      <tr>
        <td>
          <table style="background-color: #f2f3f8; max-width:670px; margin:0 auto;" width="100%" border="0" align="center"
            cellpadding="0" cellspacing="0">
            <tr>
              <td height="40px;">&nbsp;</td>
            </tr>
            <tr>
              <td>
                <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                  style="max-width:600px; background:#fff; border-radius:3px; text-align:left;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                  <tr>
                    <td style="padding:40px;">
                      <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
                        <tr>
                          <td>
                            <h1 style="color: #1e1e2d; font-weight: 500; margin: 0; font-size: 32px;font-family:'Rubik',sans-serif;">Hi <strong>${receiverName}</strong>,</h1>
                            <p style="font-size:15px; color:#455056; line-height:24px; margin:8px 0 30px;">Here is a notification from <strong>${senderName}</strong>:</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="border:1.5px solid #888; padding: 16px; border-radius: 8px;">
                            <p>${notification.header}</p>
                            <hr/>
                            <p>${notification.body}</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="height:25px;">&nbsp;</td>
            </tr>
            <tr>
              <td style="text-align:center;">
                  <p style="font-size:14px; color:#455056bd; line-height:18px; margin:0 0 0;"><strong>VietCraft.vn</strong></p>
              </td>
            </tr>
            <tr>
              <td style="height:80px;">&nbsp;</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <!--/100% body table-->
  </body>

  </html>`;
};
export default notificationMailForm;
