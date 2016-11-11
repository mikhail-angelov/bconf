<chatsearch>
    <div class="menu">
        <i class="material-icons msg-search-menu">search</i>
        <div class="chat-search-input">
            <input name="messageSearchInput" type="text" placeholder="поиск по истории сообщений">
        </div>
        <div class="chat-search-btn-field toflex">
            <material-button class="ui" waves-color="#000" shady="true" style="background:#cc0044;" onclick={searchMsg} >
                <div class="text">Search</div>
            </material-button>
            <material-button class="ui" waves-color="#000" shady="true" style="background:#42648b; opacity: 0.5;" onclick={this.opts.chatsearchclose}>
                <div class="text">Back</div>
            </material-button>
        </div>
    </div>
    <script>
        this.searchMsg = ()=> {
            const text = this.messageSearchInput.value;
            this.opts.searchmessage(text);
        }
    </script>
    <style>
    .msg-search-menu {
        color: #42648b;
        margin: 13px 13px;
        float: left;
    } 
    .chat-search-input {
        float: left;
        height: 100%;
    }
    .chat-search-input input {
        width: 500px;
        height: 100%;
        padding: 14px 44px 13px 0px;
        box-sizing: border-box;
        border: none;
        margin: 0;
        line-height: 18px;
        font-size: 13px;
        outline: none;
        box-shadow: none;
        border-left: 20px solid transparent;
        background-position: 0;
        color: #000;
    }
    .chat-search-btn-field {
        height: 100%;
        align-items: center;
        justify-content: space-around;
        width: 225px;
        float: right;
    }
    .chat-search-btn-field material-button {
        padding: 0px 15px 0px;
        margin: 0;
        font-size: 12.5px;
        display: inline-block;
        zoom: 1;
        cursor: pointer;
        white-space: nowrap;
        outline: none;
        line-height: 15px;
        text-align: center;
        text-decoration: none;
        background: none;
        background-color: #5e81a8;
        color: #fff;
        border: 0;
        border-radius: 2px;
        box-sizing: border-box;
        text-transform: none;
    }
    </style>
</chatsearch>