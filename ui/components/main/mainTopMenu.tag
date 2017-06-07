<main-top-menu class="row main-top-menu">
    <div class="row col-xs-10">
    </div>
    <div class="row col-xs-2 end-xs">
        <material-button class="icon-button" onclick={opts.vm.search}>
            <i class="material-icons">search</i>
        </material-button>
        <material-button class="icon-button" onclick={opts.vm.addChannel}>
            <i class="material-icons">add</i>
        </material-button>
        <material-button class="icon-button" onclick={opts.vm.logout}>
            <i class="material-icons">arrow_back</i>
        </material-button>
        <material-button class="icon-button" onclick={toggleMenu}>
            <i class="material-icons">more_vert</i>
        </material-button>
        <material-dropdown ref='subMenu'>
            <a href="#">Close</a>
        </material-dropdown>
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
   .main-top-menu{
       border-bottom: 1px solid gainsboro;
   }
   .main-top-menu-name{
       align-items: center;
       display: flex;
   }

</style>
</main-top-menu>