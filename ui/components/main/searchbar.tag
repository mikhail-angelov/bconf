<searchbar>
        <material-input onkeyup={search} icon="true" waves-color="#2f6975" label="Search Contact">
            <i class="material-icons">search</i>
        </material-input>
        <script>
            this.search = (contactName)=>this.opts.searchcontact(this.opts.contacts.name)
        </script>

<style>


.searchbar material-input {
    width: 100%;
    padding: 10px 0;
    height: 50px;
}


</style>
</searchbar>