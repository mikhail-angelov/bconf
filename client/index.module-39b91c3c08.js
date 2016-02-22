/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _componentsModule = __webpack_require__(1);

	var _componentsModule2 = _interopRequireDefault(_componentsModule);

	var _account = __webpack_require__(37);

	var _account2 = _interopRequireDefault(_account);

	var _mainController = __webpack_require__(40);

	var _mainController2 = _interopRequireDefault(_mainController);

	var _oauthButtonsDirective = __webpack_require__(41);

	var _oauthButtonsDirective2 = _interopRequireDefault(_oauthButtonsDirective);

	var _voiceCall = __webpack_require__(42);

	var _voiceCall2 = _interopRequireDefault(_voiceCall);

	var _chatController = __webpack_require__(43);

	var _chatController2 = _interopRequireDefault(_chatController);

	var _rosterDirective = __webpack_require__(44);

	var _rosterDirective2 = _interopRequireDefault(_rosterDirective);

	var _messagesDirective = __webpack_require__(46);

	var _messagesDirective2 = _interopRequireDefault(_messagesDirective);

	var _hoverToggle = __webpack_require__(47);

	var _hoverToggle2 = _interopRequireDefault(_hoverToggle);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	angular.module('bconfApp', ['components.module', 'bconfApp.account', 'ngSanitize', 'ui.router', 'validation.match', 'ngMaterial']).controller('MainController', _mainController2.default).controller('VoiceCallController', _voiceCall2.default).controller('ChatController', _chatController2.default).directive('oauthButtons', _oauthButtonsDirective2.default).directive('roster', _rosterDirective2.default).directive('messages', _messagesDirective2.default).directive('hoverToggle', _hoverToggle2.default).config(["$urlRouterProvider", "$locationProvider", "$stateProvider", "$mdThemingProvider", "$mdIconProvider", function ($urlRouterProvider, $locationProvider, $stateProvider, $mdThemingProvider, $mdIconProvider) {

	    $mdIconProvider.defaultIconSet('assets/material/core-icons.svg', 24);

	    $urlRouterProvider.otherwise('/');

	    $locationProvider.html5Mode(true);

	    $stateProvider.state('main', {
	        url: '/',
	        templateUrl: 'web/main/main.html',
	        controller: 'MainController',
	        controllerAs: 'vm'
	    }).state('chat', {
	        templateUrl: 'web/chat/chat.html',
	        controller: 'ChatController',
	        controllerAs: 'vm',
	        authenticate: true
	    }).state('voiceCall', {
	        templateUrl: 'web/voiceCall/voiceCall.html',
	        controller: 'VoiceCallController',
	        controllerAs: 'vm',
	        authenticate: true
	    });

	    $mdThemingProvider.theme('default').primaryPalette('pink').accentPalette('orange');
	}]);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _utilModule = __webpack_require__(2);

	var _utilModule2 = _interopRequireDefault(_utilModule);

	var _authModule = __webpack_require__(3);

	var _authModule2 = _interopRequireDefault(_authModule);

	var _appConstant = __webpack_require__(9);

	var _appConstant2 = _interopRequireDefault(_appConstant);

	var _fluxStoresModule = __webpack_require__(10);

	var _fluxStoresModule2 = _interopRequireDefault(_fluxStoresModule);

	var _restServicesModule = __webpack_require__(4);

	var _restServicesModule2 = _interopRequireDefault(_restServicesModule);

	var _constants = __webpack_require__(17);

	var _constants2 = _interopRequireDefault(_constants);

	var _redirect = __webpack_require__(18);

	var _redirect2 = _interopRequireDefault(_redirect);

	var _chatModel = __webpack_require__(19);

	var _chatModel2 = _interopRequireDefault(_chatModel);

	var _contactsModel = __webpack_require__(20);

	var _contactsModel2 = _interopRequireDefault(_contactsModel);

	var _chatService = __webpack_require__(21);

	var _chatService2 = _interopRequireDefault(_chatService);

	var _peerjs = __webpack_require__(22);

	var _peerjs2 = _interopRequireDefault(_peerjs);

	var _audio = __webpack_require__(34);

	var _audio2 = _interopRequireDefault(_audio);

	var _properties = __webpack_require__(35);

	var _properties2 = _interopRequireDefault(_properties);

	var _contactService = __webpack_require__(36);

	var _contactService2 = _interopRequireDefault(_contactService);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	angular.module('components.module', ['util.module', 'auth.module', 'fluxStores.module', 'restServices.module', 'bconfApp.constants', 'ngResource', 'ngSanitize', 'ui.router']).constant('constant', _constants2.default).controller('RedirectController', _redirect2.default).factory('ChatModel', _chatModel2.default).factory('ContactsModel', _contactsModel2.default).service('Peer', _peerjs2.default).service('ChatService', _chatService2.default).service('ContactService', _contactService2.default).factory('Audio', _audio2.default).factory('Property', _properties2.default).config(["$urlRouterProvider", "$locationProvider", "$stateProvider", function ($urlRouterProvider, $locationProvider, $stateProvider) {
	    $urlRouterProvider.otherwise('/');

	    $locationProvider.html5Mode(true);

	    $stateProvider.state('redirect', {
	        template: '<div></div>',
	        controller: 'RedirectController'
	    });
	}]).run(["ChatService", function (ChatService) {}]);

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	UtilService.$inject = ["$window"];
	angular.module('util.module', []).factory('Util', UtilService);

	function UtilService($window) {

	  var Util = {

	    /**
	     * Return a callback or noop function
	     *
	     * @param  {Function|*} cb - a 'potential' function
	     * @return {Function}
	     */
	    safeCb: function safeCb(cb) {
	      return angular.isFunction(cb) ? cb : angular.noop;
	    },

	    /**
	     * Parse a given url with the use of an anchor element
	     *
	     * @param  {String} url - the url to parse
	     * @return {Object}     - the parsed url, anchor element
	     */
	    urlParse: function urlParse(url) {
	      var a = document.createElement('a');
	      a.href = url;
	      return a;
	    },

	    /**
	     * Test whether or not a given url is same origin
	     *
	     * @param  {String}           url       - url to test
	     * @param  {String|String[]}  [origins] - additional origins to test against
	     * @return {Boolean}                    - true if url is same origin
	     */
	    isSameOrigin: function isSameOrigin(url, origins) {
	      url = Util.urlParse(url);
	      origins = origins && [].concat(origins) || [];
	      origins = origins.map(Util.urlParse);
	      origins.push($window.location);
	      origins = origins.filter(function (o) {
	        return url.hostname === o.hostname && url.port === o.port && url.protocol === o.protocol;
	      });
	      return origins.length >= 1;
	    }

	  };

	  return Util;
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _restServicesModule = __webpack_require__(4);

	var _restServicesModule2 = _interopRequireDefault(_restServicesModule);

	var _interceptorService = __webpack_require__(7);

	var _interceptorService2 = _interopRequireDefault(_interceptorService);

	var _authService = __webpack_require__(8);

	var _authService2 = _interopRequireDefault(_authService);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	angular.module('auth.module', ['ngCookies', 'restServices.module', 'ui.router']).config(["$httpProvider", function ($httpProvider) {
	    $httpProvider.interceptors.push('authInterceptor');
	}]).factory('authInterceptor', _interceptorService2.default).factory('Auth', _authService2.default).run(["$rootScope", "$state", "Auth", function ($rootScope, $state, Auth) {
	    // Redirect to login if route requires auth and the user is not logged in, or doesn't have required role
	    $rootScope.$on('$stateChangeStart', function (event, next) {
	        if (next.authenticate && !Auth.isLoggedIn()) {
	            $state.go('login');
	        }
	    });

	    //redirect to auth state
	    Auth.validateAuthState().then(function () {
	        return $state.go('redirect');
	    });
	}]);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _contactsService = __webpack_require__(5);

	var _contactsService2 = _interopRequireDefault(_contactsService);

	var _userService = __webpack_require__(6);

	var _userService2 = _interopRequireDefault(_userService);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	angular.module('restServices.module', []).service('UserServiceRest', _userService2.default).service('ContactsServiceRest', _contactsService2.default);

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ContactsServiceRest = function () {
	    function ContactsServiceRest($http) {
	        _classCallCheck(this, ContactsServiceRest);

	        this.$http = $http;
	    }

	    _createClass(ContactsServiceRest, [{
	        key: 'getContact',
	        value: function getContact(contactId) {
	            return this.$http.get('/api/users/' + contactId);
	        }
	    }, {
	        key: 'getAllContacts',
	        value: function getAllContacts() {
	            return this.$http.get('/api/contacts');
	        }
	    }, {
	        key: 'createGuest',
	        value: function createGuest() {
	            return this.$http.post('/api/users/createGuest');
	        }
	    }, {
	        key: 'findContacts',
	        value: function findContacts(text) {
	            return this.$http({
	                url: '/api/contacts/search',
	                method: "GET",
	                params: { text: text }
	            });
	        }
	    }, {
	        key: 'inviteContact',
	        value: function inviteContact(contactId, invitation) {
	            return this.$http({
	                url: '/api/contacts/invite',
	                method: "POST",
	                data: { contactId: contactId, invitation: invitation }
	            });
	        }
	    }]);

	    return ContactsServiceRest;
	}();

	exports.default = ContactsServiceRest;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UserServiceRest = function () {
	    function UserServiceRest($http) {
	        _classCallCheck(this, UserServiceRest);

	        this.$http = $http;
	    }

	    _createClass(UserServiceRest, [{
	        key: 'changePassword',
	        value: function changePassword(id, data) {
	            return this.$http({
	                method: 'PUT',
	                url: '/api/users/' + id + 'password',
	                data: data
	            });
	        }
	    }, {
	        key: 'get',
	        value: function get(id, data) {
	            return this.$http({
	                method: 'GET',
	                url: '/api/users/me'
	            }).then(function (response) {
	                return response.data;
	            });
	        }
	    }, {
	        key: 'save',
	        value: function save(data) {
	            return this.$http({
	                method: 'POST',
	                url: '/api/users',
	                data: data
	            });
	        }
	    }]);

	    return UserServiceRest;
	}();

	exports.default = UserServiceRest;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = authInterceptor;
	function authInterceptor($rootScope, $q, $injector, Util) {
	  var state;
	  return {
	    // Add authorization token to headers
	    request: function request(config) {
	      config.headers = config.headers || {};
	      var token = localStorage.getItem('token');
	      if (token && Util.isSameOrigin(config.url)) {
	        config.headers.Authorization = 'Bearer ' + token;
	      }
	      return config;
	    },

	    // Intercept 401s and redirect you to login
	    responseError: function responseError(response) {
	      if (response.status === 401) {
	        (state || (state = $injector.get('$state'))).go('login');
	        // remove any stale tokens
	        localStorage.setItem('token', null);
	      }
	      return $q.reject(response);
	    }
	  };
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = AuthService;
	function AuthService($http, $q, appConfig, UserServiceRest, EventBus, $cookies) {
	    var currentUser = null;
	    var isAuthenticated = false;

	    var Auth = {

	        login: function login(user) {
	            var _this = this;

	            return $http.post('/auth/local', {
	                email: user.email,
	                password: user.password
	            }).then(function (res) {
	                Auth.storeToken(res.data.token);
	                isAuthenticated = true;
	                return _this._loadCurrentUserAndCompleteAuth();
	            });
	        },
	        loginGuest: function loginGuest(params) {
	            var _this2 = this;

	            return $http.post('/auth/local/guest', params).then(function (res) {
	                Auth.storeToken(res.data.token);
	                isAuthenticated = true;
	                return _this2._loadCurrentUserAndCompleteAuth();
	            });
	        },

	        logout: function logout() {
	            Auth.storeToken(null);
	            currentUser = null;
	        },

	        createUser: function createUser(user) {
	            var _this3 = this;

	            return User.save(user).then(function (response) {
	                Auth.storeToken(response.data.token);
	                return _this3._loadCurrentUserAndCompleteAuth();
	            }).catch(function (err) {
	                Auth.logout();
	                return null;
	            });
	        },

	        changePassword: function changePassword(oldPassword, newPassword) {
	            return UserServiceRest.changePassword({ id: currentUser._id }, {
	                oldPassword: oldPassword,
	                newPassword: newPassword
	            });
	        },

	        validateAuthState: function validateAuthState() {
	            var token = $cookies.get('token');
	            if (token) {
	                localStorage.setItem('token', token);
	            }
	            token = localStorage.getItem('token');
	            if (token) {
	                return this._loadCurrentUserAndCompleteAuth();
	            } else {
	                return $q.reject();
	            }
	        },

	        isLoggedIn: function isLoggedIn(role) {
	            return isAuthenticated;
	        },

	        getToken: function getToken() {
	            return localStorage.getItem('token');
	        },

	        storeToken: function storeToken(token) {
	            token = token || '';
	            localStorage.setItem('token', token);
	            $cookies.remove('token');
	        },

	        _loadCurrentUserAndCompleteAuth: function _loadCurrentUserAndCompleteAuth() {
	            return UserServiceRest.get().then(function (user) {
	                isAuthenticated = true;
	                EventBus.emit(EventBus.profile.LOAD, user);
	                EventBus.emit(EventBus.auth.IN);
	                return user;
	            });
	        }
	    };

	    return Auth;
	}

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	(function (angular, undefined) {
		angular.module("bconfApp.constants", []).constant("appConfig", {
			"userRoles": ["guest", "user", "admin"]
		});
	})(angular);

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _eventBus = __webpack_require__(11);

	var _eventBus2 = _interopRequireDefault(_eventBus);

	var _chatsStore = __webpack_require__(12);

	var _chatsStore2 = _interopRequireDefault(_chatsStore);

	var _profileStore = __webpack_require__(14);

	var _profileStore2 = _interopRequireDefault(_profileStore);

	var _contactsStore = __webpack_require__(15);

	var _contactsStore2 = _interopRequireDefault(_contactsStore);

	var _messagesStore = __webpack_require__(16);

	var _messagesStore2 = _interopRequireDefault(_messagesStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	angular.module('fluxStores.module', []).service('EventBus', _eventBus2.default).service('ChatsStore', _chatsStore2.default).service('ProfileStore', _profileStore2.default).service('ContactsStore', _contactsStore2.default).service('MessagesStore', _messagesStore2.default).run(["ProfileStore", "ChatsStore", "ContactsStore", "MessagesStore", function (ProfileStore, ChatsStore, ContactsStore, MessagesStore) {}]);

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var EventBus = function () {
	    function EventBus($rootScope) {
	        _classCallCheck(this, EventBus);

	        this.$rootScope = $rootScope;
	        angular.extend(this, {
	            auth: {
	                IN: 'login',
	                OUT: 'logout'
	            },
	            profile: {
	                LOAD: 'loadProfile'
	            },
	            contacts: {
	                LOAD: 'loadContacts',
	                SELECT: 'selectContact'
	            },
	            chats: {
	                LOAD_ALL: 'loadAllChats',
	                SELECT_CHAT: 'selectCurrentChat'
	            },
	            messages: {
	                ADD: 'addMessage',
	                LOAD_ALL: 'loadAllChatMessages'
	            },
	            peer: {
	                START_CHAT: 'startChat',
	                PRESENCE: 'peerPresence',
	                INCOMING_CALL: 'incomingCall',
	                ERROR_CALL: 'errorCall',
	                CLOSE_CALL: 'closedCall',
	                CONNECTED_CALL: 'connectedCall'
	            }
	        });
	    }

	    _createClass(EventBus, [{
	        key: 'emit',
	        value: function emit(event) {
	            return this.$rootScope.$broadcast.apply(this.$rootScope, arguments);
	        }
	    }, {
	        key: 'on',
	        value: function on(event, cb) {
	            return this.$rootScope.$on(event, cb);
	        }
	    }]);

	    return EventBus;
	}();

	exports.default = EventBus;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _baseStore = __webpack_require__(13);

	var _baseStore2 = _interopRequireDefault(_baseStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ChatsStore = function (_BaseStore) {
	    _inherits(ChatsStore, _BaseStore);

	    function ChatsStore(EventBus) {
	        _classCallCheck(this, ChatsStore);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ChatsStore).call(this, EventBus));

	        _this.id = 'ChatsStore';

	        _this.data = {
	            chats: [],
	            currentChatIndex: null
	        };
	        EventBus.on(EventBus.chats.LOAD_ALL, function (scope, chats) {
	            _this.data.chats = chats;
	            _this.emitChanges();
	        });
	        EventBus.on(EventBus.chats.SELECT_CHAT, function (scope, index) {
	            _this.data.currentChatIndex = index;
	            _this.emitChanges();
	        });

	        return _this;
	    }

	    _createClass(ChatsStore, [{
	        key: 'getAllChat',
	        value: function getAllChat() {
	            return this.data.chats;
	        }
	    }, {
	        key: 'getCurrentChat',
	        value: function getCurrentChat() {
	            return this.data.chats[this.data.currentChatIndex];
	        }
	    }, {
	        key: 'getCurrentChatIndex',
	        value: function getCurrentChatIndex() {
	            return this.data.currentChatIndex;
	        }
	    }]);

	    return ChatsStore;
	}(_baseStore2.default);

	exports.default = ChatsStore;

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BaseStore = function () {
	    function BaseStore(EventBus) {
	        _classCallCheck(this, BaseStore);

	        this.EventBus = EventBus;
	        this.id = 'none';
	        this.data = {};
	    }

	    _createClass(BaseStore, [{
	        key: 'subscribe',
	        value: function subscribe(scope, cb) {
	            return scope.$on(this.id, cb);
	        }
	    }, {
	        key: 'subscribeAndInit',
	        value: function subscribeAndInit(scope, cb) {
	            cb();
	            return scope.$on(this.id, cb);
	        }
	    }, {
	        key: 'emitChanges',
	        value: function emitChanges() {
	            this.EventBus.emit(this.id);
	        }
	    }, {
	        key: 'getData',
	        value: function getData() {
	            return this.data;
	        }
	    }, {
	        key: 'setData',
	        value: function setData(data) {
	            this.data = data;
	        }
	    }]);

	    return BaseStore;
	}();

	exports.default = BaseStore;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _baseStore = __webpack_require__(13);

	var _baseStore2 = _interopRequireDefault(_baseStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ProfileStore = function (_BaseStore) {
	    _inherits(ProfileStore, _BaseStore);

	    function ProfileStore(EventBus, appConfig) {
	        _classCallCheck(this, ProfileStore);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ProfileStore).call(this, EventBus));

	        _this.id = 'ProfileStore';
	        _this.userRoles = appConfig.userRoles || [];

	        _this.data = {
	            profile: {}
	        };
	        EventBus.on(EventBus.profile.LOAD, function (scope, profile) {
	            _this.data.profile = profile;
	            _this.emitChanges();
	        });

	        return _this;
	    }

	    _createClass(ProfileStore, [{
	        key: 'getProfile',
	        value: function getProfile() {
	            return this.data.profile;
	        }
	    }, {
	        key: 'hasRole',
	        value: function hasRole(role) {
	            if (this.data.profile) {
	                return this.userRoles.indexOf(this.data.profile.role) >= this.userRoles.indexOf(role);
	            } else {
	                return false;
	            }
	        }
	    }, {
	        key: 'isAdmin',
	        value: function isAdmin() {
	            return this.hasRole('admin');
	        }
	    }]);

	    return ProfileStore;
	}(_baseStore2.default);

	exports.default = ProfileStore;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _baseStore = __webpack_require__(13);

	var _baseStore2 = _interopRequireDefault(_baseStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ContactsStore = function (_BaseStore) {
	    _inherits(ContactsStore, _BaseStore);

	    function ContactsStore(EventBus) {
	        _classCallCheck(this, ContactsStore);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ContactsStore).call(this, EventBus));

	        _this.id = 'ContactsStore';

	        _this.data = {
	            contacts: [],
	            selectedIndex: 0
	        };
	        EventBus.on(EventBus.contacts.LOAD, function (scope, contacts) {
	            _this.data.contacts = contacts || [];
	            _this.data.selectedIndex = 0;
	            _this.emitChanges();
	        });
	        EventBus.on(EventBus.contacts.SELECT, function (scope, index) {
	            _this.data.selectedIndex = index;
	            _this.emitChanges();
	        });
	        return _this;
	    }

	    _createClass(ContactsStore, [{
	        key: 'getContacts',
	        value: function getContacts() {
	            return this.data.contacts;
	        }
	    }, {
	        key: 'getSelectedContact',
	        value: function getSelectedContact() {
	            return this.data.contacts[this.data.selectedIndex];
	        }
	    }]);

	    return ContactsStore;
	}(_baseStore2.default);

	exports.default = ContactsStore;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _baseStore = __webpack_require__(13);

	var _baseStore2 = _interopRequireDefault(_baseStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MessagesStore = function (_BaseStore) {
	    _inherits(MessagesStore, _BaseStore);

	    function MessagesStore(EventBus) {
	        _classCallCheck(this, MessagesStore);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MessagesStore).call(this, EventBus));

	        _this.id = 'MessagesStore';

	        _this.data = {
	            chatMessages: []
	        };
	        EventBus.on(EventBus.messages.LOAD_ALL, function (scope, messages) {
	            _this.data.chatMessages = messages;
	            _this.emitChanges();
	        });
	        EventBus.on(EventBus.messages.ADD, function (scope, message) {
	            _this.data.chatMessages.push(message);
	            _this.emitChanges();
	        });

	        return _this;
	    }

	    _createClass(MessagesStore, [{
	        key: 'getMessages',
	        value: function getMessages() {
	            return this.data.chatMessages;
	        }
	    }]);

	    return MessagesStore;
	}(_baseStore2.default);

	exports.default = MessagesStore;

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    PEER_PATH: '/peer',
	    KEY: 'bconf',
	    URL_TO_SHARE: _.template('http://${host}:${port}/#/bconf?refer=${refer}&sharedToken=${sharedToken}'),
	    CHAT_POOLING_INTERVAL: 5000,
	    mode: { ANONYMOUS: 'anonymous', GUEST: 'guest', USER: 'user', ADMIN: 'admin' },
	    CALL_STATE: {
	        DIALLING: 'dialling',
	        CONNECTED: 'connected',
	        INCOMING: 'incoming',
	        NONE: 'none'
	    }
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var RedirectController = function RedirectController($scope, $state, $stateParams, Auth) {
	  _classCallCheck(this, RedirectController);

	  if ($stateParams && $stateParams.sharedToken && $stateParams.refer) {
	    Auth.getGuestUserInfo($stateParams.refer, $stateParams.sharedToken).then(function (guestInfo) {
	      Auth.setUserId(guestInfo.id);
	      Auth.setToken(guestInfo.accessToken);
	      $state.go('main');
	    }, function (err) {
	      console.log('can not get guest info, refer: ' + $stateParams.refer);
	      $state.go('main');
	    });
	  } else {
	    if (Auth.isLoggedIn()) $state.go('chat');else $state.go('main');
	  }
	};

	exports.default = RedirectController;

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (Peer, $rootScope, $timeout, ContactsModel) {
	  var chat = {};
	  var activeChat = '';

	  var model = {
	    list: chat,
	    init: function init(peerId) {
	      Peer.init(peerId);
	    },
	    startChat: function startChat(chatId) {
	      if (!chat.hasOwnProperty(chatId)) {
	        chat[chatId] = {
	          conn: Peer.startChat(chatId),
	          messages: [],
	          status: 'active'
	        };
	        subscribe(chat[chatId].conn, chatId);
	      }
	      model.selectChat(chatId);
	    },
	    closeChat: function closeChat(chatId) {
	      console.log('close chat ' + chatId);
	      chat[chatId].conn.close();
	      //todo implement this
	      delete chat[chatId];
	    },
	    selectChat: function selectChat(chatId) {
	      activeChat = chatId;
	      ContactsModel.resetMessageCount(chatId);
	    },
	    getActiveChat: function getActiveChat() {
	      return chat[activeChat];
	    },
	    sendMessage: function sendMessage(message) {
	      var currentChat = chat[activeChat];
	      if (currentChat) {
	        currentChat.messages.push({ type: 'out', msg: message });
	        if (currentChat.conn == null) {
	          console.log('connection is closed');
	        } else {
	          currentChat.conn.send(message);
	        }
	      }
	    },
	    startCall: function startCall(chatId) {
	      return Peer.originateCall(chatId);
	    },
	    answerCall: function answerCall(call) {
	      return Peer.answerCall(call);
	    },
	    hangUp: function hangUp() {
	      return Peer.hangUp();
	    }
	  };
	  $rootScope.$on('startChat', function (scope, data) {
	    var chatId = data.conn.peer;
	    if (!chat.hasOwnProperty(chatId)) {
	      chat[chatId] = {
	        messages: []
	      };
	    }
	    chat[chatId].conn = data.conn;
	    chat[chatId].status = 'active';
	    subscribe(chat[chatId].conn, chatId);
	    if (_.isEmpty(activeChat)) {
	      activeChat = chatId;
	    }
	    ContactsModel.incrementMessageCount(chatId);
	  });

	  function subscribe(conn, chatId) {
	    Peer.subscribe(conn, onOpen(chatId), onMessage(chatId), onClose(chatId));
	  }

	  function onOpen(chatId) {
	    return withApply(function () {
	      console.log('open ' + chatId);
	      chat[chatId].messages.push({ type: 'in', msg: 'connection is opened with ' + chatId });
	    });
	  }

	  function onMessage(chatId) {
	    return withApply(function (msg) {
	      chat[chatId].messages.push({ type: 'in', msg: msg });
	      if (chatId != activeChat) {
	        ContactsModel.incrementMessageCount(chatId);
	      }
	    });
	  }

	  function onClose(chatId) {
	    return withApply(function () {
	      console.log('closed ' + chatId);
	    });
	  }

	  function withApply(f) {
	    return function () {
	      var args = arguments;
	      $timeout(function () {
	        f.apply({}, args);
	      }); //we have to pass origin arguments to function
	    };
	  }

	  return model;
	};

	;

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (UserServiceRest, $rootScope, $timeout) {

	  var model = {
	    list: [],
	    loadContactsList: function loadContactsList(userId) {
	      return UserServiceRest.getFriends(userId).then(function (friends) {
	        model.list = friends;
	      });
	    },
	    getContact: function getContact(contactId) {
	      var result = {};
	      angular.forEach(model.list, function (contact) {
	        if (contact.id == contactId) {
	          result = contact;
	        }
	      });
	      return result;
	    },
	    incrementMessageCount: function incrementMessageCount(contactId) {
	      var contact = model.getContact(contactId);
	      if (contact) {
	        contact.newMessageCount = contact.newMessageCount ? contact.newMessageCount + 1 : 1;
	      }
	    },
	    resetMessageCount: function resetMessageCount(contactId) {
	      var contact = model.getContact(contactId);
	      if (contact) {
	        contact.newMessageCount = 0;
	      }
	    }
	  };

	  $rootScope.$on('presence', function (scope, presence) {
	    console.log('presence is changed ' + presence);
	    $timeout(function () {
	      var newContact = true;
	      angular.forEach(model.list, function (contact) {
	        if (contact.id == presence.userId) {
	          contact.status = presence.status;
	          newContact = false;
	        }
	      });
	      if (newContact && presence.status == 'online') {
	        model.list.push({ id: presence.userId, status: 'online', displayName: 'guest', avatar: 'images/anonymous.png' });
	      }
	    });
	  });
	  return model;
	};

	;

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ChatService = function () {
	    function ChatService(Peer, EventBus, ContactsModel, ChatsStore) {
	        _classCallCheck(this, ChatService);

	        this.ChatsStore = ChatsStore;
	        this.Peer = Peer;
	        this.EventBus = EventBus;

	        EventBus.on(EventBus.peer.START_CHAT, function (scope, data) {
	            var chatId = data.conn.peer;
	            if (!chat.hasOwnProperty(chatId)) {
	                chat[chatId] = {
	                    messages: []
	                };
	            }
	            chat[chatId].conn = data.conn;
	            chat[chatId].status = 'active';
	            subscribe(chat[chatId].conn, chatId);
	            if (_.isEmpty(activeChat)) {
	                activeChat = chatId;
	            }
	            ContactsModel.incrementMessageCount(chatId);
	        });
	    }

	    _createClass(ChatService, [{
	        key: 'startChat',
	        value: function startChat(chatId) {
	            //if (!chat.hasOwnProperty(chatId)) {
	            //  chat[chatId] = {
	            //    conn: Peer.startChat(chatId),
	            //    messages: [],
	            //    status: 'active'
	            //  };
	            //  subscribe(chat[chatId].conn, chatId);
	            //}
	            //model.selectChat(chatId);
	        }
	    }, {
	        key: 'closeChat',
	        value: function closeChat(chatId) {
	            console.log('close chat ' + chatId);
	            //chat[chatId].conn.close();
	            ////todo implement this
	            //delete chat[chatId];
	        }
	    }, {
	        key: 'selectChat',
	        value: function selectChat(chatId) {
	            //activeChat = chatId;
	            //ContactsModel.resetMessageCount(chatId);
	        }
	    }, {
	        key: 'getActiveChat',
	        value: function getActiveChat() {
	            //return chat[activeChat];
	        }
	    }, {
	        key: 'sendMessage',
	        value: function sendMessage(data) {
	            var payload = {
	                type: 'out',
	                date: moment().format('hh:mm'),
	                msg: data
	            };
	            var chat = this.ChatsStore.getCurrentChat();
	            if (chat.type === 'bot') {
	                var message = {
	                    bot: chat.id,
	                    type: 'BOT',
	                    payload: payload
	                };
	                this.EventBus.emit(this.EventBus.messages.ADD, payload);
	                return this.Peer.sendHostMessage(message);
	            }
	            //var currentChat = chat[activeChat];
	            //if (currentChat) {
	            //    currentChat.messages.push({type: 'out', msg: message});
	            //    if (currentChat.conn == null) {
	            //        console.log('connection is closed');
	            //    } else {
	            //        currentChat.conn.send(message);
	            //    }
	            //}
	        }
	    }, {
	        key: 'startCall',
	        value: function startCall(chatId) {
	            return this.Peer.originateCall(chatId);
	        }
	    }, {
	        key: 'answerCall',
	        value: function answerCall(call) {
	            return this.Peer.answerCall(call);
	        }
	    }, {
	        key: 'hangUp',
	        value: function hangUp() {
	            return this.Peer.hangUp();
	        }
	    }]);

	    return ChatService;
	}();

	exports.default = ChatService;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _peer = __webpack_require__(23);

	var _peer2 = _interopRequireDefault(_peer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PeerJs = function () {
	    function PeerJs($q, $rootScope, constant, Audio, Property, EventBus) {
	        var _this = this;

	        _classCallCheck(this, PeerJs);

	        this.$q = $q;
	        this.$rootScope = $rootScope;
	        this.constant = constant;
	        this.Audio = Audio;
	        this.Property = Property;
	        this.EventBus = EventBus;

	        this.peer = null;
	        this.peerId = null;
	        this.call = null;

	        EventBus.on(EventBus.auth.IN, function () {
	            return _this.init();
	        });
	    }

	    _createClass(PeerJs, [{
	        key: 'init',
	        value: function init() {
	            var _this2 = this;

	            var token = localStorage.getItem('token');
	            var key = 'peerjs';
	            var id = '123';
	            this.peerId = token;
	            this.peer = new _peer2.default(id, {
	                debug: 3, // 1: Errors, 2: Warnings, 3: All logs
	                host: this.Property.getHost(),
	                port: this.Property.getPort(),
	                key: key, //'peerjs',
	                path: '/',
	                token: token
	            });

	            this.peer.on('connection', function (conn) {
	                _this2.EventBus.emit(_this2.EventBus.peer.START_CHAT, { conn: conn });
	            });
	            this.peer.on('error', function (err) {
	                console.log('on peer error ' + err);
	            });
	            this.peer.on('disconnected', function () {
	                console.log('on peer disconnected');
	            });
	            this.peer.on('message', function (msg) {
	                console.log('on peer message ' + msg);
	            });
	            this.peer.on('presence', function (presence) {
	                _this2.EventBus.emit(_this2.EventBus.peer.PRESENCE, presence);
	            });
	            this.peer.on('call', function (incomingCall) {
	                _this2.call = incomingCall;
	                _this2.EventBus.emit(_this2.EventBus.peer.INCOMING_CALL, _this2.call);
	            });
	            this.peer.on('bot-message', function (message) {
	                message.type = 'in';
	                _this2.EventBus.emit(_this2.EventBus.messages.ADD, message);
	            });
	        }
	    }, {
	        key: 'sendHostMessage',
	        value: function sendHostMessage(message) {
	            if (this.peer) {
	                this.peer.socket.send(message);
	            }
	        }
	    }, {
	        key: 'originateCall',
	        value: function originateCall(peerId) {
	            var _this3 = this;

	            var deferred = $q.defer();
	            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
	            navigator.getUserMedia({ video: false, audio: true }, function (stream) {
	                _this3.call = _this3.peer.call(peerId, stream);
	                _this3.subscribeCall(_this3.call);
	                deferred.resolve();
	            }, function (err) {
	                console.log('Failed to get local stream', err);
	                deferred.reject();
	            });
	            return deferred.promise;
	        }
	    }, {
	        key: 'answerCall',
	        value: function answerCall(callData) {
	            var _this4 = this;

	            this.call = callData;
	            var deferred = $q.defer();
	            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
	            navigator.getUserMedia({ video: false, audio: true }, function (stream) {
	                _this4.call.answer(stream); // Answer the call with an A/V stream.
	                _this4.subscribeCall(_this4.call);
	                deferred.resolve();
	            }, function (err) {
	                console.log('Failed to get local stream', err);
	                deferred.reject();
	            });
	            return deferred.promise;
	        }
	    }, {
	        key: 'hangUp',
	        value: function hangUp() {
	            console.log('hang up');
	            if (this.call) {
	                this.call.close();
	            }
	            this.Audio.stop();
	        }
	    }, {
	        key: 'startChat',
	        value: function startChat(peerId) {
	            return this.peer.connect(peerId);
	        }
	    }, {
	        key: 'subscribe',
	        value: function subscribe(conn, onOpen, onMessage, onClose) {
	            conn.on('open', onOpen);
	            conn.on('data', onMessage);
	            conn.on('close', onClose);
	        }
	    }, {
	        key: 'subscribeCall',
	        value: function subscribeCall(call) {
	            var _this5 = this;

	            call.on('error', function (err) {
	                console.log('call error ' + err);
	                _this5.EventBus.emit(_this5.Event.peer.ERROR_CALL, err);
	            });
	            call.on('close', function () {
	                console.log('call is closed ');
	                _this5.EventBus.emit(_this5.Event.peer.CLOSE_CALL);
	            });
	            call.on('stream', function (remoteStream) {
	                console.log('call stream ' + JSON.stringify(remoteStream));
	                _this5.Audio.playStream(remoteStream);
	                remoteStream.onended = function () {
	                    console.log('ma: stream ended');
	                };
	                remoteStream.onaddtrack = function () {
	                    console.log('ma: stream onaddtrack');
	                };
	                remoteStream.onremovetrack = function () {
	                    console.log('ma: stream onremovetrack');
	                };
	                // Show stream in some <video> element.
	                _this5.EventBus.emit(_this5.Event.peer.CONNECTED_CALL);
	            });
	        }
	    }]);

	    return PeerJs;
	}();

	exports.default = PeerJs;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(24);
	//var EventEmitter = require('eventemitter3');
	var EventEmitter = __webpack_require__(28);

	var Socket = __webpack_require__(29);
	var MediaConnection = __webpack_require__(30);
	var DataConnection = __webpack_require__(32);

	/**
	 * A peer who can initiate connections with other peers.
	 */
	function Peer(id, options) {
	  if (!(this instanceof Peer)) return new Peer(id, options);
	  EventEmitter.call(this);

	  // Deal with overloading
	  if (id && id.constructor == Object) {
	    options = id;
	    id = undefined;
	  } else if (id) {
	    // Ensure id is a string
	    id = id.toString();
	  }
	  //

	  // Configurize options
	  options = util.extend({
	    debug: 0, // 1: Errors, 2: Warnings, 3: All logs
	    host: util.CLOUD_HOST,
	    port: util.CLOUD_PORT,
	    key: 'peerjs',
	    path: '/',
	    token: util.randomToken(),
	    config: util.defaultConfig
	  }, options);
	  this.options = options;
	  // Detect relative URL host.
	  if (options.host === '/') {
	    options.host = window.location.hostname;
	  }
	  // Set path correctly.
	  if (options.path[0] !== '/') {
	    options.path = '/' + options.path;
	  }
	  if (options.path[options.path.length - 1] !== '/') {
	    options.path += '/';
	  }

	  // Set whether we use SSL to same as current host
	  if (options.secure === undefined && options.host !== util.CLOUD_HOST) {
	    options.secure = util.isSecure();
	  }
	  // Set a custom log function if present
	  if (options.logFunction) {
	    util.setLogFunction(options.logFunction);
	  }
	  util.setLogLevel(options.debug);
	  //

	  // Sanity checks
	  // Ensure WebRTC supported
	  if (!util.supports.audioVideo && !util.supports.data) {
	    this._delayedAbort('browser-incompatible', 'The current browser does not support WebRTC');
	    return;
	  }
	  // Ensure alphanumeric id
	  if (!util.validateId(id)) {
	    this._delayedAbort('invalid-id', 'ID "' + id + '" is invalid');
	    return;
	  }
	  // Ensure valid key
	  if (!util.validateKey(options.key)) {
	    this._delayedAbort('invalid-key', 'API KEY "' + options.key + '" is invalid');
	    return;
	  }
	  // Ensure not using unsecure cloud server on SSL page
	  if (options.secure && options.host === '0.peerjs.com') {
	    this._delayedAbort('ssl-unavailable', 'The cloud server currently does not support HTTPS. Please run your own PeerServer to use HTTPS.');
	    return;
	  }
	  //

	  // States.
	  this.destroyed = false; // Connections have been killed
	  this.disconnected = false; // Connection to PeerServer killed but P2P connections still active
	  this.open = false; // Sockets and such are not yet open.
	  //

	  // References
	  this.connections = {}; // DataConnections for this peer.
	  this._lostMessages = {}; // src => [list of messages]
	  //

	  // Start the server connection
	  this._initializeServerConnection();
	  if (id) {
	    this._initialize(id);
	  } else {
	    this._retrieveId();
	  }
	  //
	}

	util.inherits(Peer, EventEmitter);

	// Initialize the 'socket' (which is actually a mix of XHR streaming and
	// websockets.)
	Peer.prototype._initializeServerConnection = function () {
	  var self = this;
	  this.socket = new Socket(this.options.secure, this.options.host, this.options.port, this.options.path, this.options.key);
	  this.socket.on('message', function (data) {
	    self._handleMessage(data);
	  });
	  this.socket.on('error', function (error) {
	    self._abort('socket-error', error);
	  });
	  this.socket.on('disconnected', function () {
	    // If we haven't explicitly disconnected, emit error and disconnect.
	    if (!self.disconnected) {
	      self.emitError('network', 'Lost connection to server.');
	      self.disconnect();
	    }
	  });
	  this.socket.on('close', function () {
	    // If we haven't explicitly disconnected, emit error.
	    if (!self.disconnected) {
	      self._abort('socket-closed', 'Underlying socket is already closed.');
	    }
	  });
	};

	/** Get a unique ID from the server via XHR. */
	Peer.prototype._retrieveId = function (cb) {
	  var self = this;
	  var http = new XMLHttpRequest();
	  var protocol = this.options.secure ? 'https://' : 'http://';
	  var url = protocol + this.options.host + ':' + this.options.port + this.options.path + this.options.key + '/id';
	  var queryString = '?ts=' + new Date().getTime() + '' + Math.random();
	  url += queryString;

	  // If there's no ID we need to wait for one before trying to init socket.
	  http.open('get', url, true);
	  http.onerror = function (e) {
	    util.error('Error retrieving ID', e);
	    var pathError = '';
	    if (self.options.path === '/' && self.options.host !== util.CLOUD_HOST) {
	      pathError = ' If you passed in a `path` to your self-hosted PeerServer, ' + 'you\'ll also need to pass in that same path when creating a new ' + 'Peer.';
	    }
	    self._abort('server-error', 'Could not get an ID from the server.' + pathError);
	  };
	  http.onreadystatechange = function () {
	    if (http.readyState !== 4) {
	      return;
	    }
	    if (http.status !== 200) {
	      http.onerror();
	      return;
	    }
	    self._initialize(http.responseText);
	  };
	  http.send(null);
	};

	/** Initialize a connection with the server. */
	Peer.prototype._initialize = function (id) {
	  this.id = id;
	  this.socket.start(this.id, this.options.token);
	};

	/** Handles messages from the server. */
	Peer.prototype._handleMessage = function (message) {
	  var type = message.type;
	  var payload = message.payload;
	  var peer = message.src;
	  var connection;

	  switch (type) {
	    case 'OPEN':
	      // The connection to the server is open.
	      this.emit('open', this.id);
	      this.open = true;
	      break;
	    case 'ERROR':
	      // Server error.
	      this._abort('server-error', payload.msg);
	      break;
	    case 'ID-TAKEN':
	      // The selected ID is taken.
	      this._abort('unavailable-id', 'ID `' + this.id + '` is taken');
	      break;
	    case 'INVALID-KEY':
	      // The given API key cannot be found.
	      this._abort('invalid-key', 'API KEY "' + this.options.key + '" is invalid');
	      break;

	    //
	    case 'LEAVE':
	      // Another peer has closed its connection to this peer.
	      util.log('Received leave message from', peer);
	      this._cleanupPeer(peer);
	      break;

	    case 'EXPIRE':
	      // The offer sent to a peer has expired without response.
	      this.emitError('peer-unavailable', 'Could not connect to peer ' + peer);
	      break;
	    case 'OFFER':
	      // we should consider switching this to CALL/CONNECT, but this is the least breaking option.
	      var connectionId = payload.connectionId;
	      connection = this.getConnection(peer, connectionId);

	      if (connection) {
	        util.warn('Offer received for existing Connection ID:', connectionId);
	        //connection.handleMessage(message);
	      } else {
	          // Create a new connection.
	          if (payload.type === 'media') {
	            connection = new MediaConnection(peer, this, {
	              connectionId: connectionId,
	              _payload: payload,
	              metadata: payload.metadata
	            });
	            this._addConnection(peer, connection);
	            this.emit('call', connection);
	          } else if (payload.type === 'data') {
	            connection = new DataConnection(peer, this, {
	              connectionId: connectionId,
	              _payload: payload,
	              metadata: payload.metadata,
	              label: payload.label,
	              serialization: payload.serialization,
	              reliable: payload.reliable
	            });
	            this._addConnection(peer, connection);
	            this.emit('connection', connection);
	          } else {
	            util.warn('Received malformed connection type:', payload.type);
	            return;
	          }
	          // Find messages.
	          var messages = this._getMessages(connectionId);
	          for (var i = 0, ii = messages.length; i < ii; i += 1) {
	            connection.handleMessage(messages[i]);
	          }
	        }
	      break;
	    case 'PRESENCE':
	      this.emit('presence', payload);
	      break;
	    case 'BOT':
	      this.emit('bot-message', payload);
	      break;
	    default:
	      if (!payload) {
	        util.warn('You received a malformed message from ' + peer + ' of type ' + type);
	        return;
	      }

	      var id = payload.connectionId;
	      connection = this.getConnection(peer, id);

	      if (connection && connection.pc) {
	        // Pass it on.
	        connection.handleMessage(message);
	      } else if (id) {
	        // Store for possible later use
	        this._storeMessage(id, message);
	      } else {
	        util.warn('You received an unrecognized message:', message);
	      }
	      break;
	  }
	};

	/** Stores messages without a set up connection, to be claimed later. */
	Peer.prototype._storeMessage = function (connectionId, message) {
	  if (!this._lostMessages[connectionId]) {
	    this._lostMessages[connectionId] = [];
	  }
	  this._lostMessages[connectionId].push(message);
	};

	/** Retrieve messages from lost message store */
	Peer.prototype._getMessages = function (connectionId) {
	  var messages = this._lostMessages[connectionId];
	  if (messages) {
	    delete this._lostMessages[connectionId];
	    return messages;
	  } else {
	    return [];
	  }
	};

	/**
	 * Returns a DataConnection to the specified peer. See documentation for a
	 * complete list of options.
	 */
	Peer.prototype.connect = function (peer, options) {
	  if (this.disconnected) {
	    util.warn('You cannot connect to a new Peer because you called ' + '.disconnect() on this Peer and ended your connection with the ' + 'server. You can create a new Peer to reconnect, or call reconnect ' + 'on this peer if you believe its ID to still be available.');
	    this.emitError('disconnected', 'Cannot connect to new Peer after disconnecting from server.');
	    return;
	  }
	  var connection = new DataConnection(peer, this, options);
	  this._addConnection(peer, connection);
	  return connection;
	};

	/**
	 * Returns a MediaConnection to the specified peer. See documentation for a
	 * complete list of options.
	 */
	Peer.prototype.call = function (peer, stream, options) {
	  if (this.disconnected) {
	    util.warn('You cannot connect to a new Peer because you called ' + '.disconnect() on this Peer and ended your connection with the ' + 'server. You can create a new Peer to reconnect.');
	    this.emitError('disconnected', 'Cannot connect to new Peer after disconnecting from server.');
	    return;
	  }
	  if (!stream) {
	    util.error('To call a peer, you must provide a stream from your browser\'s `getUserMedia`.');
	    return;
	  }
	  options = options || {};
	  options._stream = stream;
	  var call = new MediaConnection(peer, this, options);
	  this._addConnection(peer, call);
	  return call;
	};

	/** Add a data/media connection to this peer. */
	Peer.prototype._addConnection = function (peer, connection) {
	  if (!this.connections[peer]) {
	    this.connections[peer] = [];
	  }
	  this.connections[peer].push(connection);
	};

	/** Retrieve a data/media connection for this peer. */
	Peer.prototype.getConnection = function (peer, id) {
	  var connections = this.connections[peer];
	  if (!connections) {
	    return null;
	  }
	  for (var i = 0, ii = connections.length; i < ii; i++) {
	    if (connections[i].id === id) {
	      return connections[i];
	    }
	  }
	  return null;
	};

	Peer.prototype._delayedAbort = function (type, message) {
	  var self = this;
	  util.setZeroTimeout(function () {
	    self._abort(type, message);
	  });
	};

	/**
	 * Destroys the Peer and emits an error message.
	 * The Peer is not destroyed if it's in a disconnected state, in which case
	 * it retains its disconnected state and its existing connections.
	 */
	Peer.prototype._abort = function (type, message) {
	  util.error('Aborting!');
	  if (!this._lastServerId) {
	    this.destroy();
	  } else {
	    this.disconnect();
	  }
	  this.emitError(type, message);
	};

	/** Emits a typed error message. */
	Peer.prototype.emitError = function (type, err) {
	  util.error('Error:', err);
	  if (typeof err === 'string') {
	    err = new Error(err);
	  }
	  err.type = type;
	  this.emit('error', err);
	};

	/**
	 * Destroys the Peer: closes all active connections as well as the connection
	 *  to the server.
	 * Warning: The peer can no longer create or accept connections after being
	 *  destroyed.
	 */
	Peer.prototype.destroy = function () {
	  if (!this.destroyed) {
	    this._cleanup();
	    this.disconnect();
	    this.destroyed = true;
	  }
	};

	/** Disconnects every connection on this peer. */
	Peer.prototype._cleanup = function () {
	  if (this.connections) {
	    var peers = Object.keys(this.connections);
	    for (var i = 0, ii = peers.length; i < ii; i++) {
	      this._cleanupPeer(peers[i]);
	    }
	  }
	  this.emit('close');
	};

	/** Closes all connections to this peer. */
	Peer.prototype._cleanupPeer = function (peer) {
	  var connections = this.connections[peer];
	  for (var j = 0, jj = connections.length; j < jj; j += 1) {
	    connections[j].close();
	  }
	};

	/**
	 * Disconnects the Peer's connection to the PeerServer. Does not close any
	 *  active connections.
	 * Warning: The peer can no longer create or accept connections after being
	 *  disconnected. It also cannot reconnect to the server.
	 */
	Peer.prototype.disconnect = function () {
	  var self = this;
	  util.setZeroTimeout(function () {
	    if (!self.disconnected) {
	      self.disconnected = true;
	      self.open = false;
	      if (self.socket) {
	        self.socket.close();
	      }
	      self.emit('disconnected', self.id);
	      self._lastServerId = self.id;
	      self.id = null;
	    }
	  });
	};

	/** Attempts to reconnect with the same ID. */
	Peer.prototype.reconnect = function () {
	  if (this.disconnected && !this.destroyed) {
	    util.log('Attempting reconnection to server with ID ' + this._lastServerId);
	    this.disconnected = false;
	    this._initializeServerConnection();
	    this._initialize(this._lastServerId);
	  } else if (this.destroyed) {
	    throw new Error('This peer cannot reconnect to the server. It has already been destroyed.');
	  } else if (!this.disconnected && !this.open) {
	    // Do nothing. We're still connecting the first time.
	    util.error('In a hurry? We\'re still trying to make the initial connection!');
	  } else {
	    throw new Error('Peer ' + this.id + ' cannot reconnect because it is not disconnected from the server!');
	  }
	};

	/**
	 * Get a list of available peer IDs. If you're running your own server, you'll
	 * want to set allow_discovery: true in the PeerServer options. If you're using
	 * the cloud server, email team@peerjs.com to get the functionality enabled for
	 * your key.
	 */
	Peer.prototype.listAllPeers = function (cb) {
	  cb = cb || function () {};
	  var self = this;
	  var http = new XMLHttpRequest();
	  var protocol = this.options.secure ? 'https://' : 'http://';
	  var url = protocol + this.options.host + ':' + this.options.port + this.options.path + this.options.key + '/peers';
	  var queryString = '?ts=' + new Date().getTime() + '' + Math.random();
	  url += queryString;

	  // If there's no ID we need to wait for one before trying to init socket.
	  http.open('get', url, true);
	  http.onerror = function (e) {
	    self._abort('server-error', 'Could not get peers from the server.');
	    cb([]);
	  };
	  http.onreadystatechange = function () {
	    if (http.readyState !== 4) {
	      return;
	    }
	    if (http.status === 401) {
	      var helpfulError = '';
	      if (self.options.host !== util.CLOUD_HOST) {
	        helpfulError = 'It looks like you\'re using the cloud server. You can email ' + 'team@peerjs.com to enable peer listing for your API key.';
	      } else {
	        helpfulError = 'You need to enable `allow_discovery` on your self-hosted ' + 'PeerServer to use this feature.';
	      }
	      cb([]);
	      throw new Error('It doesn\'t look like you have permission to list peers IDs. ' + helpfulError);
	    } else if (http.status !== 200) {
	      cb([]);
	    } else {
	      cb(JSON.parse(http.responseText));
	    }
	  };
	  http.send(null);
	};

	module.exports = Peer;
	//export default Peer;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var defaultConfig = { 'iceServers': [{ 'url': 'stun:stun.l.google.com:19302' }] };
	var dataCount = 1;

	var BinaryPack = __webpack_require__(25);
	var RTCPeerConnection = __webpack_require__(27).RTCPeerConnection;

	var util = {
	  noop: function noop() {},

	  CLOUD_HOST: '0.peerjs.com',
	  CLOUD_PORT: 9000,

	  // Browsers that need chunking:
	  chunkedBrowsers: { 'Chrome': 1 },
	  chunkedMTU: 16300, // The original 60000 bytes setting does not work when sending data from Firefox to Chrome, which is "cut off" after 16384 bytes and delivered individually.

	  // Logging logic
	  logLevel: 0,
	  setLogLevel: function setLogLevel(level) {
	    var debugLevel = parseInt(level, 10);
	    if (!isNaN(parseInt(level, 10))) {
	      util.logLevel = debugLevel;
	    } else {
	      // If they are using truthy/falsy values for debug
	      util.logLevel = level ? 3 : 0;
	    }
	    util.log = util.warn = util.error = util.noop;
	    if (util.logLevel > 0) {
	      util.error = util._printWith('ERROR');
	    }
	    if (util.logLevel > 1) {
	      util.warn = util._printWith('WARNING');
	    }
	    if (util.logLevel > 2) {
	      util.log = util._print;
	    }
	  },
	  setLogFunction: function setLogFunction(fn) {
	    if (fn.constructor !== Function) {
	      util.warn('The log function you passed in is not a function. Defaulting to regular logs.');
	    } else {
	      util._print = fn;
	    }
	  },

	  _printWith: function _printWith(prefix) {
	    return function () {
	      var copy = Array.prototype.slice.call(arguments);
	      copy.unshift(prefix);
	      util._print.apply(util, copy);
	    };
	  },
	  _print: function _print() {
	    var err = false;
	    var copy = Array.prototype.slice.call(arguments);
	    copy.unshift('PeerJS: ');
	    for (var i = 0, l = copy.length; i < l; i++) {
	      if (copy[i] instanceof Error) {
	        copy[i] = '(' + copy[i].name + ') ' + copy[i].message;
	        err = true;
	      }
	    }
	    err ? console.error.apply(console, copy) : console.log.apply(console, copy);
	  },
	  //

	  // Returns browser-agnostic default config
	  defaultConfig: defaultConfig,
	  //

	  // Returns the current browser.
	  browser: function () {
	    if (window.mozRTCPeerConnection) {
	      return 'Firefox';
	    } else if (window.webkitRTCPeerConnection) {
	      return 'Chrome';
	    } else if (window.RTCPeerConnection) {
	      return 'Supported';
	    } else {
	      return 'Unsupported';
	    }
	  }(),
	  //

	  // Lists which features are supported
	  supports: function () {
	    if (typeof RTCPeerConnection === 'undefined') {
	      return {};
	    }

	    var data = true;
	    var audioVideo = true;

	    var binaryBlob = false;
	    var sctp = false;
	    var onnegotiationneeded = !!window.webkitRTCPeerConnection;

	    var pc, dc;
	    try {
	      pc = new RTCPeerConnection(defaultConfig, { optional: [{ RtpDataChannels: true }] });
	    } catch (e) {
	      data = false;
	      audioVideo = false;
	    }

	    if (data) {
	      try {
	        dc = pc.createDataChannel('_PEERJSTEST');
	      } catch (e) {
	        data = false;
	      }
	    }

	    if (data) {
	      // Binary test
	      try {
	        dc.binaryType = 'blob';
	        binaryBlob = true;
	      } catch (e) {}

	      // Reliable test.
	      // Unfortunately Chrome is a bit unreliable about whether or not they
	      // support reliable.
	      var reliablePC = new RTCPeerConnection(defaultConfig, {});
	      try {
	        var reliableDC = reliablePC.createDataChannel('_PEERJSRELIABLETEST', {});
	        sctp = reliableDC.reliable;
	      } catch (e) {}
	      reliablePC.close();
	    }

	    // FIXME: not really the best check...
	    if (audioVideo) {
	      audioVideo = !!pc.addStream;
	    }

	    // FIXME: this is not great because in theory it doesn't work for
	    // av-only browsers (?).
	    if (!onnegotiationneeded && data) {
	      // sync default check.
	      var negotiationPC = new RTCPeerConnection(defaultConfig, { optional: [{ RtpDataChannels: true }] });
	      negotiationPC.onnegotiationneeded = function () {
	        onnegotiationneeded = true;
	        // async check.
	        if (util && util.supports) {
	          util.supports.onnegotiationneeded = true;
	        }
	      };
	      negotiationPC.createDataChannel('_PEERJSNEGOTIATIONTEST');

	      setTimeout(function () {
	        negotiationPC.close();
	      }, 1000);
	    }

	    if (pc) {
	      pc.close();
	    }

	    return {
	      audioVideo: audioVideo,
	      data: data,
	      binaryBlob: binaryBlob,
	      binary: sctp, // deprecated; sctp implies binary support.
	      reliable: sctp, // deprecated; sctp implies reliable data.
	      sctp: sctp,
	      onnegotiationneeded: onnegotiationneeded
	    };
	  }(),
	  //

	  // Ensure alphanumeric ids
	  validateId: function validateId(id) {
	    // Allow empty ids
	    return !id || /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.exec(id);
	  },

	  validateKey: function validateKey(key) {
	    // Allow empty keys
	    return !key || /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.exec(key);
	  },

	  debug: false,

	  inherits: function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  },
	  extend: function extend(dest, source) {
	    for (var key in source) {
	      if (source.hasOwnProperty(key)) {
	        dest[key] = source[key];
	      }
	    }
	    return dest;
	  },
	  pack: BinaryPack.pack,
	  unpack: BinaryPack.unpack,

	  log: function log() {
	    if (util.debug) {
	      var err = false;
	      var copy = Array.prototype.slice.call(arguments);
	      copy.unshift('PeerJS: ');
	      for (var i = 0, l = copy.length; i < l; i++) {
	        if (copy[i] instanceof Error) {
	          copy[i] = '(' + copy[i].name + ') ' + copy[i].message;
	          err = true;
	        }
	      }
	      err ? console.error.apply(console, copy) : console.log.apply(console, copy);
	    }
	  },

	  setZeroTimeout: function (global) {
	    var timeouts = [];
	    var messageName = 'zero-timeout-message';

	    // Like setTimeout, but only takes a function argument.	 There's
	    // no time argument (always zero) and no arguments (you have to
	    // use a closure).
	    function setZeroTimeoutPostMessage(fn) {
	      timeouts.push(fn);
	      global.postMessage(messageName, '*');
	    }

	    function handleMessage(event) {
	      if (event.source == global && event.data == messageName) {
	        if (event.stopPropagation) {
	          event.stopPropagation();
	        }
	        if (timeouts.length) {
	          timeouts.shift()();
	        }
	      }
	    }
	    if (global.addEventListener) {
	      global.addEventListener('message', handleMessage, true);
	    } else if (global.attachEvent) {
	      global.attachEvent('onmessage', handleMessage);
	    }
	    return setZeroTimeoutPostMessage;
	  }(window),

	  // Binary stuff

	  // chunks a blob.
	  chunk: function chunk(bl) {
	    var chunks = [];
	    var size = bl.size;
	    var start = index = 0;
	    var total = Math.ceil(size / util.chunkedMTU);
	    while (start < size) {
	      var end = Math.min(size, start + util.chunkedMTU);
	      var b = bl.slice(start, end);

	      var chunk = {
	        __peerData: dataCount,
	        n: index,
	        data: b,
	        total: total
	      };

	      chunks.push(chunk);

	      start = end;
	      index += 1;
	    }
	    dataCount += 1;
	    return chunks;
	  },

	  blobToArrayBuffer: function blobToArrayBuffer(blob, cb) {
	    var fr = new FileReader();
	    fr.onload = function (evt) {
	      cb(evt.target.result);
	    };
	    fr.readAsArrayBuffer(blob);
	  },
	  blobToBinaryString: function blobToBinaryString(blob, cb) {
	    var fr = new FileReader();
	    fr.onload = function (evt) {
	      cb(evt.target.result);
	    };
	    fr.readAsBinaryString(blob);
	  },
	  binaryStringToArrayBuffer: function binaryStringToArrayBuffer(binary) {
	    var byteArray = new Uint8Array(binary.length);
	    for (var i = 0; i < binary.length; i++) {
	      byteArray[i] = binary.charCodeAt(i) & 0xff;
	    }
	    return byteArray.buffer;
	  },
	  randomToken: function randomToken() {
	    return Math.random().toString(36).substr(2);
	  },
	  //

	  isSecure: function isSecure() {
	    return location.protocol === 'https:';
	  }
	};

	module.exports = util;
	//export default util;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var BufferBuilder = __webpack_require__(26).BufferBuilder;
	var binaryFeatures = __webpack_require__(26).binaryFeatures;

	var BinaryPack = {
	  unpack: function unpack(data) {
	    var unpacker = new Unpacker(data);
	    return unpacker.unpack();
	  },
	  pack: function pack(data) {
	    var packer = new Packer();
	    packer.pack(data);
	    var buffer = packer.getBuffer();
	    return buffer;
	  }
	};

	module.exports = BinaryPack;

	function Unpacker(data) {
	  // Data is ArrayBuffer
	  this.index = 0;
	  this.dataBuffer = data;
	  this.dataView = new Uint8Array(this.dataBuffer);
	  this.length = this.dataBuffer.byteLength;
	}

	Unpacker.prototype.unpack = function () {
	  var type = this.unpack_uint8();
	  if (type < 0x80) {
	    var positive_fixnum = type;
	    return positive_fixnum;
	  } else if ((type ^ 0xe0) < 0x20) {
	    var negative_fixnum = (type ^ 0xe0) - 0x20;
	    return negative_fixnum;
	  }
	  var size;
	  if ((size = type ^ 0xa0) <= 0x0f) {
	    return this.unpack_raw(size);
	  } else if ((size = type ^ 0xb0) <= 0x0f) {
	    return this.unpack_string(size);
	  } else if ((size = type ^ 0x90) <= 0x0f) {
	    return this.unpack_array(size);
	  } else if ((size = type ^ 0x80) <= 0x0f) {
	    return this.unpack_map(size);
	  }
	  switch (type) {
	    case 0xc0:
	      return null;
	    case 0xc1:
	      return undefined;
	    case 0xc2:
	      return false;
	    case 0xc3:
	      return true;
	    case 0xca:
	      return this.unpack_float();
	    case 0xcb:
	      return this.unpack_double();
	    case 0xcc:
	      return this.unpack_uint8();
	    case 0xcd:
	      return this.unpack_uint16();
	    case 0xce:
	      return this.unpack_uint32();
	    case 0xcf:
	      return this.unpack_uint64();
	    case 0xd0:
	      return this.unpack_int8();
	    case 0xd1:
	      return this.unpack_int16();
	    case 0xd2:
	      return this.unpack_int32();
	    case 0xd3:
	      return this.unpack_int64();
	    case 0xd4:
	      return undefined;
	    case 0xd5:
	      return undefined;
	    case 0xd6:
	      return undefined;
	    case 0xd7:
	      return undefined;
	    case 0xd8:
	      size = this.unpack_uint16();
	      return this.unpack_string(size);
	    case 0xd9:
	      size = this.unpack_uint32();
	      return this.unpack_string(size);
	    case 0xda:
	      size = this.unpack_uint16();
	      return this.unpack_raw(size);
	    case 0xdb:
	      size = this.unpack_uint32();
	      return this.unpack_raw(size);
	    case 0xdc:
	      size = this.unpack_uint16();
	      return this.unpack_array(size);
	    case 0xdd:
	      size = this.unpack_uint32();
	      return this.unpack_array(size);
	    case 0xde:
	      size = this.unpack_uint16();
	      return this.unpack_map(size);
	    case 0xdf:
	      size = this.unpack_uint32();
	      return this.unpack_map(size);
	  }
	};

	Unpacker.prototype.unpack_uint8 = function () {
	  var byte = this.dataView[this.index] & 0xff;
	  this.index++;
	  return byte;
	};

	Unpacker.prototype.unpack_uint16 = function () {
	  var bytes = this.read(2);
	  var uint16 = (bytes[0] & 0xff) * 256 + (bytes[1] & 0xff);
	  this.index += 2;
	  return uint16;
	};

	Unpacker.prototype.unpack_uint32 = function () {
	  var bytes = this.read(4);
	  var uint32 = ((bytes[0] * 256 + bytes[1]) * 256 + bytes[2]) * 256 + bytes[3];
	  this.index += 4;
	  return uint32;
	};

	Unpacker.prototype.unpack_uint64 = function () {
	  var bytes = this.read(8);
	  var uint64 = ((((((bytes[0] * 256 + bytes[1]) * 256 + bytes[2]) * 256 + bytes[3]) * 256 + bytes[4]) * 256 + bytes[5]) * 256 + bytes[6]) * 256 + bytes[7];
	  this.index += 8;
	  return uint64;
	};

	Unpacker.prototype.unpack_int8 = function () {
	  var uint8 = this.unpack_uint8();
	  return uint8 < 0x80 ? uint8 : uint8 - (1 << 8);
	};

	Unpacker.prototype.unpack_int16 = function () {
	  var uint16 = this.unpack_uint16();
	  return uint16 < 0x8000 ? uint16 : uint16 - (1 << 16);
	};

	Unpacker.prototype.unpack_int32 = function () {
	  var uint32 = this.unpack_uint32();
	  return uint32 < Math.pow(2, 31) ? uint32 : uint32 - Math.pow(2, 32);
	};

	Unpacker.prototype.unpack_int64 = function () {
	  var uint64 = this.unpack_uint64();
	  return uint64 < Math.pow(2, 63) ? uint64 : uint64 - Math.pow(2, 64);
	};

	Unpacker.prototype.unpack_raw = function (size) {
	  if (this.length < this.index + size) {
	    throw new Error('BinaryPackFailure: index is out of range' + ' ' + this.index + ' ' + size + ' ' + this.length);
	  }
	  var buf = this.dataBuffer.slice(this.index, this.index + size);
	  this.index += size;

	  //buf = util.bufferToString(buf);

	  return buf;
	};

	Unpacker.prototype.unpack_string = function (size) {
	  var bytes = this.read(size);
	  var i = 0,
	      str = '',
	      c,
	      code;
	  while (i < size) {
	    c = bytes[i];
	    if (c < 128) {
	      str += String.fromCharCode(c);
	      i++;
	    } else if ((c ^ 0xc0) < 32) {
	      code = (c ^ 0xc0) << 6 | bytes[i + 1] & 63;
	      str += String.fromCharCode(code);
	      i += 2;
	    } else {
	      code = (c & 15) << 12 | (bytes[i + 1] & 63) << 6 | bytes[i + 2] & 63;
	      str += String.fromCharCode(code);
	      i += 3;
	    }
	  }
	  this.index += size;
	  return str;
	};

	Unpacker.prototype.unpack_array = function (size) {
	  var objects = new Array(size);
	  for (var i = 0; i < size; i++) {
	    objects[i] = this.unpack();
	  }
	  return objects;
	};

	Unpacker.prototype.unpack_map = function (size) {
	  var map = {};
	  for (var i = 0; i < size; i++) {
	    var key = this.unpack();
	    var value = this.unpack();
	    map[key] = value;
	  }
	  return map;
	};

	Unpacker.prototype.unpack_float = function () {
	  var uint32 = this.unpack_uint32();
	  var sign = uint32 >> 31;
	  var exp = (uint32 >> 23 & 0xff) - 127;
	  var fraction = uint32 & 0x7fffff | 0x800000;
	  return (sign == 0 ? 1 : -1) * fraction * Math.pow(2, exp - 23);
	};

	Unpacker.prototype.unpack_double = function () {
	  var h32 = this.unpack_uint32();
	  var l32 = this.unpack_uint32();
	  var sign = h32 >> 31;
	  var exp = (h32 >> 20 & 0x7ff) - 1023;
	  var hfrac = h32 & 0xfffff | 0x100000;
	  var frac = hfrac * Math.pow(2, exp - 20) + l32 * Math.pow(2, exp - 52);
	  return (sign == 0 ? 1 : -1) * frac;
	};

	Unpacker.prototype.read = function (length) {
	  var j = this.index;
	  if (j + length <= this.length) {
	    return this.dataView.subarray(j, j + length);
	  } else {
	    throw new Error('BinaryPackFailure: read index out of range');
	  }
	};

	function Packer() {
	  this.bufferBuilder = new BufferBuilder();
	}

	Packer.prototype.getBuffer = function () {
	  return this.bufferBuilder.getBuffer();
	};

	Packer.prototype.pack = function (value) {
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  if (type == 'string') {
	    this.pack_string(value);
	  } else if (type == 'number') {
	    if (Math.floor(value) === value) {
	      this.pack_integer(value);
	    } else {
	      this.pack_double(value);
	    }
	  } else if (type == 'boolean') {
	    if (value === true) {
	      this.bufferBuilder.append(0xc3);
	    } else if (value === false) {
	      this.bufferBuilder.append(0xc2);
	    }
	  } else if (type == 'undefined') {
	    this.bufferBuilder.append(0xc0);
	  } else if (type == 'object') {
	    if (value === null) {
	      this.bufferBuilder.append(0xc0);
	    } else {
	      var constructor = value.constructor;
	      if (constructor == Array) {
	        this.pack_array(value);
	      } else if (constructor == Blob || constructor == File) {
	        this.pack_bin(value);
	      } else if (constructor == ArrayBuffer) {
	        if (binaryFeatures.useArrayBufferView) {
	          this.pack_bin(new Uint8Array(value));
	        } else {
	          this.pack_bin(value);
	        }
	      } else if ('BYTES_PER_ELEMENT' in value) {
	        if (binaryFeatures.useArrayBufferView) {
	          this.pack_bin(new Uint8Array(value.buffer));
	        } else {
	          this.pack_bin(value.buffer);
	        }
	      } else if (constructor == Object) {
	        this.pack_object(value);
	      } else if (constructor == Date) {
	        this.pack_string(value.toString());
	      } else if (typeof value.toBinaryPack == 'function') {
	        this.bufferBuilder.append(value.toBinaryPack());
	      } else {
	        throw new Error('Type "' + constructor.toString() + '" not yet supported');
	      }
	    }
	  } else {
	    throw new Error('Type "' + type + '" not yet supported');
	  }
	  this.bufferBuilder.flush();
	};

	Packer.prototype.pack_bin = function (blob) {
	  var length = blob.length || blob.byteLength || blob.size;
	  if (length <= 0x0f) {
	    this.pack_uint8(0xa0 + length);
	  } else if (length <= 0xffff) {
	    this.bufferBuilder.append(0xda);
	    this.pack_uint16(length);
	  } else if (length <= 0xffffffff) {
	    this.bufferBuilder.append(0xdb);
	    this.pack_uint32(length);
	  } else {
	    throw new Error('Invalid length');
	  }
	  this.bufferBuilder.append(blob);
	};

	Packer.prototype.pack_string = function (str) {
	  var length = utf8Length(str);

	  if (length <= 0x0f) {
	    this.pack_uint8(0xb0 + length);
	  } else if (length <= 0xffff) {
	    this.bufferBuilder.append(0xd8);
	    this.pack_uint16(length);
	  } else if (length <= 0xffffffff) {
	    this.bufferBuilder.append(0xd9);
	    this.pack_uint32(length);
	  } else {
	    throw new Error('Invalid length');
	  }
	  this.bufferBuilder.append(str);
	};

	Packer.prototype.pack_array = function (ary) {
	  var length = ary.length;
	  if (length <= 0x0f) {
	    this.pack_uint8(0x90 + length);
	  } else if (length <= 0xffff) {
	    this.bufferBuilder.append(0xdc);
	    this.pack_uint16(length);
	  } else if (length <= 0xffffffff) {
	    this.bufferBuilder.append(0xdd);
	    this.pack_uint32(length);
	  } else {
	    throw new Error('Invalid length');
	  }
	  for (var i = 0; i < length; i++) {
	    this.pack(ary[i]);
	  }
	};

	Packer.prototype.pack_integer = function (num) {
	  if (-0x20 <= num && num <= 0x7f) {
	    this.bufferBuilder.append(num & 0xff);
	  } else if (0x00 <= num && num <= 0xff) {
	    this.bufferBuilder.append(0xcc);
	    this.pack_uint8(num);
	  } else if (-0x80 <= num && num <= 0x7f) {
	    this.bufferBuilder.append(0xd0);
	    this.pack_int8(num);
	  } else if (0x0000 <= num && num <= 0xffff) {
	    this.bufferBuilder.append(0xcd);
	    this.pack_uint16(num);
	  } else if (-0x8000 <= num && num <= 0x7fff) {
	    this.bufferBuilder.append(0xd1);
	    this.pack_int16(num);
	  } else if (0x00000000 <= num && num <= 0xffffffff) {
	    this.bufferBuilder.append(0xce);
	    this.pack_uint32(num);
	  } else if (-0x80000000 <= num && num <= 0x7fffffff) {
	    this.bufferBuilder.append(0xd2);
	    this.pack_int32(num);
	  } else if (-0x8000000000000000 <= num && num <= 0x7FFFFFFFFFFFFFFF) {
	    this.bufferBuilder.append(0xd3);
	    this.pack_int64(num);
	  } else if (0x0000000000000000 <= num && num <= 0xFFFFFFFFFFFFFFFF) {
	    this.bufferBuilder.append(0xcf);
	    this.pack_uint64(num);
	  } else {
	    throw new Error('Invalid integer');
	  }
	};

	Packer.prototype.pack_double = function (num) {
	  var sign = 0;
	  if (num < 0) {
	    sign = 1;
	    num = -num;
	  }
	  var exp = Math.floor(Math.log(num) / Math.LN2);
	  var frac0 = num / Math.pow(2, exp) - 1;
	  var frac1 = Math.floor(frac0 * Math.pow(2, 52));
	  var b32 = Math.pow(2, 32);
	  var h32 = sign << 31 | exp + 1023 << 20 | frac1 / b32 & 0x0fffff;
	  var l32 = frac1 % b32;
	  this.bufferBuilder.append(0xcb);
	  this.pack_int32(h32);
	  this.pack_int32(l32);
	};

	Packer.prototype.pack_object = function (obj) {
	  var keys = Object.keys(obj);
	  var length = keys.length;
	  if (length <= 0x0f) {
	    this.pack_uint8(0x80 + length);
	  } else if (length <= 0xffff) {
	    this.bufferBuilder.append(0xde);
	    this.pack_uint16(length);
	  } else if (length <= 0xffffffff) {
	    this.bufferBuilder.append(0xdf);
	    this.pack_uint32(length);
	  } else {
	    throw new Error('Invalid length');
	  }
	  for (var prop in obj) {
	    if (obj.hasOwnProperty(prop)) {
	      this.pack(prop);
	      this.pack(obj[prop]);
	    }
	  }
	};

	Packer.prototype.pack_uint8 = function (num) {
	  this.bufferBuilder.append(num);
	};

	Packer.prototype.pack_uint16 = function (num) {
	  this.bufferBuilder.append(num >> 8);
	  this.bufferBuilder.append(num & 0xff);
	};

	Packer.prototype.pack_uint32 = function (num) {
	  var n = num & 0xffffffff;
	  this.bufferBuilder.append((n & 0xff000000) >>> 24);
	  this.bufferBuilder.append((n & 0x00ff0000) >>> 16);
	  this.bufferBuilder.append((n & 0x0000ff00) >>> 8);
	  this.bufferBuilder.append(n & 0x000000ff);
	};

	Packer.prototype.pack_uint64 = function (num) {
	  var high = num / Math.pow(2, 32);
	  var low = num % Math.pow(2, 32);
	  this.bufferBuilder.append((high & 0xff000000) >>> 24);
	  this.bufferBuilder.append((high & 0x00ff0000) >>> 16);
	  this.bufferBuilder.append((high & 0x0000ff00) >>> 8);
	  this.bufferBuilder.append(high & 0x000000ff);
	  this.bufferBuilder.append((low & 0xff000000) >>> 24);
	  this.bufferBuilder.append((low & 0x00ff0000) >>> 16);
	  this.bufferBuilder.append((low & 0x0000ff00) >>> 8);
	  this.bufferBuilder.append(low & 0x000000ff);
	};

	Packer.prototype.pack_int8 = function (num) {
	  this.bufferBuilder.append(num & 0xff);
	};

	Packer.prototype.pack_int16 = function (num) {
	  this.bufferBuilder.append((num & 0xff00) >> 8);
	  this.bufferBuilder.append(num & 0xff);
	};

	Packer.prototype.pack_int32 = function (num) {
	  this.bufferBuilder.append(num >>> 24 & 0xff);
	  this.bufferBuilder.append((num & 0x00ff0000) >>> 16);
	  this.bufferBuilder.append((num & 0x0000ff00) >>> 8);
	  this.bufferBuilder.append(num & 0x000000ff);
	};

	Packer.prototype.pack_int64 = function (num) {
	  var high = Math.floor(num / Math.pow(2, 32));
	  var low = num % Math.pow(2, 32);
	  this.bufferBuilder.append((high & 0xff000000) >>> 24);
	  this.bufferBuilder.append((high & 0x00ff0000) >>> 16);
	  this.bufferBuilder.append((high & 0x0000ff00) >>> 8);
	  this.bufferBuilder.append(high & 0x000000ff);
	  this.bufferBuilder.append((low & 0xff000000) >>> 24);
	  this.bufferBuilder.append((low & 0x00ff0000) >>> 16);
	  this.bufferBuilder.append((low & 0x0000ff00) >>> 8);
	  this.bufferBuilder.append(low & 0x000000ff);
	};

	function _utf8Replace(m) {
	  var code = m.charCodeAt(0);

	  if (code <= 0x7ff) return '00';
	  if (code <= 0xffff) return '000';
	  if (code <= 0x1fffff) return '0000';
	  if (code <= 0x3ffffff) return '00000';
	  return '000000';
	}

	function utf8Length(str) {
	  if (str.length > 600) {
	    // Blob method faster for large strings
	    return new Blob([str]).size;
	  } else {
	    return str.replace(/[^\u0000-\u007F]/g, _utf8Replace).length;
	  }
	}

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';

	var binaryFeatures = {};
	binaryFeatures.useBlobBuilder = function () {
	  try {
	    new Blob([]);
	    return false;
	  } catch (e) {
	    return true;
	  }
	}();

	binaryFeatures.useArrayBufferView = !binaryFeatures.useBlobBuilder && function () {
	  try {
	    return new Blob([new Uint8Array([])]).size === 0;
	  } catch (e) {
	    return true;
	  }
	}();

	module.exports.binaryFeatures = binaryFeatures;
	var BlobBuilder = module.exports.BlobBuilder;
	if (typeof window != 'undefined') {
	  BlobBuilder = module.exports.BlobBuilder = window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder || window.BlobBuilder;
	}

	function BufferBuilder() {
	  this._pieces = [];
	  this._parts = [];
	}

	BufferBuilder.prototype.append = function (data) {
	  if (typeof data === 'number') {
	    this._pieces.push(data);
	  } else {
	    this.flush();
	    this._parts.push(data);
	  }
	};

	BufferBuilder.prototype.flush = function () {
	  if (this._pieces.length > 0) {
	    var buf = new Uint8Array(this._pieces);
	    if (!binaryFeatures.useArrayBufferView) {
	      buf = buf.buffer;
	    }
	    this._parts.push(buf);
	    this._pieces = [];
	  }
	};

	BufferBuilder.prototype.getBuffer = function () {
	  this.flush();
	  if (binaryFeatures.useBlobBuilder) {
	    var builder = new BlobBuilder();
	    for (var i = 0, ii = this._parts.length; i < ii; i++) {
	      builder.append(this._parts[i]);
	    }
	    return builder.getBlob();
	  } else {
	    return new Blob(this._parts);
	  }
	};

	module.exports.BufferBuilder = BufferBuilder;

