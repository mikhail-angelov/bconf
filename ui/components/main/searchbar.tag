<searchbar>

<div class='search-bar'>
    <input class='search-bar-input' placeholder='search'>

    <button class='search-bar-button' onclick={addContact}>
        <i class="material-icons">launch</i>
    </button>
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
.search-bar-button{
    background: transparent;
    border: 0;
    color: gray;
}

</style>
</searchbar>