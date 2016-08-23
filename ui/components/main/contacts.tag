<contacts>
<div>
    <input type='text' id='searchContact'>

    <ul>
        <li each={name in this.opts.contacts}>
            {name}
        </li>
    </ul>
</div>

<style>
.contacts {
    height: calc(100vh - 50px);
    overflow: auto;
}

div {
    border: 1px solid;
}
</style>
</contacts>