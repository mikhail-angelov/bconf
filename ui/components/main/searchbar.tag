<searchbar>
        <material-input onkeyup={search} icon="true" waves-color="#42648b" label="Search Contact">
            <i class="material-icons">search</i>
        </material-input>
        <script>
            this.search = (contactName)=>this.opts.searchcontact(this.opts.contacts.name)
        </script>

<style>


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