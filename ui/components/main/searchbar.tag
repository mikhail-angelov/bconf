<searchbar>

    <material-input id="search-contact" valueChanged={search} icon="true" waves-color="#42648b">
        <i class="material-icons">search</i>
    </material-input>
    <material-button onclick={addContact} class="add-contact" waves-center="true" rounded="true" waves-opacity="0.6" waves-duration="600">
        <i class="material-icons">add</i>
    </material-button>


<script>
    this.search = (searchText)=> {
        this.opts.searchcontact(searchText)
    }
    this.addContact = ()=>{}
</script>

<style>
searchbar {
        display: flex;
}
material-button.add-contact{
    background: #cc0044;
    color: white;
    display: flex;
    min-width: 30px;
    width: 30px;
    height: 30px;
    min-height: 30px;
}
material-button.add-contact i.material-icons{
    line-height: 30px;
}
.searchbar material-input {
    width: auto;
    padding: 0px 5px;
    height: 50px;
    color: #42648b !important;
    border-bottom: solid 1px #e4e6e9;
}
material-input .input-content {
    font-size: 16px;
    color: #42648b !important;
    position: relative;
}

</style>
</searchbar>