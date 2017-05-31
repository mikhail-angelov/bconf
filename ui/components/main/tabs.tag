<tabs class='tabs'>
    <button class="contact-list {selected: opts.activetab==='contacts'}" onclick={()=>opts.changetab('contacts')}>
        <i class="material-icons">contacts</i>
    </button>
    <button class="chat-list {selected: opts.activetab==='chats'}" onclick={()=>opts.changetab('chats')}>
        <i class="material-icons">chat</i>
    </button>
    <button class="account-infotmation-list {selected: opts.activetab==='settings'}" onclick={()=>opts.changetab('settings')}>
        <i class="material-icons">account_circle</i>
    </button>
        

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