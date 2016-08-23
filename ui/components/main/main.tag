<main>
<div class='row col-lg-12'>
    <contacts class='contacts col-lg-4' contacts={getContacts()}/>
    <div class='main col-lg-8'>
        <h2>main</h2>
        <button onclick={onBack}>Back</button>
    </div>
</div>


<script>
onBack(){
        console.log('to welcom')
    riot.route('welcome')
}

getContacts(){
    const contacts = [];
    for(let i=0; i < 200; i++){
        contacts.push('John Doe ' + i);
    }
    console.log(contacts)
    return contacts;
}
</script>
</main>