<tabs class='tabs'>
    <button class="contact-list {selected: isContactsState()}" onclick={contactList}>
        <i class="material-icons">contacts</i>
    </button>
    <button class="chat-list {selected: isChatsState()}" onclick={chatList}>
        <i class="material-icons">chat</i>
    </button>
    <button class="account-infotmation-list {selected: isSettingsState()}" onclick={accountList}>
        <i class="material-icons">account_circle</i>
    </button>
        
    <script>

        const actions = require('../../services/actions/index.js')
        this.contactList = ()=>  changeState.bind(this)({sub:actions.uiState.sub.CONTACTS, main:actions.uiState.main.MAIN})
        this.chatList = ()=>  changeState.bind(this)({sub:actions.uiState.sub.CHATS, main:actions.uiState.main.MAIN})
        this.accountList = ()=>  changeState.bind(this)({sub:actions.uiState.sub.SETTINGS, main:actions.uiState.main.MAIN})

       
        this.isContactsState = ()=>this.opts.active_tab === actions.uiState.sub.CONTACTS;
        this.isChatsState = ()=>this.opts.active_tab === actions.uiState.sub.CHATS;
        this.isSettingsState = ()=>this.opts.active_tab === actions.uiState.sub.SETTINGS;

        function changeState(state){
            this.opts.changestate(state)
        }
    </script>
    <style>
        .tabs {
            position: absolute;
            bottom: 0px;
            height:35px;
            width: 100%;
            display: flex;
            justify-content: flex-start;
        }
        .tabs button {
            background: white;
            outline: none;
        }
        .contact-list, .chat-list, .account-infotmation-list {
            flex: 1 1 33.3333%;
            border-right: solid 1px #e4e6e9;
            border-left: none;
            border-bottom: none;
            border-top: solid 1px #e4e6e9;
            color: #42648b;
        }
        .account-infotmation-list {
            border-right: none;
        }
        .contact-list:hover, .chat-list:hover, .account-infotmation-list:hover {
            color: #cc0044;
        }
        .selected {
            color: #cc0044;
            border-top: none;
        }

    </style>
</tabs>