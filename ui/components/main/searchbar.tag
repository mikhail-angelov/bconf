<searchbar>

<div class='search-bar'>
    <input class='search-bar-input' placeholder='search'>

    <material-button class='icon-button' onclick={addContact}>
        <i class="material-icons">launch</i>
    </material-button>
</div>

<script>
    this.search = (searchText)=> {
        this.opts.searchcontact(searchText)
    }
    this.addContact = ()=>{}
</script>

<style>
.search-bar{
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.search-bar-input{
    display: flex;
    flex: 1;
    border-radius: 7px;
    border: 1px solid gainsboro;
    padding: 4px;
}

</style>
</searchbar>