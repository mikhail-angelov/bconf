<chatmenu>
    <div class="menu">
        <div class="arrow-back-field">
            <i class="material-icons arrow-back">arrow_back</i>
        </div>
        <div class="chat-name">
            {this.opts.chats.chats[this.opts.chats.active].contact.firstName} 
            {this.opts.chats.chats[this.opts.chats.active].contact.secondName}
        </div>
        <div class="sub-menu-field" >
        <i class="material-icons sub-menu">more_horiz</i>
        <div class="im-sub-menu" >
            <a href="#">Menu 1</a>
            <p>Menu 2</p>
            <p>Menu 3</p>
            <p>Menu 4</p>
            <p>Menu 5</p>
        </div>
        </div>
        <div class="msg-search-field" onclick={this.opts.chatsearchopen}>
            <i class="material-icons msg-search">search</i>
        </div>
    </div>
<script>

</script>
<style>
    .menu {
    display: flex;
    flex: 1 1 100%;
    flex-direction: row;
    height: 50px;
    border-radius: 4px 4px 0px 0px;
    width: 100%;
    background: white;
    border-bottom: solid 1px #e4e6e9;
    }
    .sub-menu-field {
        float: right;
        cursor: pointer;
    }
    .sub-menu-field:hover .im-sub-menu {
        opacity: 1;
        visibility: visible;
        top: 51px;        
    }


    .sub-menu {
        color: #42648b;
        opacity: 0.5;
        float: right;
        margin: 13px 13px;
        transition: opacity 0.5s;
    }
    .sub-menu-field:hover .sub-menu{
        opacity: 1;
    }

    .im-sub-menu {
        font-weight: 400;
        -webkit-font-smoothing: subpixel-antialiased;
        -moz-osx-font-smoothing: auto;
        position: absolute;
        opacity:0;
        visibility: hidden;
        min-width: 150px;
        max-width: 250px;
        top: 51px;
        right: 0px;
        background: #fff;
        z-index: 9999;
        border: 1px solid #c5d0db;
        padding: 4px 0;
        border-radius: 3px;
        box-shadow: 0 1px 3px rgba(0,0,0,.1);
        -o-transition: opacity 100ms linear, top 100ms linear, bottom 100ms linear, visibility 100ms linear;
        transition: opacity 100ms linear, top 100ms linear, bottom 100ms linear, visibility 100ms linear;
    }
    .im-sub-menu:after, im-sub-menu:before {
        position: absolute;
        pointer-events: none;
        border: solid transparent;
        content: '';
        height: 0;
        width: 0;
        bottom: 100%;
        right: 30.5px;
    }
    .im-sub-menu:before {
        border-width: 6px;
        margin: 0 -6px;
        border-bottom-color: #c5d0db;
    }
    .msg-search-field {
        float: right;
        cursor: pointer;
    }
    .msg-search {
        opacity: 0.5;
        color: #42648b;
        margin: 13px 13px;
        transition: opacity 0.5s;
    }
    .msg-search-field:hover .msg-search {
        opacity: 1;
    }
    
    .arrow-back-field {
        float: left; 
        cursor: pointer;
    }
    .arrow-back-field:hover .arrow-back {
        opacity: 1;
    }
    .arrow-back {
        opacity: 0.5;   
        color: #42648b;
        margin: 13px 13px;
        transition: opacity 0.5s;
    }

    .chat-name {
        color: #42648b;
        font-weight: 700;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
        vertical-align: top;
        line-height: 4;
        flex: 1 1 100%;
        width: 100%;
    }
</style>
</chatmenu>