<edit-channel>
    <div class='row'> 
        <div>Name:</div>
        <input placeholder='type channel name' ref='name'>
    </div>
    <div class='row'>
        <img width='100px' height='100px'>
        <material-button>Set Channel Picture</material-button>
    </div>
    <div class='row'> 
        <material-checkbox ref="public">
            Public channel
        </material-checkbox>
    </div>
    <div class='row'> 
        <div>Description: </div>
        <input placeholder='type channel description' ref='description'>
    </div>
    <div class='row'>
        <material-button onclick={save}>Save</material-button>
        <material-button onclick={opts.vm.cancel}>Cancel</material-button>
        <material-button if={opts.vm.remove} onclick={opts.vm.remove} style="background:#f43137">Remove</material-button>
    </div>
<script>
this.save = ()=>{
    const contact = {
        ...this.opts.vm.contact,
        name: this.refs.name.value,
        description: this.refs.description.value,
        public: this.refs.public.checked
    }
    this.opts.vm.save(contact)
}
</script>
    
<style>
    edit-channel{
        display:flex;
        height: 100%;
        flex-direction: column;
    }
    edit-channel .row{
        margin: 5px;
        padding-left: 10px;
        padding-bottom: 7px;
        align-items: center;
        border-bottom: 1px solid gainsboro;
    }
    edit-channel material-button{
        margin-right: 5px;
    }
    edit-channel img{
        margin-right: 5px;
    }

    edit-channel input {
        border: 0;
        margin-left: 10px;
        font-size: 100%;
        flex: 1;
    }
        
</style>
</edit-channel>