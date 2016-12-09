<navbar>
<div class='navbar toflex'>

        <!--<material-button onclick={this.opts.onlogout} rounded="true" style='margin-top: 10px;'>
            <i class="material-icons">arrow_back</i>
        </material-button>-->

        <material-button class="ui rounded-buttons-position" waves-center="true" rounded="true" waves-opacity="0.6" waves-duration="600" onclick={this.opts.onlogout} >
            <i class="material-icons">arrow_back</i>
        </material-button>

        <h1 style="color: white;"> BCONF </h1>

        <material-button class="ui rounded-buttons-position" waves-center="true" rounded="true" waves-opacity="0.6" waves-duration="600" onclick={this.opts.addcontact} >
            <i class="material-icons">add</i>
        </material-button>

</div>
</div>
<script>
</script>
<style>


    .navbar {
        flex-flow: row nowrap;
        flex: 1 1 auto;
        justify-content: space-between;
        background: #cc0044;
    }
    .rounded-buttons-position {
        background:#cc0044;
        margin: 10px;
    }
</style>

</navbar>