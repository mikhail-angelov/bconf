<main>

<div class='row col-lg-12 nomargin'>
<navbar/>
    
    <contacts class='contacts col-lg-4' contacts={contacts}/>
    <div class='main col-lg-8'>
        <button onclick={addContact}>Add Contact</button>
        <button onclick={onBack}>Back</button>
        <div class='messages'>
            <div each={m in this.messages}>
                {m}
            </div>
        </div>
        <form onsubmit={onSubmit}>
        <input type='text' name='newMessage' id='newMessage'>
        </form>
    </div>
</div>


<script>

const store = require('../../services/storeConfig').store
const actions = require('../../services/actions')

store.subscribe(()=>{
    console.log('store change', store.getState())
    this.contacts = store.getState();
})
this.contacts = store.getState();

this.addContact = ()=>{
    const action = actions.addContact('----BOB---')
    store.dispatch(action)
}

this.onBack = ()=>{
    console.log('to welcom')
    riot.route('welcome')
}



this.onSubmit = (e)=>{
    const value = e.target.newMessage.value;
    console.log(e.target)
    if(value){
        this.messages = [value].concat(this.messages);
        e.target.newMessage.value = '';
    }
}


this.messages = ['hey','ho'];
</script>

<style>
.main{
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;
}
.messages{
    display:flex;
    flex:1;
    flex-direction: column-reverse;
    overflow: auto;
}
 .nomargin{
     margin:0;
 }
 .col-lg-12 {
    position: relative;
    min-height: 1px;
    padding: 0;    
}
</style>
</main>