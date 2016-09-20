<navbar>
<div class='navbar toflex'>
<material-pane material-navbar-color="#cc0044">
    <div class="material-pane-left-bar">
        <material-button onclick={onLogin} rounded="true" style='margin-top: 10px;'>
            <i class="material-icons">arrow_back</i>
        </material-button>
    </div>
    <div class="material-pane-title">BCONF</div>
    <div class="material-pane-right-bar" style="margin: 10px;">
        <material-button onclick={addContact} class="ui" waves-center="true" rounded="true" waves-opacity="0.6" waves-duration="600" style="background:#cc0044">
            <i class="material-icons">add</i>
        </material-button>
    </div>
</material-pane>
</div>

<style>

    .navbar {
        flex-flow: row nowrap;
        flex: 1 1 auto;
    }
    material-pane {
        width: 100%;
    }
    material-navbar {
        background-color: #cc0044;
    }
</style>

</navbar>