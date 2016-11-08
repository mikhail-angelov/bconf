<tabs class='tabs'>
    <button class="contact-list {selected: this.opts.state==='contacts'}" onclick={contactList}>
        <i class="material-icons">contacts</i>
    </button>
    <button class="chat-list {selected: this.opts.state==='chatlist'}" onclick={chatList}>
        <i class="material-icons">chat</i>
    </button>
    <button class="account-infotmation-list {selected: this.opts.state==='accountlist'}" onclick={accountList}>
        <i class="material-icons">account_circle</i>
    </button>
        
    <script>

        this.items = [{title:'ONE',id:1},{title:'TWO',id:2}]
        this.onChange = item =>{
            console.log(item)
        }

        this.state = this.opts.state;

        this.contactList = ()=> {
            this.opts.contactlist();
            console.log(this.opts.state+'1');
        }
        this.chatList = ()=> {
            this.opts.chatlist();
            console.log(this.opts.state+'2');
        }
        this.accountList = ()=> {
            this.opts.accountlist();
            console.log(this.opts.state+'3');
        }

    </script>
    <style>
        .tabs {
            position: absolute;
            bottom: 0px;
            height:35px;
            width: 100%;
            /*border-top: solid 1px #e4e6e9;*/
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