/***/ },
/* 27 */
/***/ function(module, exports) {

	"use strict";

	module.exports.RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription;
	module.exports.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
	module.exports.RTCIceCandidate = window.RTCIceCandidate || window.mozRTCIceCandidate;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//
	// We store our EE objects in a plain object whose properties are event names.
	// If `Object.create(null)` is not supported we prefix the event names with a
	// `~` to make sure that the built-in object properties are not overridden or
	// used as an attack vector.
	// We also assume that `Object.create(null)` is available when the event name
	// is an ES6 Symbol.
	//

	var prefix = typeof Object.create !== 'function' ? '~' : false;

	/**
	 * Representation of a single EventEmitter function.
	 *
	 * @param {Function} fn Event handler to be called.
	 * @param {Mixed} context Context for function execution.
	 * @param {Boolean} once Only emit once
	 * @api private
	 */
	function EE(fn, context, once) {
	  this.fn = fn;
	  this.context = context;
	  this.once = once || false;
	}

	/**
	 * Minimal EventEmitter interface that is molded against the Node.js
	 * EventEmitter interface.
	 *
	 * @constructor
	 * @api public
	 */
	function EventEmitter() {} /* Nothing to set */

	/**
	 * Holds the assigned EventEmitters by name.
	 *
	 * @type {Object}
	 * @private
	 */
	EventEmitter.prototype._events = undefined;

	/**
	 * Return a list of assigned event listeners.
	 *
	 * @param {String} event The events that should be listed.
	 * @param {Boolean} exists We only need to know if there are listeners.
	 * @returns {Array|Boolean}
	 * @api public
	 */
	EventEmitter.prototype.listeners = function listeners(event, exists) {
	  var evt = prefix ? prefix + event : event,
	      available = this._events && this._events[evt];

	  if (exists) return !!available;
	  if (!available) return [];
	  if (available.fn) return [available.fn];

	  for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
	    ee[i] = available[i].fn;
	  }

	  return ee;
	};

	/**
	 * Emit an event to all registered event listeners.
	 *
	 * @param {String} event The name of the event.
	 * @returns {Boolean} Indication if we've emitted an event.
	 * @api public
	 */
	EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
	  var evt = prefix ? prefix + event : event;

	  if (!this._events || !this._events[evt]) return false;

	  var listeners = this._events[evt],
	      len = arguments.length,
	      args,
	      i;

	  if ('function' === typeof listeners.fn) {
	    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

	    switch (len) {
	      case 1:
	        return listeners.fn.call(listeners.context), true;
	      case 2:
	        return listeners.fn.call(listeners.context, a1), true;
	      case 3:
	        return listeners.fn.call(listeners.context, a1, a2), true;
	      case 4:
	        return listeners.fn.call(listeners.context, a1, a2, a3), true;
	      case 5:
	        return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
	      case 6:
	        return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
	    }

	    for (i = 1, args = new Array(len - 1); i < len; i++) {
	      args[i - 1] = arguments[i];
	    }

	    listeners.fn.apply(listeners.context, args);
	  } else {
	    var length = listeners.length,
	        j;

	    for (i = 0; i < length; i++) {
	      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

	      switch (len) {
	        case 1:
	          listeners[i].fn.call(listeners[i].context);break;
	        case 2:
	          listeners[i].fn.call(listeners[i].context, a1);break;
	        case 3:
	          listeners[i].fn.call(listeners[i].context, a1, a2);break;
	        default:
	          if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
	            args[j - 1] = arguments[j];
	          }

	          listeners[i].fn.apply(listeners[i].context, args);
	      }
	    }
	  }

	  return true;
	};

	/**
	 * Register a new EventListener for the given event.
	 *
	 * @param {String} event Name of the event.
	 * @param {Functon} fn Callback function.
	 * @param {Mixed} context The context of the function.
	 * @api public
	 */
	EventEmitter.prototype.on = function on(event, fn, context) {
	  var listener = new EE(fn, context || this),
	      evt = prefix ? prefix + event : event;

	  if (!this._events) this._events = prefix ? {} : Object.create(null);
	  if (!this._events[evt]) this._events[evt] = listener;else {
	    if (!this._events[evt].fn) this._events[evt].push(listener);else this._events[evt] = [this._events[evt], listener];
	  }

	  return this;
	};

	/**
	 * Add an EventListener that's only called once.
	 *
	 * @param {String} event Name of the event.
	 * @param {Function} fn Callback function.
	 * @param {Mixed} context The context of the function.
	 * @api public
	 */
	EventEmitter.prototype.once = function once(event, fn, context) {
	  var listener = new EE(fn, context || this, true),
	      evt = prefix ? prefix + event : event;

	  if (!this._events) this._events = prefix ? {} : Object.create(null);
	  if (!this._events[evt]) this._events[evt] = listener;else {
	    if (!this._events[evt].fn) this._events[evt].push(listener);else this._events[evt] = [this._events[evt], listener];
	  }

	  return this;
	};

	/**
	 * Remove event listeners.
	 *
	 * @param {String} event The event we want to remove.
	 * @param {Function} fn The listener that we need to find.
	 * @param {Mixed} context Only remove listeners matching this context.
	 * @param {Boolean} once Only remove once listeners.
	 * @api public
	 */
	EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
	  var evt = prefix ? prefix + event : event;

	  if (!this._events || !this._events[evt]) return this;

	  var listeners = this._events[evt],
	      events = [];

	  if (fn) {
	    if (listeners.fn) {
	      if (listeners.fn !== fn || once && !listeners.once || context && listeners.context !== context) {
	        events.push(listeners);
	      }
	    } else {
	      for (var i = 0, length = listeners.length; i < length; i++) {
	        if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
	          events.push(listeners[i]);
	        }
	      }
	    }
	  }

	  //
	  // Reset the array, or remove it completely if we have no more listeners.
	  //
	  if (events.length) {
	    this._events[evt] = events.length === 1 ? events[0] : events;
	  } else {
	    delete this._events[evt];
	  }

	  return this;
	};

	/**
	 * Remove all listeners or only the listeners for the specified event.
	 *
	 * @param {String} event The event want to remove all listeners for.
	 * @api public
	 */
	EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
	  if (!this._events) return this;

	  if (event) delete this._events[prefix ? prefix + event : event];else this._events = prefix ? {} : Object.create(null);

	  return this;
	};

	//
	// Alias methods names because people roll like that.
	//
	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
	EventEmitter.prototype.addListener = EventEmitter.prototype.on;

	//
	// This function doesn't apply anymore.
	//
	EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
	  return this;
	};

	//
	// Expose the prefix.
	//
	EventEmitter.prefixed = prefix;

	//
	// Expose the module.
	//
	if (true) {
	  module.exports = EventEmitter;
	}

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(24);
	var EventEmitter = __webpack_require__(28);

	/**
	 * An abstraction on top of WebSockets and XHR streaming to provide fastest
	 * possible connection for peers.
	 */
	function Socket(secure, host, port, path, key) {
	  if (!(this instanceof Socket)) return new Socket(secure, host, port, path, key);

	  EventEmitter.call(this);

	  // Disconnected manually.
	  this.disconnected = false;
	  this._queue = [];

	  var httpProtocol = secure ? 'https://' : 'http://';
	  var wsProtocol = secure ? 'wss://' : 'ws://';
	  this._httpUrl = httpProtocol + host + ':' + port + path + key;
	  this._wsUrl = wsProtocol + host + ':' + port + path + 'peerjs?key=' + key;
	}

	util.inherits(Socket, EventEmitter);

	/** Check in with ID or get one from server. */
	Socket.prototype.start = function (id, token) {
	  this.id = id;

	  this._httpUrl += '/' + id + '/' + token;
	  this._wsUrl += '&id=' + id + '&token=' + token;

	  //ma this._startXhrStream();
	  this._startWebSocket();
	};

	/** Start up websocket communications. */
	Socket.prototype._startWebSocket = function (id) {
	  var self = this;

	  if (this._socket) {
	    return;
	  }

	  this._socket = new WebSocket(this._wsUrl);

	  this._socket.onmessage = function (event) {
	    try {
	      var data = JSON.parse(event.data);
	    } catch (e) {
	      util.log('Invalid server message', event.data);
	      return;
	    }
	    self.emit('message', data);
	  };

	  this._socket.onclose = function (event) {
	    util.log('Socket closed.');
	    self.disconnected = true;
	    self.emit('disconnected');
	  };

	  // Take care of the queue of connections if necessary and make sure Peer knows
	  // socket is open.
	  this._socket.onopen = function () {
	    if (self._timeout) {
	      clearTimeout(self._timeout);
	      setTimeout(function () {
	        self._http.abort();
	        self._http = null;
	      }, 5000);
	    }
	    self._sendQueuedMessages();
	    util.log('Socket open');
	  };
	};

	/** Start XHR streaming. */
	Socket.prototype._startXhrStream = function (n) {
	  try {
	    var self = this;
	    this._http = new XMLHttpRequest();
	    this._http._index = 1;
	    this._http._streamIndex = n || 0;
	    this._http.open('post', this._httpUrl + '/id?i=' + this._http._streamIndex, true);
	    this._http.onerror = function () {
	      // If we get an error, likely something went wrong.
	      // Stop streaming.
	      clearTimeout(self._timeout);
	      self.emit('disconnected');
	    };
	    this._http.onreadystatechange = function () {
	      if (this.readyState == 2 && this.old) {
	        this.old.abort();
	        delete this.old;
	      } else if (this.readyState > 2 && this.status === 200 && this.responseText) {
	        self._handleStream(this);
	      }
	    };
	    this._http.send(null);
	    this._setHTTPTimeout();
	  } catch (e) {
	    util.log('XMLHttpRequest not available; defaulting to WebSockets');
	  }
	};

	/** Handles onreadystatechange response as a stream. */
	Socket.prototype._handleStream = function (http) {
	  // 3 and 4 are loading/done state. All others are not relevant.
	  var messages = http.responseText.split('\n');

	  // Check to see if anything needs to be processed on buffer.
	  if (http._buffer) {
	    while (http._buffer.length > 0) {
	      var index = http._buffer.shift();
	      var bufferedMessage = messages[index];
	      try {
	        bufferedMessage = JSON.parse(bufferedMessage);
	      } catch (e) {
	        http._buffer.shift(index);
	        break;
	      }
	      this.emit('message', bufferedMessage);
	    }
	  }

	  var message = messages[http._index];
	  if (message) {
	    http._index += 1;
	    // Buffering--this message is incomplete and we'll get to it next time.
	    // This checks if the httpResponse ended in a `\n`, in which case the last
	    // element of messages should be the empty string.
	    if (http._index === messages.length) {
	      if (!http._buffer) {
	        http._buffer = [];
	      }
	      http._buffer.push(http._index - 1);
	    } else {
	      try {
	        message = JSON.parse(message);
	      } catch (e) {
	        util.log('Invalid server message', message);
	        return;
	      }
	      this.emit('message', message);
	    }
	  }
	};

	Socket.prototype._setHTTPTimeout = function () {
	  var self = this;
	  this._timeout = setTimeout(function () {
	    var old = self._http;
	    if (!self._wsOpen()) {
	      self._startXhrStream(old._streamIndex + 1);
	      self._http.old = old;
	    } else {
	      old.abort();
	    }
	  }, 25000);
	};

	/** Is the websocket currently open? */
	Socket.prototype._wsOpen = function () {
	  return this._socket && this._socket.readyState == 1;
	};

	/** Send queued messages. */
	Socket.prototype._sendQueuedMessages = function () {
	  for (var i = 0, ii = this._queue.length; i < ii; i += 1) {
	    this.send(this._queue[i]);
	  }
	};

	/** Exposed send for DC & Peer. */
	Socket.prototype.send = function (data) {
	  if (this.disconnected) {
	    return;
	  }

	  // If we didn't get an ID yet, we can't yet send anything so we should queue
	  // up these messages.
	  if (!this.id) {
	    this._queue.push(data);
	    return;
	  }

	  if (!data.type) {
	    this.emit('error', 'Invalid message');
	    return;
	  }

	  var message = JSON.stringify(data);
	  if (this._wsOpen()) {
	    this._socket.send(message);
	  } else {
	    var http = new XMLHttpRequest();
	    var url = this._httpUrl + '/' + data.type.toLowerCase();
	    http.open('post', url, true);
	    http.setRequestHeader('Content-Type', 'application/json');
	    http.send(message);
	  }
	};

	Socket.prototype.close = function () {
	  if (!this.disconnected && this._wsOpen()) {
	    this._socket.close();
	    this.disconnected = true;
	  }
	};

	module.exports = Socket;
	//export default Socket;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(24);
	var EventEmitter = __webpack_require__(28);
	var Negotiator = __webpack_require__(31);

	/**
	 * Wraps the streaming interface between two Peers.
	 */
	function MediaConnection(peer, provider, options) {
	  if (!(this instanceof MediaConnection)) return new MediaConnection(peer, provider, options);
	  EventEmitter.call(this);

	  this.options = util.extend({}, options);

	  this.open = false;
	  this.type = 'media';
	  this.peer = peer;
	  this.provider = provider;
	  this.metadata = this.options.metadata;
	  this.localStream = this.options._stream;

	  this.id = this.options.connectionId || MediaConnection._idPrefix + util.randomToken();
	  if (this.localStream) {
	    Negotiator.startConnection(this, { _stream: this.localStream, originator: true });
	  }
	};

	util.inherits(MediaConnection, EventEmitter);

	MediaConnection._idPrefix = 'mc_';

	MediaConnection.prototype.addStream = function (remoteStream) {
	  util.log('Receiving stream', remoteStream);

	  this.remoteStream = remoteStream;
	  this.emit('stream', remoteStream); // Should we call this `open`?
	};

	MediaConnection.prototype.handleMessage = function (message) {
	  var payload = message.payload;

	  switch (message.type) {
	    case 'ANSWER':
	      // Forward to negotiator
	      Negotiator.handleSDP(message.type, this, payload.sdp);
	      this.open = true;
	      break;
	    case 'CANDIDATE':
	      Negotiator.handleCandidate(this, payload.candidate);
	      break;
	    default:
	      util.warn('Unrecognized message type:', message.type, 'from peer:', this.peer);
	      break;
	  }
	};

	MediaConnection.prototype.answer = function (stream) {
	  if (this.localStream) {
	    util.warn('Local stream already exists on this MediaConnection. Are you answering a call twice?');
	    return;
	  }

	  this.options._payload._stream = stream;

	  this.localStream = stream;
	  Negotiator.startConnection(this, this.options._payload);
	  // Retrieve lost messages stored because PeerConnection not set up.
	  var messages = this.provider._getMessages(this.id);
	  for (var i = 0, ii = messages.length; i < ii; i += 1) {
	    this.handleMessage(messages[i]);
	  }
	  this.open = true;
	};

	/**
	 * Exposed functionality for users.
	 */

	/** Allows user to close connection. */
	MediaConnection.prototype.close = function () {
	  if (!this.open) {
	    return;
	  }
	  this.open = false;
	  Negotiator.cleanup(this);
	  this.emit('close');
	};

	module.exports = MediaConnection;
	//export default MediaConnection;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(24);
	var RTCPeerConnection = __webpack_require__(27).RTCPeerConnection;
	var RTCSessionDescription = __webpack_require__(27).RTCSessionDescription;
	var RTCIceCandidate = __webpack_require__(27).RTCIceCandidate;

	/**
	 * Manages all negotiations between Peers.
	 */
	var Negotiator = {
	  pcs: {
	    data: {},
	    media: {}
	  }, // type => {peerId: {pc_id: pc}}.
	  //providers: {}, // provider's id => providers (there may be multiple providers/client.
	  queue: [] // connections that are delayed due to a PC being in use.
	};

	Negotiator._idPrefix = 'pc_';

	/** Returns a PeerConnection object set up correctly (for data, media). */
	Negotiator.startConnection = function (connection, options) {
	  var pc = Negotiator._getPeerConnection(connection, options);

	  if (connection.type === 'media' && options._stream) {
	    // Add the stream.
	    pc.addStream(options._stream);
	  }

	  // Set the connection's PC.
	  connection.pc = connection.peerConnection = pc;
	  // What do we need to do now?
	  if (options.originator) {
	    if (connection.type === 'data') {
	      // Create the datachannel.
	      var config = {};
	      // Dropping reliable:false support, since it seems to be crashing
	      // Chrome.
	      /*if (util.supports.sctp && !options.reliable) {
	        // If we have canonical reliable support...
	        config = {maxRetransmits: 0};
	      }*/
	      // Fallback to ensure older browsers don't crash.
	      if (!util.supports.sctp) {
	        config = { reliable: options.reliable };
	      }
	      var dc = pc.createDataChannel(connection.label, config);
	      connection.initialize(dc);
	    }

	    if (!util.supports.onnegotiationneeded) {
	      Negotiator._makeOffer(connection);
	    }
	  } else {
	    Negotiator.handleSDP('OFFER', connection, options.sdp);
	  }
	};

	Negotiator._getPeerConnection = function (connection, options) {
	  if (!Negotiator.pcs[connection.type]) {
	    util.error(connection.type + ' is not a valid connection type. Maybe you overrode the `type` property somewhere.');
	  }

	  if (!Negotiator.pcs[connection.type][connection.peer]) {
	    Negotiator.pcs[connection.type][connection.peer] = {};
	  }
	  var peerConnections = Negotiator.pcs[connection.type][connection.peer];

	  var pc;
	  // Not multiplexing while FF and Chrome have not-great support for it.
	  /*if (options.multiplex) {
	    ids = Object.keys(peerConnections);
	    for (var i = 0, ii = ids.length; i < ii; i += 1) {
	      pc = peerConnections[ids[i]];
	      if (pc.signalingState === 'stable') {
	        break; // We can go ahead and use this PC.
	      }
	    }
	  } else */
	  if (options.pc) {
	    // Simplest case: PC id already provided for us.
	    pc = Negotiator.pcs[connection.type][connection.peer][options.pc];
	  }

	  if (!pc || pc.signalingState !== 'stable') {
	    pc = Negotiator._startPeerConnection(connection);
	  }
	  return pc;
	};

	/*
	Negotiator._addProvider = function(provider) {
	  if ((!provider.id && !provider.disconnected) || !provider.socket.open) {
	    // Wait for provider to obtain an ID.
	    provider.on('open', function(id) {
	      Negotiator._addProvider(provider);
	    });
	  } else {
	    Negotiator.providers[provider.id] = provider;
	  }
	}*/

	/** Start a PC. */
	Negotiator._startPeerConnection = function (connection) {
	  util.log('Creating RTCPeerConnection.');

	  var id = Negotiator._idPrefix + util.randomToken();
	  var optional = {};

	  if (connection.type === 'data' && !util.supports.sctp) {
	    optional = { optional: [{ RtpDataChannels: true }] };
	  } else if (connection.type === 'media') {
	    // Interop req for chrome.
	    optional = { optional: [{ DtlsSrtpKeyAgreement: true }] };
	  }

	  var pc = new RTCPeerConnection(connection.provider.options.config, optional);
	  Negotiator.pcs[connection.type][connection.peer][id] = pc;

	  Negotiator._setupListeners(connection, pc, id);

	  return pc;
	};

	/** Set up various WebRTC listeners. */
	Negotiator._setupListeners = function (connection, pc, pc_id) {
	  var peerId = connection.peer;
	  var connectionId = connection.id;
	  var provider = connection.provider;

	  // ICE CANDIDATES.
	  util.log('Listening for ICE candidates.');
	  pc.onicecandidate = function (evt) {
	    if (evt.candidate) {
	      util.log('Received ICE candidates for:', connection.peer);
	      provider.socket.send({
	        type: 'CANDIDATE',
	        payload: {
	          candidate: evt.candidate,
	          type: connection.type,
	          connectionId: connection.id
	        },
	        dst: peerId
	      });
	    }
	  };

	  pc.oniceconnectionstatechange = function () {
	    switch (pc.iceConnectionState) {
	      case 'disconnected':
	      case 'failed':
	      case 'closed':
	        //ma
	        util.log('iceConnectionState is disconnected, closing connections to ' + peerId);
	        connection.close();
	        break;
	      case 'completed':
	        pc.onicecandidate = util.noop;
	        break;
	    }
	  };

	  // Fallback for older Chrome impls.
	  pc.onicechange = pc.oniceconnectionstatechange;

	  // ONNEGOTIATIONNEEDED (Chrome)
	  util.log('Listening for `negotiationneeded`');
	  pc.onnegotiationneeded = function () {
	    util.log('`negotiationneeded` triggered');
	    if (pc.signalingState == 'stable') {
	      Negotiator._makeOffer(connection);
	    } else {
	      util.log('onnegotiationneeded triggered when not stable. Is another connection being established?');
	    }
	  };

	  // DATACONNECTION.
	  util.log('Listening for data channel');
	  // Fired between offer and answer, so options should already be saved
	  // in the options hash.
	  pc.ondatachannel = function (evt) {
	    util.log('Received data channel');
	    var dc = evt.channel;
	    var connection = provider.getConnection(peerId, connectionId);
	    connection.initialize(dc);
	  };

	  // MEDIACONNECTION.
	  util.log('Listening for remote stream');
	  pc.onaddstream = function (evt) {
	    util.log('Received remote stream');
	    var stream = evt.stream;
	    var connection = provider.getConnection(peerId, connectionId);
	    // 10/10/2014: looks like in Chrome 38, onaddstream is triggered after
	    // setting the remote description. Our connection object in these cases
	    // is actually a DATA connection, so addStream fails.
	    // TODO: This is hopefully just a temporary fix. We should try to
	    // understand why this is happening.
	    if (connection.type === 'media') {
	      connection.addStream(stream);
	    }
	  };
	};

	Negotiator.cleanup = function (connection) {
	  util.log('Cleaning up PeerConnection to ' + connection.peer);

	  var pc = connection.pc;

	  if (!!pc && (pc.readyState !== 'closed' || pc.signalingState !== 'closed')) {
	    pc.close();
	    connection.pc = null;
	  }
	};

	Negotiator._makeOffer = function (connection) {
	  var pc = connection.pc;
	  pc.createOffer(function (offer) {
	    util.log('Created offer.');

	    if (!util.supports.sctp && connection.type === 'data' && connection.reliable) {
	      offer.sdp = Reliable.higherBandwidthSDP(offer.sdp);
	    }

	    pc.setLocalDescription(offer, function () {
	      util.log('Set localDescription: offer', 'for:', connection.peer);
	      connection.provider.socket.send({
	        type: 'OFFER',
	        payload: {
	          sdp: offer,
	          type: connection.type,
	          label: connection.label,
	          connectionId: connection.id,
	          reliable: connection.reliable,
	          serialization: connection.serialization,
	          metadata: connection.metadata,
	          browser: util.browser
	        },
	        dst: connection.peer
	      });
	    }, function (err) {
	      connection.provider.emitError('webrtc', err);
	      util.log('Failed to setLocalDescription, ', err);
	    });
	  }, function (err) {
	    connection.provider.emitError('webrtc', err);
	    util.log('Failed to createOffer, ', err);
	  }, connection.options.constraints);
	};

	Negotiator._makeAnswer = function (connection) {
	  var pc = connection.pc;

	  pc.createAnswer(function (answer) {
	    util.log('Created answer.');

	    if (!util.supports.sctp && connection.type === 'data' && connection.reliable) {
	      answer.sdp = Reliable.higherBandwidthSDP(answer.sdp);
	    }

	    pc.setLocalDescription(answer, function () {
	      util.log('Set localDescription: answer', 'for:', connection.peer);
	      connection.provider.socket.send({
	        type: 'ANSWER',
	        payload: {
	          sdp: answer,
	          type: connection.type,
	          connectionId: connection.id,
	          browser: util.browser
	        },
	        dst: connection.peer
	      });
	    }, function (err) {
	      connection.provider.emitError('webrtc', err);
	      util.log('Failed to setLocalDescription, ', err);
	    });
	  }, function (err) {
	    connection.provider.emitError('webrtc', err);
	    util.log('Failed to create answer, ', err);
	  });
	};

	/** Handle an SDP. */
	Negotiator.handleSDP = function (type, connection, sdp) {
	  sdp = new RTCSessionDescription(sdp);
	  var pc = connection.pc;

	  util.log('Setting remote description', sdp);
	  pc.setRemoteDescription(sdp, function () {
	    util.log('Set remoteDescription:', type, 'for:', connection.peer);

	    if (type === 'OFFER') {
	      Negotiator._makeAnswer(connection);
	    }
	  }, function (err) {
	    connection.provider.emitError('webrtc', err);
	    util.log('Failed to setRemoteDescription, ', err);
	  });
	};

	/** Handle a candidate. */
	Negotiator.handleCandidate = function (connection, ice) {
	  var candidate = ice.candidate;
	  var sdpMLineIndex = ice.sdpMLineIndex;
	  connection.pc.addIceCandidate(new RTCIceCandidate({
	    sdpMLineIndex: sdpMLineIndex,
	    candidate: candidate
	  }));
	  util.log('Added ICE candidate for:', connection.peer);
	};

	module.exports = Negotiator;
	//export default Negotiator;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(24);
	var EventEmitter = __webpack_require__(28);
	var Negotiator = __webpack_require__(31);
	var Reliable = __webpack_require__(33);

	/**
	 * Wraps a DataChannel between two Peers.
	 */
	function DataConnection(peer, provider, options) {
	  if (!(this instanceof DataConnection)) return new DataConnection(peer, provider, options);
	  EventEmitter.call(this);

	  this.options = util.extend({
	    serialization: 'binary',
	    reliable: false
	  }, options);

	  // Connection is not open yet.
	  this.open = false;
	  this.type = 'data';
	  this.peer = peer;
	  this.provider = provider;

	  this.id = this.options.connectionId || DataConnection._idPrefix + util.randomToken();

	  this.label = this.options.label || this.id;
	  this.metadata = this.options.metadata;
	  this.serialization = this.options.serialization;
	  this.reliable = this.options.reliable;

	  // Data channel buffering.
	  this._buffer = [];
	  this._buffering = false;
	  this.bufferSize = 0;

	  // For storing large data.
	  this._chunkedData = {};

	  if (this.options._payload) {
	    this._peerBrowser = this.options._payload.browser;
	  }

	  Negotiator.startConnection(this, this.options._payload || {
	    originator: true
	  });
	}

	util.inherits(DataConnection, EventEmitter);

	DataConnection._idPrefix = 'dc_';

	/** Called by the Negotiator when the DataChannel is ready. */
	DataConnection.prototype.initialize = function (dc) {
	  this._dc = this.dataChannel = dc;
	  this._configureDataChannel();
	};

	DataConnection.prototype._configureDataChannel = function () {
	  var self = this;
	  if (util.supports.sctp) {
	    this._dc.binaryType = 'arraybuffer';
	  }
	  this._dc.onopen = function () {
	    util.log('Data channel connection success');
	    self.open = true;
	    self.emit('open');
	  };

	  // Use the Reliable shim for non Firefox browsers
	  if (!util.supports.sctp && this.reliable) {
	    this._reliable = new Reliable(this._dc, util.debug);
	  }

	  if (this._reliable) {
	    this._reliable.onmessage = function (msg) {
	      self.emit('data', msg);
	    };
	  } else {
	    this._dc.onmessage = function (e) {
	      self._handleDataMessage(e);
	    };
	  }
	  this._dc.onclose = function (e) {
	    util.log('DataChannel closed for:', self.peer);
	    self.close();
	  };
	};

	// Handles a DataChannel message.
	DataConnection.prototype._handleDataMessage = function (e) {
	  var self = this;
	  var data = e.data;
	  var datatype = data.constructor;
	  if (this.serialization === 'binary' || this.serialization === 'binary-utf8') {
	    if (datatype === Blob) {
	      // Datatype should never be blob
	      util.blobToArrayBuffer(data, function (ab) {
	        data = util.unpack(ab);
	        self.emit('data', data);
	      });
	      return;
	    } else if (datatype === ArrayBuffer) {
	      data = util.unpack(data);
	    } else if (datatype === String) {
	      // String fallback for binary data for browsers that don't support binary yet
	      var ab = util.binaryStringToArrayBuffer(data);
	      data = util.unpack(ab);
	    }
	  } else if (this.serialization === 'json') {
	    data = JSON.parse(data);
	  }

	  // Check if we've chunked--if so, piece things back together.
	  // We're guaranteed that this isn't 0.
	  if (data.__peerData) {
	    var id = data.__peerData;
	    var chunkInfo = this._chunkedData[id] || { data: [], count: 0, total: data.total };

	    chunkInfo.data[data.n] = data.data;
	    chunkInfo.count += 1;

	    if (chunkInfo.total === chunkInfo.count) {
	      // Clean up before making the recursive call to `_handleDataMessage`.
	      delete this._chunkedData[id];

	      // We've received all the chunks--time to construct the complete data.
	      data = new Blob(chunkInfo.data);
	      this._handleDataMessage({ data: data });
	    }

	    this._chunkedData[id] = chunkInfo;
	    return;
	  }

	  this.emit('data', data);
	};

	/**
	 * Exposed functionality for users.
	 */

	/** Allows user to close connection. */
	DataConnection.prototype.close = function () {
	  if (!this.open) {
	    return;
	  }
	  this.open = false;
	  Negotiator.cleanup(this);
	  this.emit('close');
	};

	/** Allows user to send data. */
	DataConnection.prototype.send = function (data, chunked) {
	  if (!this.open) {
	    this.emit('error', new Error('Connection is not open. You should listen for the `open` event before sending messages.'));
	    return;
	  }
	  if (this._reliable) {
	    // Note: reliable shim sending will make it so that you cannot customize
	    // serialization.
	    this._reliable.send(data);
	    return;
	  }
	  var self = this;
	  if (this.serialization === 'json') {
	    this._bufferedSend(JSON.stringify(data));
	  } else if (this.serialization === 'binary' || this.serialization === 'binary-utf8') {
	    var blob = util.pack(data);

	    // For Chrome-Firefox interoperability, we need to make Firefox "chunk"
	    // the data it sends out.
	    var needsChunking = util.chunkedBrowsers[this._peerBrowser] || util.chunkedBrowsers[util.browser];
	    if (needsChunking && !chunked && blob.size > util.chunkedMTU) {
	      this._sendChunks(blob);
	      return;
	    }

	    // DataChannel currently only supports strings.
	    if (!util.supports.sctp) {
	      util.blobToBinaryString(blob, function (str) {
	        self._bufferedSend(str);
	      });
	    } else if (!util.supports.binaryBlob) {
	      // We only do this if we really need to (e.g. blobs are not supported),
	      // because this conversion is costly.
	      util.blobToArrayBuffer(blob, function (ab) {
	        self._bufferedSend(ab);
	      });
	    } else {
	      this._bufferedSend(blob);
	    }
	  } else {
	    this._bufferedSend(data);
	  }
	};

	DataConnection.prototype._bufferedSend = function (msg) {
	  if (this._buffering || !this._trySend(msg)) {
	    this._buffer.push(msg);
	    this.bufferSize = this._buffer.length;
	  }
	};

	// Returns true if the send succeeds.
	DataConnection.prototype._trySend = function (msg) {
	  try {
	    this._dc.send(msg);
	  } catch (e) {
	    this._buffering = true;

	    var self = this;
	    setTimeout(function () {
	      // Try again.
	      self._buffering = false;
	      self._tryBuffer();
	    }, 100);
	    return false;
	  }
	  return true;
	};

	// Try to send the first message in the buffer.
	DataConnection.prototype._tryBuffer = function () {
	  if (this._buffer.length === 0) {
	    return;
	  }

	  var msg = this._buffer[0];

	  if (this._trySend(msg)) {
	    this._buffer.shift();
	    this.bufferSize = this._buffer.length;
	    this._tryBuffer();
	  }
	};

	DataConnection.prototype._sendChunks = function (blob) {
	  var blobs = util.chunk(blob);
	  for (var i = 0, ii = blobs.length; i < ii; i += 1) {
	    var blob = blobs[i];
	    this.send(blob, true);
	  }
	};

	DataConnection.prototype.handleMessage = function (message) {
	  var payload = message.payload;

	  switch (message.type) {
	    case 'ANSWER':
	      this._peerBrowser = payload.browser;

	      // Forward to negotiator
	      Negotiator.handleSDP(message.type, this, payload.sdp);
	      break;
	    case 'CANDIDATE':
	      Negotiator.handleCandidate(this, payload.candidate);
	      break;
	    default:
	      util.warn('Unrecognized message type:', message.type, 'from peer:', this.peer);
	      break;
	  }
	};

	module.exports = DataConnection;
	//export default DataConnection

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(24);

	/**
	 * Reliable transfer for Chrome Canary DataChannel impl.
	 * Author: @michellebu
	 */
	function Reliable(dc, debug) {
	  if (!(this instanceof Reliable)) return new Reliable(dc);
	  this._dc = dc;

	  util.debug = debug;

	  // Messages sent/received so far.
	  // id: { ack: n, chunks: [...] }
	  this._outgoing = {};
	  // id: { ack: ['ack', id, n], chunks: [...] }
	  this._incoming = {};
	  this._received = {};

	  // Window size.
	  this._window = 1000;
	  // MTU.
	  this._mtu = 500;
	  // Interval for setInterval. In ms.
	  this._interval = 0;

	  // Messages sent.
	  this._count = 0;

	  // Outgoing message queue.
	  this._queue = [];

	  this._setupDC();
	};

	// Send a message reliably.
	Reliable.prototype.send = function (msg) {
	  // Determine if chunking is necessary.
	  var bl = util.pack(msg);
	  if (bl.size < this._mtu) {
	    this._handleSend(['no', bl]);
	    return;
	  }

	  this._outgoing[this._count] = {
	    ack: 0,
	    chunks: this._chunk(bl)
	  };

	  if (util.debug) {
	    this._outgoing[this._count].timer = new Date();
	  }

	  // Send prelim window.
	  this._sendWindowedChunks(this._count);
	  this._count += 1;
	};

	// Set up interval for processing queue.
	Reliable.prototype._setupInterval = function () {
	  // TODO: fail gracefully.

	  var self = this;
	  this._timeout = setInterval(function () {
	    // FIXME: String stuff makes things terribly async.
	    var msg = self._queue.shift();
	    if (msg._multiple) {
	      for (var i = 0, ii = msg.length; i < ii; i += 1) {
	        self._intervalSend(msg[i]);
	      }
	    } else {
	      self._intervalSend(msg);
	    }
	  }, this._interval);
	};

	Reliable.prototype._intervalSend = function (msg) {
	  var self = this;
	  msg = util.pack(msg);
	  util.blobToBinaryString(msg, function (str) {
	    self._dc.send(str);
	  });
	  if (self._queue.length === 0) {
	    clearTimeout(self._timeout);
	    self._timeout = null;
	    //self._processAcks();
	  }
	};

	// Go through ACKs to send missing pieces.
	Reliable.prototype._processAcks = function () {
	  for (var id in this._outgoing) {
	    if (this._outgoing.hasOwnProperty(id)) {
	      this._sendWindowedChunks(id);
	    }
	  }
	};

	// Handle sending a message.
	// FIXME: Don't wait for interval time for all messages...
	Reliable.prototype._handleSend = function (msg) {
	  var push = true;
	  for (var i = 0, ii = this._queue.length; i < ii; i += 1) {
	    var item = this._queue[i];
	    if (item === msg) {
	      push = false;
	    } else if (item._multiple && item.indexOf(msg) !== -1) {
	      push = false;
	    }
	  }
	  if (push) {
	    this._queue.push(msg);
	    if (!this._timeout) {
	      this._setupInterval();
	    }
	  }
	};

	// Set up DataChannel handlers.
	Reliable.prototype._setupDC = function () {
	  // Handle various message types.
	  var self = this;
	  this._dc.onmessage = function (e) {
	    var msg = e.data;
	    var datatype = msg.constructor;
	    // FIXME: msg is String until binary is supported.
	    // Once that happens, this will have to be smarter.
	    if (datatype === String) {
	      var ab = util.binaryStringToArrayBuffer(msg);
	      msg = util.unpack(ab);
	      self._handleMessage(msg);
	    }
	  };
	};

	// Handles an incoming message.
	Reliable.prototype._handleMessage = function (msg) {
	  var id = msg[1];
	  var idata = this._incoming[id];
	  var odata = this._outgoing[id];
	  var data;
	  switch (msg[0]) {
	    // No chunking was done.
	    case 'no':
	      var message = id;
	      if (!!message) {
	        this.onmessage(util.unpack(message));
	      }
	      break;
	    // Reached the end of the message.
	    case 'end':
	      data = idata;

	      // In case end comes first.
	      this._received[id] = msg[2];

	      if (!data) {
	        break;
	      }

	      this._ack(id);
	      break;
	    case 'ack':
	      data = odata;
	      if (!!data) {
	        var ack = msg[2];
	        // Take the larger ACK, for out of order messages.
	        data.ack = Math.max(ack, data.ack);

	        // Clean up when all chunks are ACKed.
	        if (data.ack >= data.chunks.length) {
	          util.log('Time: ', new Date() - data.timer);
	          delete this._outgoing[id];
	        } else {
	          this._processAcks();
	        }
	      }
	      // If !data, just ignore.
	      break;
	    // Received a chunk of data.
	    case 'chunk':
	      // Create a new entry if none exists.
	      data = idata;
	      if (!data) {
	        var end = this._received[id];
	        if (end === true) {
	          break;
	        }
	        data = {
	          ack: ['ack', id, 0],
	          chunks: []
	        };
	        this._incoming[id] = data;
	      }

	      var n = msg[2];
	      var chunk = msg[3];
	      data.chunks[n] = new Uint8Array(chunk);

	      // If we get the chunk we're looking for, ACK for next missing.
	      // Otherwise, ACK the same N again.
	      if (n === data.ack[2]) {
	        this._calculateNextAck(id);
	      }
	      this._ack(id);
	      break;
	    default:
	      // Shouldn't happen, but would make sense for message to just go
	      // through as is.
	      this._handleSend(msg);
	      break;
	  }
	};

	// Chunks BL into smaller messages.
	Reliable.prototype._chunk = function (bl) {
	  var chunks = [];
	  var size = bl.size;
	  var start = 0;
	  while (start < size) {
	    var end = Math.min(size, start + this._mtu);
	    var b = bl.slice(start, end);
	    var chunk = {
	      payload: b
	    };
	    chunks.push(chunk);
	    start = end;
	  }
	  util.log('Created', chunks.length, 'chunks.');
	  return chunks;
	};

	// Sends ACK N, expecting Nth blob chunk for message ID.
	Reliable.prototype._ack = function (id) {
	  var ack = this._incoming[id].ack;

	  // if ack is the end value, then call _complete.
	  if (this._received[id] === ack[2]) {
	    this._complete(id);
	    this._received[id] = true;
	  }

	  this._handleSend(ack);
	};

	// Calculates the next ACK number, given chunks.
	Reliable.prototype._calculateNextAck = function (id) {
	  var data = this._incoming[id];
	  var chunks = data.chunks;
	  for (var i = 0, ii = chunks.length; i < ii; i += 1) {
	    // This chunk is missing!!! Better ACK for it.
	    if (chunks[i] === undefined) {
	      data.ack[2] = i;
	      return;
	    }
	  }
	  data.ack[2] = chunks.length;
	};

	// Sends the next window of chunks.
	Reliable.prototype._sendWindowedChunks = function (id) {
	  util.log('sendWindowedChunks for: ', id);
	  var data = this._outgoing[id];
	  var ch = data.chunks;
	  var chunks = [];
	  var limit = Math.min(data.ack + this._window, ch.length);
	  for (var i = data.ack; i < limit; i += 1) {
	    if (!ch[i].sent || i === data.ack) {
	      ch[i].sent = true;
	      chunks.push(['chunk', id, i, ch[i].payload]);
	    }
	  }
	  if (data.ack + this._window >= ch.length) {
	    chunks.push(['end', id, ch.length]);
	  }
	  chunks._multiple = true;
	  this._handleSend(chunks);
	};

	// Puts together a message from chunks.
	Reliable.prototype._complete = function (id) {
	  util.log('Completed called for', id);
	  var self = this;
	  var chunks = this._incoming[id].chunks;
	  var bl = new Blob(chunks);
	  util.blobToArrayBuffer(bl, function (ab) {
	    self.onmessage(util.unpack(ab));
	  });
	  delete this._incoming[id];
	};

	// Ups bandwidth limit on SDP. Meant to be called during offer/answer.
	Reliable.higherBandwidthSDP = function (sdp) {
	  // AS stands for Application-Specific Maximum.
	  // Bandwidth number is in kilobits / sec.
	  // See RFC for more info: http://www.ietf.org/rfc/rfc2327.txt

	  // Chrome 31+ doesn't want us munging the SDP, so we'll let them have their
	  // way.
	  var version = navigator.appVersion.match(/Chrome\/(.*?) /);
	  if (version) {
	    version = parseInt(version[1].split('.').shift());
	    if (version < 31) {
	      var parts = sdp.split('b=AS:30');
	      var replace = 'b=AS:102400'; // 100 Mbps
	      if (parts.length > 1) {
	        return parts[0] + replace + parts[1];
	      }
	    }
	  }

	  return sdp;
	};

	// Overwritten, typically.
	Reliable.prototype.onmessage = function (msg) {};

	module.exports.Reliable = Reliable;
	//export default Reliable;

