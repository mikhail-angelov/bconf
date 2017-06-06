<chat-top-menu>
    <div class="row chat-top-menu" if={opts.vm.contact}>
        <div class="col-xs-1 chat-top-menu-avatar">
            {opts.vm.contact.initials}
        </div>
        <div class="col-xs-9 chat-top-menu-name">
            <div>{opts.vm.contact.name}</div>
        </div>
        
        <div class="col-xs-1" >
            <material-button class="icon-button" onclick={toggleMenu}>
                <i class="material-icons">more_horiz</i>
            </material-button>
            <material-dropdown ref='subMenu'>
                <a href="#">Menu 1</a>
                <p>Menu 2</p>
                <p>Menu 3</p>
                <p>Menu 4</p>
                <p>Menu 5</p>
            </material-dropdown>
        </div>

        <material-button class="col-xs-1 icon-button" onclick={opts.vm.logout}>
            <i class="material-icons arrow-back">arrow_back</i>
        </material-button>
    </div>
    <div class="row chat-top-menu" if={!opts.vm.contact}>
        <material-button class="col-xs-1 col-xs-offset-11 icon-button" onclick={opts.vm.logout}>
            <i class="material-icons arrow-back">arrow_back</i>
        </material-button>
    </div>
<script>
this.toggleMenu = ()=>{
    if(this.refs.subMenu.opened){
        this.refs.subMenu.close()
    }else{
        this.refs.subMenu.open()
    }
}
</script>
<style>
   .chat-top-menu{
       border-bottom: 1px solid gainsboro;
   }
   .chat-top-menu-name{
       align-items: center;
       display: flex;
   }
   .chat-top-menu-logout{

   }
</style>
</chat-top-menu>