<contacts>
<div class='contacts'>
    <input type='text' id='searchContact'>

    <ul>
        <li each={name in this.opts.contacts}>
            {name}
        </li>
    </ul>
</div>

<style>

.contacts {
    height: 100vh;
    overflow: auto;
    
}



.contacts li {
	font-weight: 300;
	list-style-type: square;
	border-top: 1px solid #e7e7e7;
}

.contacts li:first-child {
	border: none;
}

.contacts li.active {
	color: #29c5e6;
}

.contacts a {
	color: #8f8f8f;
}

</style>
</contacts>