/***/ },
/* 34 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function ($document) {
	  var audioElement = $document[0].getElementById('audio');
	  if (audioElement) {
	    audioElement.autoPlay = true; // as per your requirement
	  }

	  return {
	    audioElement: audioElement,

	    play: function play(filename) {
	      audioElement.src = filename;
	      audioElement.play();
	    },
	    playStream: function playStream(stream) {
	      var src = (URL || webkitURL || mozURL).createObjectURL(stream);
	      this.play(src);
	    },
	    resume: function resume() {
	      audioElement.play();
	    },
	    pause: function pause() {
	      audioElement.pause();
	    },
	    stop: function stop() {
	      audioElement.pause();
	      audioElement.src = audioElement.currentSrc; /** http://stackoverflow.com/a/16978083/1015046 **/
	    },
	    incVol: function incVol() {
	      if (audioElement.volume < 1) {
	        audioElement.volume = (audioElement.volume + 0.1).toFixed(2);
	      }
	      return audioElement.volume;
	    },
	    decVol: function decVol() {
	      if (audioElement.volume > 0) {
	        audioElement.volume = (audioElement.volume - 0.1).toFixed(2);
	      }
	      return audioElement.volume;
	    },
	    timer: function timer(callback) {
	      audioElement.ontimeupdate = function () {
	        callback(audioElement.duration, audioElement.currentTime);
	      };
	    }
	  };
	};

	;

