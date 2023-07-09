import Locals from "@provider/locals";
const mailServer = {
  name: '🫖VietCraft.vn👜',
  address: Locals.config().mailerUsername,
  keypass: Locals.config().mailerPassword
}
export default mailServer;