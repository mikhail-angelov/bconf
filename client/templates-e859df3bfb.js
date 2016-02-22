angular.module("bconfApp").run(["$templateCache", function($templateCache) {$templateCache.put("web/chat/chat.html","<section layout=\"column\" layout-fill>\n\n    <md-toolbar>\n        <div class=\"md-toolbar-tools\">\n            <img ng-src=\"{{vm.user.avatar || \'assets/images/anonymous.png\'}}\" class=\"face\" alt=\"{{vm.user.displayName}}\">\n\n            <h2>\n                <span>{{vm.user.name || vm.user.email}}</span>\n            </h2>\n            <span flex></span>\n\n\n\n            <md-menu>\n                <md-button aria-label=\"menu\" class=\"md-icon-button\" ng-click=\"vm.openMenu($mdOpenMenu, $event)\">\n                    <md-icon md-svg-icon=\"assets/material/menu.svg\"></md-icon>\n                </md-button>\n                <md-menu-content width=\"4\">\n                    <md-menu-item>\n                        <md-button ng-click=\"vm.onLogout()\">\n                            <md-icon md-svg-icon=\"assets/material/ic_person_24px.svg\" md-menu-align-target></md-icon>\n                            Logout\n                        </md-button>\n                    </md-menu-item>\n                    <md-menu-divider></md-menu-divider>\n                    <md-menu-item>\n                        <md-button ng-click=\"vm.settings()\">\n                            <md-icon md-svg-icon=\"assets/material/upload.svg\"></md-icon>\n                            Settings\n                        </md-button>\n                    </md-menu-item>\n                </md-menu-content>\n            </md-menu>\n        </div>\n    </md-toolbar>\n\n\n    <section layout=\"row\" layout-fill flex>\n        <div flex=\"25\" layout-fill class=\"border\" roster></div>\n\n        <div flex layout=\"column\" layout-fill messages></div>\n    </section>\n</section>\n");
$templateCache.put("web/main/main.html","<section layout=\"column\" layout-align=\"center center\" layout-fit class=\"page\">\n    <div class=\"title\">Simple messenger</div>\n    <div style=\"width:200px;\" layout=\"row\" layout-align=\"center center\">\n        <md-button class=\"md-raised md-warn\" ng-click=\"vm.onLogin()\">Join</md-button>\n        <md-button class=\"md-raised md-warn\" ng-click=\"vm.onLoginGuest()\">Try</md-button>\n    </div>\n</section>\n\n\n<footer></footer>\n\n<!--<md-fab-speed-dial md-open=\"false\" md-direction=\"up\"-->\n                   <!--class=\"md-fling\" style=\"position: fixed; bottom: 100px; right: 100px\">-->\n    <!--<md-fab-trigger>-->\n        <!--<md-button aria-label=\"menu\" class=\"md-fab md-warn\">Login-->\n            <!--&lt;!&ndash;<md-icon md-svg-src=\"img/icons/menu.svg\"></md-icon>&ndash;&gt;-->\n        <!--</md-button>-->\n    <!--</md-fab-trigger>-->\n    <!--<md-fab-actions>-->\n        <!--<md-button aria-label=\"Twitter\" class=\"md-fab md-raised md-mini\">-->\n            <!--t-->\n        <!--</md-button>-->\n        <!--<md-button aria-label=\"Facebook\" class=\"md-fab md-raised md-mini\">-->\n            <!--f-->\n        <!--</md-button>-->\n        <!--<md-button aria-label=\"Google Hangout\" class=\"md-fab md-raised md-mini\">-->\n            <!--g-->\n        <!--</md-button>-->\n    <!--</md-fab-actions>-->\n<!--</md-fab-speed-dial>-->\n\n");
$templateCache.put("web/oauth-buttons/oauth-buttons.html","<a ng-class=\"classes\" ng-click=\"OauthButtons.loginOauth(\'facebook\')\" class=\"btn btn-facebook\">\n  <i class=\"fa fa-facebook\"></i>\n  Connect with Facebook\n</a>\n<a ng-class=\"classes\" ng-click=\"OauthButtons.loginOauth(\'google\')\" class=\"btn btn-google\">\n  <i class=\"fa fa-google-plus\"></i>\n  Connect with Google+\n</a>\n<a ng-class=\"classes\" ng-click=\"OauthButtons.loginOauth(\'twitter\')\" class=\"btn btn-twitter\">\n  <i class=\"fa fa-twitter\"></i>\n  Connect with Twitter\n</a>\n");
$templateCache.put("web/voiceCall/voiceCall.html","<link rel=\"stylesheet\" href=\"components/voiceCall/voiceCall.css\"/>\n\n<md-whiteframe class=\"callPanel md-whiteframe-z1\" layout=\"column\">\n  <div ng-class=\"{\'incomingCallTitle\': isIncoming()}\" class=\"callTitle\">\n    <!--<div class=\"md-toolbar-tools\">-->\n      <h3 ng-show=\"isIncoming()\">Incoming Call ...</h3>\n      <h3 ng-show=\"isDialing()\">Dialing ...</h3>\n      <h3 ng-show=\"isConnected()\">Connected</h3>\n    <h4>{{callInfo.contact.displayName}}</h4>\n    <!--</div>-->\n  </div>\n  <md-content class=\"md-padding\">\n    <div class=\"callAvatar\">\n      <img ng-src=\"{{callInfo.contact.avatar || \'images/anonymous.png\'}}\" class=\"face callAvatar\" alt=\"{{callInfo.contact.displayName}}\">\n    </div>\n    <div>\n\n    </div>\n    <div layout=\"row\" layout-align=\"center center\">\n      <md-button class=\"md-raised hangUpButton\" ng-click=\"handUp()\">\n        HANG UP\n      </md-button>\n      <md-button class=\"md-raised answerButton\" ng-show=\"isIncoming()\" ng-click=\"answerCall()\">\n        ANSWER\n      </md-button>\n    </div>\n  </md-content>\n\n</md-whiteframe>\n\n");
$templateCache.put("web/account/login/login.html","<section layout=\"row\" layout-align=\"center center\" class=\"page\">\n    <md-whiteframe id=\"login-panel\" class=\"md-whiteframe-1dp login-panel\" layout=\"column\" layout-align=\"center center\"\n                   ng-class=\"{\'animated shake\': !!vm.errors}\">\n        <md-button class=\"md-icon-button md-accent closeButton\" aria-label=\"close\" ng-click=\"vm.onClose()\">\n            <md-icon md-svg-icon=\"arrow-back\"></md-icon>\n        </md-button>\n\n        <section layout=\"row\" layout-fit layout-align=\"center center\" class=\"login-container\">\n            <div layout=\"column\" flex>\n                <a class=\"md-button md-raised md-primary\" ng-href=\"/auth{{vm.facebookLink}}\" target=\"_top\">\n                    <md-icon md-svg-icon=\"assets/material/facebook.svg\"></md-icon>\n                    Facebook\n                </a>\n                <a class=\"md-button md-raised md-warn\" ng-href=\"/auth{{vm.twitterLink}}\" target=\"_self\">\n                    <md-icon md-svg-icon=\"assets/material/twitter.svg\"></md-icon>\n                    Twitter\n                </a>\n                <a class=\"md-button md-raised md-danger\" ng-href=\"/auth{{vm.googleLink}}\" target=\"_self\">\n                    <md-icon md-svg-icon=\"assets/material/hangout.svg\"></md-icon>\n                    Google\n                </a>\n                <a class=\"md-button md-raised md-info\" ng-href=\"/auth{{vm.yandexLink}}\" target=\"_self\">\n                    Я\n                    Yandex\n                </a>\n            </div>\n            <div class=\"login-delimiter\"></div>\n            <div layout=\"column\" flex layout-align=\"center center\" class=\"login-left\">\n                <form name=\"loginForm\" ng-show=\"vm.isViewType(\'login\')\">\n                    <div class=\"login-title\">Sign in manually</div>\n                    <input required type=\"email\" name=\"clientEmail\" ng-model=\"vm.user.email\" class=\"login-input\"\n                           minlength=\"1\" maxlength=\"255\" ng-pattern=\"/^.+@.+\\..+$/\" placeholder=\"email\"/>\n\n\n                    <input required type=\"password\" name=\"password\" ng-model=\"vm.user.password\"\n                           minlength=\"1\" class=\"login-input\" placeholder=\"password\"/>\n\n\n                    <div layout=\"row\" layout-align=\"center center\">\n\n                        <input  type=\"checkbox\" ng-model=\"vm.user.remember\"/>\n                        <label>remember me</label>\n\n                        <md-button class=\"md-raised md-primary\" ng-click=\"vm.login(loginForm)\">Sign in</md-button>\n                    </div>\n                </form>\n                <form name=\"signUpForm\" ng-show=\"vm.isViewType(\'signUp\')\">\n\n                    <input required type=\"email\" name=\"clientEmail\" ng-model=\"vm.user.email\" class=\"login-input\"\n                           minlength=\"1\" maxlength=\"255\" ng-pattern=\"/^.+@.+\\..+$/\" placeholder=\"email\"/>\n\n\n                    <input required type=\"password\" name=\"password\" ng-model=\"vm.user.password\"\n                           class=\"login-input\" placeholder=\"password\"/>\n                    <input required type=\"password\" name=\"password2\" ng-model=\"vm.user.password2\"\n                           class=\"login-input\" placeholder=\"repeat password\"/>\n\n\n                    <div layout=\"row\" layout-align=\"center center\">\n\n                        <md-button class=\"md-raised md-primary\" ng-click=\"vm.register(signUpForm)\">Sign up</md-button>\n                    </div>\n                </form>\n                <form name=\"forgotPasswordForm\" ng-show=\"vm.isViewType(\'forgotPassword\')\">\n                    <div class=\"login-title\">Reset password</div>\n\n                    <input required type=\"email\" name=\"clientEmail\" ng-model=\"vm.user.email\" class=\"login-input\"\n                           minlength=\"1\" maxlength=\"255\" ng-pattern=\"/^.+@.+\\..+$/\" placeholder=\"email\"/>\n\n\n                    <div layout=\"row\" layout-align=\"center center\">\n\n                        <md-button class=\"md-raised md-primary\" ng-click=\"vm.resetPassword(forgotPasswordForm)\">Reset password\n                        </md-button>\n                    </div>\n                </form>\n\n\n                <div layout=\"row\" class=\"login-footer\">\n                    <a href=\"\" ng-click=\"vm.setViewType(\'login\')\" ng-show=\"!vm.isViewType(\'login\')\">Login</a>\n                    <a href=\"\" ng-click=\"vm.setViewType(\'signUp\')\" ng-show=\"!vm.isViewType(\'signUp\')\">Sign up</a>\n                    <a href=\"\" ng-click=\"vm.setViewType(\'forgotPassword\')\" ng-show=\"!vm.isViewType(\'forgotPassword\')\">Forgot\n                        your password?</a>\n                </div>\n\n                <div ng-show=\"vm.errors\" class=\"error\">\n                    {{vm.errors}}\n                </div>\n\n\n            </div>\n        </section>\n\n    </md-whiteframe>\n</section>\n\n");
$templateCache.put("web/account/loginGuest/loginGuest.html","<section layout=\"row\" layout-align=\"center center\" class=\"page\">\n    <md-whiteframe id=\"loginGuest-panel\" class=\"md-whiteframe-1dp loginGuest-panel\" layout=\"column\" layout-align=\"center center\"\n                   ng-class=\"{\'animated shake\': !!vm.errors}\">\n        <md-button class=\"md-icon-button md-accent closeButton\" aria-label=\"close\" ng-click=\"vm.onClose()\">\n            <md-icon md-svg-icon=\"arrow-back\"></md-icon>\n        </md-button>\n        <section layout=\"column\" layout-fit layout-align=\"center center\" class=\"login-container\">\n            <form name=\"loginGuestForm\" ayout-fit layout-align=\"center center\">\n                <div class=\"login-title\">Sign in as guest</div>\n                <img src=\"assets/images/capture.png\" class=\"capture\">\n                <input  name=\"capture\" ng-model=\"vm.capture\" class=\"login-input\"\n                        placeholder=\"capture\"/>\n\n                    <md-button class=\"md-raised md-primary\" ng-click=\"vm.login(loginGuestForm)\">Sign in</md-button>\n\n            </form>\n        </section>\n\n    </md-whiteframe>\n</section>\n\n");
$templateCache.put("web/chat/messages/messages.html","<section layout-fill layout=\"column\" flex ng-show=\"vm.chat\" class=\"messages\">\n\n    <section class=\"chat-name\" layout=\"row\" layout-align=\"center center\">\n       {{vm.chat.name}}\n    </section>\n    <md-content layout-fill flex>\n        <md-list-item ng-repeat=\"item in vm.messages\">\n            <md-divider ng-if=\"!$last\"></md-divider>\n            <md-item-content>\n                <div class=\"md-tile-content\">\n                    {{item.date | date:\'hh:mm\'}} {{item.type}} : {{item.msg}}\n                </div>\n            </md-item-content>\n        </md-list-item>\n    </md-content>\n\n\n    <form ng-submit=\"vm.onSend()\" layout=\"row\">\n\n        <textarea flex ng-model=\"vm.newMessage\"></textarea>\n\n        <md-button flex=\"20\" class=\"md-raised\" type=\"submit\">Send</md-button>\n\n    </form>\n\n</section>\n\n<section layout-fill layout=\"column\" flex ng-hide=\"vm.chat\">\n    <p>No chat selected, pick a chat.</p>\n</section>");
$templateCache.put("web/chat/roster/roster.html","<section layout-fill layout=\"column\" flex class=\"roster\">\n\n    <section layout=\"row\">\n        <input class=\"search\" ng-model=\"vm.searchContact\" flex>\n\n        <md-button class=\"md-icon-button md-accent\" aria-label=\"add\" ng-click=\"vm.onAddContact()\">\n            <md-icon md-svg-icon=\"add-circle\" md-menu-align-target></md-icon>\n        </md-button>\n    </section>\n\n    <md-content layout-fill flex>\n        <md-list-item class=\"md-2-line\" ng-repeat=\"item in vm.chats\" ng-click=\"vm.onSelect($index)\"\n                ng-class=\"{selected:($index==vm.currentChatIndex)}\" hover-toggle=\"item.hover\">\n            <img ng-src=\"assets/material/ic_person_24px.svg\" class=\"md-avatar\" alt=\"img\" ng-hide=\"item.type == \'bot\'\"/>\n            <md-icon md-svg-icon=\"android\" class=\"md-avatar\" ng-show=\"item.type == \'bot\'\"></md-icon>\n\n            <div class=\"md-list-item-text\" layout=\"column\">\n                <h3>{{ item.name }}</h3>\n                <h4>{{ item.provider }}</h4>\n            </div>\n\n            <md-button class=\"md-icon-button md-accent\" aria-label=\"accept\" ng-click=\"vm.onAcceptContact($index)\"\n                       ng-show=\"item.hover && item.status===\'request\'\">\n                <md-icon md-svg-icon=\"add-circle\" md-menu-align-target></md-icon>\n            </md-button>\n\n            <md-button class=\"md-icon-button md-accent\" aria-label=\"remove\" ng-click=\"vm.onRemoveContact($index)\"\n                       ng-show=\"item.hover\">\n                <md-icon md-svg-icon=\"arrow-drop-down-circle\" md-menu-align-target></md-icon>\n            </md-button>\n\n\n            <md-divider ng-if=\"!$last\"></md-divider>\n        </md-list-item>\n\n\n    </md-content>\n\n</section>");
$templateCache.put("web/chat/roster/contactForm/contactForm.html","<md-dialog aria-label=\"\" class=\"findContact\">\n    <form>\n        <section layout=\"row\" class=\"search\">\n            <input placeholder=\"search contact\" ng-model=\"vm.searchContact\" flex>\n\n            <md-button class=\"md-icon-button md-accent\" aria-label=\"search\" ng-click=\"vm.onFindContact()\">\n                Find\n            </md-button>\n        </section>\n\n        <md-dialog-content class=\"resultList\">\n            <md-list-item class=\"md-2-line\" ng-repeat=\"item in vm.contacts\" ng-click=\"vm.onSelect($index)\"\n                          ng-class=\"{selected:($index==vm.currentContactIndex)}\">\n                <div class=\"md-list-item-text\" layout=\"row\" layout-padding>\n                    <h3>{{ item.name }}</h3>\n                    <h4>{{ item.provider }}</h4>\n                    <div flex></div>\n                    <md-button class=\"md-accent\" aria-label=\"invite\" ng-click=\"vm.onInvite($index)\">\n                        Send invitation\n                    </md-button>\n                </div>\n                <md-divider ng-if=\"!$last\"></md-divider>\n            </md-list-item>\n        </md-dialog-content>\n\n\n        <md-dialog-actions layout=\"row\">\n            <md-button ng-click=\"vm.onClose()\" >\n                Close\n            </md-button>\n        </md-dialog-actions>\n    </form>\n</md-dialog>");}]);