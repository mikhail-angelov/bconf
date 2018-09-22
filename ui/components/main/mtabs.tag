<mtabs>
    <div class='mtabs'>
        <!-- <button class="contact-list {selected: opts.activetab==='contactsMenu'}" onclick={()=>opts.changetab('contactsMenu')}>
            <i class="material-icons">account_circle</i>
        </button> -->
        <button class="chat-list {selected: opts.activetab==='chatsMenu'}" onclick={()=>opts.changetab('chatsMenu')}>
            <i class="material-icons">chat</i>
        </button>
        <button class="account-infotmation-list {selected: opts.activetab==='settingsMenu'}" onclick={()=>opts.changetab('settingsMenu')}>
            <i class="material-icons">settings</i>
        </button>
    </div>
        
    <style>
        .mtabs {
            display: flex;
        }
        .mtabs button {
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
</mtabs>