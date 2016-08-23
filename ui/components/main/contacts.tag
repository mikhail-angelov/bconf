<contacts>
<div>
    <input type='text' id='searchContact'>

    <ul>
        <li each={name in this.opts.contacts}>
            {name}
        </li>
    </ul>
</div>

</contacts>