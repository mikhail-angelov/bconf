<settings-menu>
    <div class='settingsMenu'>
        <material-button class='settingsMenuButton' click={opts.vm.getHostInfo}>host info</material-button>
        <material-button class='settingsMenuButton' click={opts.vm.getUserInfo}>user info</material-button>
    </div>
<style>
    .settingsMenu{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .settingsMenuButton{
        width: 100px;
        margin: 5px;
    }
</style>
</settings-menu>