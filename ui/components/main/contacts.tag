<contacts>
<div class='contacts'>
    <input type='text' id='searchContact'>

    <contact-item each={name in this.opts.contacts} item={name}/>
          
</div>

<style>

.contacts {
    
    overflow: auto;
    
}



.contacts div {
	font-weight: 300;
	list-style-type: square;
	border-top: 1px solid #e7e7e7;
}

.contacts div:first-child {
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