<chatmenu>
    <div class="menu">
        <i class="material-icons arrow-back">arrow_back</i>
        <div class="chat-name">
            nickname of someone
        </div>
        <div class="sub-menu-field" onmouseover={subMenuOpen} >
        <i class="material-icons sub-menu">more_horiz</i>
        <div class="im-sub-menu" show={menuOpen} onmouseout={subMenuClose}>
            <a href="#main">Menu 1</a>
            <p>Menu 2</p>
            <p>Menu 3</p>
            <p>Menu 4</p>
            <p>Menu 5</p>
        </div>
        </div>
        <i class="material-icons msg-search">search</i>
    </div>
<script>
    this.menuOpen = false;

    this.subMenuOpen = ()=> {
        this.menuOpen = true;
    }
    this.subMenuClose = ()=> {
        this.menuOpen = false;
    }

</script>
<style>
    .menu {
        vertical-align: middle;
        height: 50px;
        border-radius: 4px 4px 0px 0px;
        width: 100%;
        background: white;
        border-bottom: solid 1px #e4e6e9;
        position: relative;
    }
    .sub-menu-field {
        float: right;
    }
    .sub-menu-field:hover .im-sub-menu {
        display: block;
        
    }


    .sub-menu {
        color: #42648b;
        opacity: 0.5;
        float: right;
        margin: 13px 13px;
    }
    .sub-menu:hover {
        opacity: 1;
    }

    .im-sub-menu {
        font-weight: 400;
        -webkit-font-smoothing: subpixel-antialiased;
        -moz-osx-font-smoothing: auto;
        position: absolute;
        min-width: 150px;
        max-width: 250px;
        top: 51px;
        right: 0px;
        background: #fff;
        z-index: 4;
        border: 1px solid #c5d0db;
        padding: 4px 0;
        border-radius: 3px;
        box-shadow: 0 1px 3px rgba(0,0,0,.1);
        -o-transition: opacity 100ms linear, top 100ms linear, bottom 100ms linear, visibility 100ms linear;
        transition: opacity 100ms linear, top 100ms linear, bottom 100ms linear, visibility 100ms linear;
        pointer-events: none;
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

    .msg-search {
        opacity: 0.5;
        color: #42648b;
        float: right;
        margin: 13px 13px;
    }
    .msg-search:hover {
        opacity: 1;
    }
    

    .arrow-back {
        opacity: 0.5;
        float: left;    
        color: #42648b;
        margin: 13px 13px;
    }

    .chat-name {
        color: #42648b;
        font-weight: 700;
        max-width: 200px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
        vertical-align: top;
        line-height: 4;
    }
</style>
</chatmenu>