/***/ },
/* 35 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function ($location, constant) {
	    var host = 'localhost'; // $location.host();
	    var port = 9000; //$location.port();

	    return {
	        getHost: function getHost() {
	            return host;
	        },
	        getPort: function getPort() {
	            return port;
	        },
	        getLinkToShare: function getLinkToShare(user) {
	            if (user && user.sharedToken) {
	                return constant.URL_TO_SHARE({ host: host, port: port, refer: user.id, sharedToken: user.sharedToken });
	            } else {
	                return '';
	            }
	        }
	    };
	};

	;

/***/ },
/* 36 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ContactService = function () {
	    function ContactService(ContactsServiceRest, EventBus) {
	        _classCallCheck(this, ContactService);

	        this.ContactsServiceRest = ContactsServiceRest;
	        this.EventBus = EventBus;
	    }

	    _createClass(ContactService, [{
	        key: "getAllContacts",
	        value: function getAllContacts() {
	            var _this = this;

	            return this.ContactsServiceRest.getAllContacts().then(function (response) {
	                _this.EventBus.emit(_this.EventBus.chats.LOAD_ALL, response.data); //todo: redo
	            });
	        }
	    }, {
	        key: "findContacts",
	        value: function findContacts(text) {
	            var _this2 = this;

	            return this.ContactsServiceRest.findContacts(text).then(function (response) {
	                _this2.EventBus.emit(_this2.EventBus.contacts.LOAD, response.data);
	            });
	        }
	    }, {
	        key: "addContactAndSendInvitation",
	        value: function addContactAndSendInvitation(contact, invitation) {
	            var _this3 = this;

	            return this.ContactsServiceRest.inviteContact(contact._id, invitation).then(function (response) {
	                _this3.EventBus.emit(_this3.EventBus.chats.LOAD_ALL, response.data);
	            });
	        }
	    }]);

	    return ContactService;
	}();

	exports.default = ContactService;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _loginController = __webpack_require__(38);

	var _loginController2 = _interopRequireDefault(_loginController);

	var _loginGuestController = __webpack_require__(39);

	var _loginGuestController2 = _interopRequireDefault(_loginGuestController);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	angular.module('bconfApp.account', []).config(["$stateProvider", function ($stateProvider) {
	    $stateProvider.state('login', {
	        templateUrl: 'web/account/login/login.html',
	        controller: 'LoginController',
	        controllerAs: 'vm'
	    }).state('loginGuest', {
	        templateUrl: 'web/account/loginGuest/loginGuest.html',
	        controller: 'LoginGuestController',
	        controllerAs: 'vm'
	    }).state('logout', {
	        url: '/logout?referrer',
	        referrer: 'main',
	        template: '',
	        controller: ["$state", "Auth", function controller($state, Auth) {
	            var referrer = $state.params.referrer || $state.current.referrer || 'main';
	            Auth.logout();
	            $state.go(referrer);
	        }]
	    });
	}]).controller('LoginController', _loginController2.default).controller('LoginGuestController', _loginGuestController2.default).run(["$rootScope", function ($rootScope) {
	    $rootScope.$on('$stateChangeStart', function (event, next, nextParams, current) {
	        if (next.name === 'logout' && current && current.name && !current.authenticate) {
	            next.referrer = current.name;
	        }
	    });
	}]);

/***/ },
/* 38 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LoginController = function () {
	    function LoginController(Auth, $state) {
	        _classCallCheck(this, LoginController);

	        this.Auth = Auth;
	        this.$state = $state;
	        this.user = {};
	        this.errors = null;
	        this.submitted = false;
	        this.type = 'login';

	        this.facebookLink = '/facebook';
	        this.twitterLink = '/twitter';
	        this.googleLink = '/google';
	        this.yandexLink = '/yandex';
	    }

	    _createClass(LoginController, [{
	        key: 'login',
	        value: function login(form) {
	            var _this = this;

	            console.log('login');
	            this.submitted = true;
	            this.errors = null;

	            if (form.$valid) {
	                this.Auth.login({
	                    email: this.user.email,
	                    password: this.user.password
	                }).then(function () {
	                    // Logged in, redirect to home
	                    _this.$state.go('redirect');
	                }).catch(function (err) {
	                    _this.errors = err.data.message;
	                });
	            }
	        }
	    }, {
	        key: 'register',
	        value: function register(form) {
	            var _this2 = this;

	            this.submitted = true;
	            this.errors = null;
	            console.log('register');

	            if (form.$valid) {
	                this.Auth.createUser({
	                    name: this.user.name,
	                    email: this.user.email,
	                    password: this.user.password
	                }).then(function () {
	                    _this2.$state.go('redirect');
	                }).catch(function (err) {
	                    err = err.data;
	                    _this2.errors = {};

	                    // Update validity of form fields that match the mongoose errors
	                    angular.forEach(err.errors, function (error, field) {
	                        form[field].$setValidity('mongoose', false);
	                        _this2.errors[field] = error.message;
	                    });
	                });
	            }
	        }
	    }, {
	        key: 'resetPassword',
	        value: function resetPassword(form) {
	            this.errors = null;
	            alert('not implemented');
	        }
	    }, {
	        key: 'setViewType',
	        value: function setViewType(type) {
	            this.errors = null;
	            this.type = type;
	        }
	    }, {
	        key: 'isViewType',
	        value: function isViewType(type) {
	            return this.type === type;
	        }
	    }, {
	        key: 'onClose',
	        value: function onClose() {
	            this.Auth.logout();
	            this.$state.go('main');
	        }
	    }]);

	    return LoginController;
	}();

	exports.default = LoginController;

/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LoginGuestController = function () {
	    function LoginGuestController(Auth, $state) {
	        _classCallCheck(this, LoginGuestController);

	        this.Auth = Auth;
	        this.$state = $state;
	        this.capture = '12';
	        this.errors = null;
	        this.submitted = false;
	    }

	    _createClass(LoginGuestController, [{
	        key: 'login',
	        value: function login(form) {
	            var _this = this;

	            console.log('loginGuest');
	            this.submitted = true;
	            this.errors = null;

	            if (form.$valid) {
	                this.Auth.loginGuest({
	                    capture: this.capture
	                }).then(function () {
	                    // Logged in, redirect to home
	                    _this.$state.go('redirect');
	                }).catch(function (err) {
	                    _this.errors = err.data.message;
	                });
	            }
	        }
	    }, {
	        key: 'onClose',
	        value: function onClose() {
	            this.Auth.logout();
	            this.$state.go('main');
	        }
	    }]);

	    return LoginGuestController;
	}();

	exports.default = LoginGuestController;

/***/ },
/* 40 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MainController = function () {
	  function MainController($state) {
	    _classCallCheck(this, MainController);

	    this.$state = $state;
	  }

	  _createClass(MainController, [{
	    key: 'onLogin',
	    value: function onLogin() {
	      this.$state.go('login');
	    }
	  }, {
	    key: 'onLoginGuest',
	    value: function onLoginGuest() {
	      this.$state.go('loginGuest');
	    }
	  }]);

	  return MainController;
	}();

	exports.default = MainController;

/***/ },
/* 41 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function () {
	  return {
	    templateUrl: 'web/oauth-buttons/oauth-buttons.html',
	    restrict: 'EA',
	    controller: function controller($window) {
	      this.loginOauth = function (provider) {
	        $window.location.href = '/auth/' + provider;
	      };
	    },
	    controllerAs: 'OauthButtons',
	    scope: {
	      classes: '@'
	    }
	  };
	};

	;

/***/ },
/* 42 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function ($scope, constant, ChatModel) {

	  switch ($scope.callInfo.state) {
	    case constant.CALL_STATE.DIALLING:
	      //play tone
	      break;
	    case constant.CALL_STATE.INCOMING:
	      //play alert
	      break;
	    default:
	      console.log('some error');
	  }

	  $scope.handUp = function () {
	    ChatModel.hangUp();
	    $scope.closeCall();
	  };

	  $scope.answerCall = function () {
	    ChatModel.answerCall($scope.callInfo.incomingCall);
	    $scope.connectedCall();
	  };

	  $scope.isIncoming = function () {
	    return $scope.callInfo.state == constant.CALL_STATE.INCOMING;
	  };
	  $scope.isDialing = function () {
	    return $scope.callInfo.state == constant.CALL_STATE.DIALLING;
	  };
	  $scope.isConnected = function () {
	    return $scope.callInfo.state == constant.CALL_STATE.CONNECTED;
	  };
	};

	;

/***/ },
/* 43 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ChatController = function () {
	    function ChatController(Auth, ProfileStore, $scope, $state) {
	        var _this = this;

	        _classCallCheck(this, ChatController);

	        this.Auth = Auth;
	        this.$state = $state;
	        this.user = ProfileStore.getProfile();
	        ProfileStore.subscribe($scope, function () {
	            _this.user = ProfileStore.getProfile();
	        });
	    }

	    _createClass(ChatController, [{
	        key: 'onLogout',
	        value: function onLogout() {
	            this.Auth.logout();
	            this.$state.go('main');
	        }
	    }, {
	        key: 'openMenu',
	        value: function openMenu($mdOpenMenu, ev) {
	            $mdOpenMenu(ev);
	        }
	    }]);

	    return ChatController;
	}();

	exports.default = ChatController;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = function () {
	    return {
	        restrict: 'EA',
	        controllerAs: 'vm',
	        controller: RosterController,
	        templateUrl: 'web/chat/roster/roster.html',
	        scope: {},
	        bindToController: true
	    };
	};

	var _contactForm = __webpack_require__(45);

	var _contactForm2 = _interopRequireDefault(_contactForm);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	;

	var RosterController = function () {
	    function RosterController(ChatsStore, $scope, EventBus, ContactService, $mdDialog) {
	        var _this = this;

	        _classCallCheck(this, RosterController);

	        this.EventBus = EventBus;
	        this.ContactService = ContactService;
	        this.$mdDialog = $mdDialog;
	        ChatsStore.subscribeAndInit($scope, function () {
	            _this.chats = ChatsStore.getAllChat();
	            _this.currentChatIndex = ChatsStore.getCurrentChatIndex();
	        });

	        this.ContactService.getAllContacts();
	    }

	    _createClass(RosterController, [{
	        key: 'onSelect',
	        value: function onSelect(index) {
	            console.log(index);
	            this.EventBus.emit(this.EventBus.chats.SELECT_CHAT, index);
	            //ChatModel.selectChat(key);
	            //$scope.session = {
	            //    id: key,
	            //    user: ContactsModel.getContact(key),
	            //    chat: ChatModel.getActiveChat()
	            //};
	            //
	            //angular.forEach($scope.chat.list, function (value, k) {
	            //    if (key != k) value.menuActive = false;
	            //});
	            //$scope.chat.list[key].menuActive = true;
	        }
	    }, {
	        key: 'onContact',
	        value: function onContact(index) {
	            console.log(index);
	            //var contacts = _.reduce($scope.contacts.list, function (o, c) {
	            //    if (c.status == 'online') {
	            //        o.push(c);
	            //    }
	            //    return o;
	            //}, []);
	            //var contact = contacts[index];
	            //if (contact.status == 'online') {
	            //    ChatModel.startChat(contact.id);
	            //    $scope.onSelectChat(contact.id);
	            //}
	        }
	    }, {
	        key: 'onAddContact',
	        value: function onAddContact() {
	            this.$mdDialog.show((0, _contactForm2.default)());
	        }
	    }, {
	        key: 'onAcceptContact',
	        value: function onAcceptContact(index) {
	            console.log('on accept', index);
	        }
	    }, {
	        key: 'onRemoveContact',
	        value: function onRemoveContact(index) {
	            console.log('on remove', index);
	        }
	    }]);

	    return RosterController;
	}();

/***/ },
/* 45 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = function (params) {
	    return {
	        controller: ContactFormController,
	        controllerAs: 'vm',
	        templateUrl: 'web/chat/roster/contactForm/contactForm.html'
	    };
	};

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ContactFormController = function () {
	    function ContactFormController($mdDialog, ContactService, ContactsStore, EventBus, $scope) {
	        var _this = this;

	        _classCallCheck(this, ContactFormController);

	        this.$mdDialog = $mdDialog;
	        this.ContactService = ContactService;
	        this.ContactsStore = ContactsStore;
	        this.EventBus = EventBus;
	        this.searchContact = null;

	        ContactsStore.subscribeAndInit($scope, function () {
	            _this.contacts = ContactsStore.getContacts();
	            _this.currentContactIndex = null;
	        });
	    }

	    _createClass(ContactFormController, [{
	        key: 'onSelect',
	        value: function onSelect(index) {
	            this.EventBus.emit(this.EventBus.contacts.SELECT, index);
	        }
	    }, {
	        key: 'onFindContact',
	        value: function onFindContact() {
	            if (this.searchContact && this.searchContact.length > 0) {
	                this.ContactService.findContacts(this.searchContact);
	            }
	        }
	    }, {
	        key: 'onInvite',
	        value: function onInvite(index) {
	            var _this2 = this;

	            this.onSelect(index);
	            var contact = this.ContactsStore.getSelectedContact();
	            this.ContactService.addContactAndSendInvitation(contact, 'todo: please add me to contact list').then(function () {
	                return _this2.onClose();
	            });
	        }
	    }, {
	        key: 'onClose',
	        value: function onClose() {
	            this.$mdDialog.cancel();
	        }
	    }]);

	    return ContactFormController;
	}();

/***/ },
/* 46 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = function () {
	    return {
	        restrict: 'EA',
	        controllerAs: 'vm',
	        controller: MessagesController,
	        templateUrl: 'web/chat/messages/messages.html',
	        scope: {},
	        bindToController: true
	    };
	};

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	;

	var MessagesController = function () {
	    function MessagesController(MessagesStore, ChatsStore, ChatService, $scope, $timeout) {
	        var _this = this;

	        _classCallCheck(this, MessagesController);

	        this.ChatService = ChatService;
	        MessagesStore.subscribeAndInit($scope, function () {
	            $timeout(function () {
	                _this.messages = MessagesStore.getMessages();
	            });
	        });
	        ChatsStore.subscribeAndInit($scope, function () {
	            _this.chat = ChatsStore.getCurrentChat();
	        });
	    }

	    _createClass(MessagesController, [{
	        key: 'onSend',
	        value: function onSend() {
	            console.log(this.newMessage);
	            if (this.newMessage) {
	                this.ChatService.sendMessage(this.newMessage);
	                this.newMessage = '';
	            }
	        }
	    }]);

	    return MessagesController;
	}();

/***/ },
/* 47 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function ($timeout) {
	    return {
	        restrict: 'A',
	        scope: {
	            hoverToggle: '='
	        },
	        link: function link(scope, element) {
	            element.on('mouseenter', function () {
	                $timeout(function () {
	                    return scope.hoverToggle = true;
	                });
	            });
	            element.on('mouseleave', function () {
	                $timeout(function () {
	                    return scope.hoverToggle = false;
	                });
	            });
	        }
	    };
	};

/***/ }
/******/ ]);