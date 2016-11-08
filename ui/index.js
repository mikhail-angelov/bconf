require("riot-mui/build/styles/riot-mui.min.css");
require("flexboxgrid/dist/flexboxgrid.css");
require("material-design-icons/iconfont/material-icons.css");

require('./router')
require('./services/eventBus')
require('./services/connectionManager')
require('riot-mui')

require('./components/welcome.tag')
require('./components/auth/auth.tag')
require('./components/auth/signup.tag')
require('./components/auth/signin.tag')
require('./components/auth/forget.tag')
require('./components/main/main.tag')
require('./components/main/tabs.tag')
require('./components/main/chat.tag')
require('./components/main/chatmenu.tag')
require('./components/main/chatinput.tag')
require('./components/main/useraccountinfo.tag')
require('./components/main/useraccountsettings.tag')
require('./components/main/searchbar.tag')
require('./components/main/contacts.tag')
require('./components/main/navbar.tag')
require('./components/main/contactItem.tag')
