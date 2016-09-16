<main>
<div class='main'>
<header>
<navbar/>
</header>
<button onclick={addContact}>Add Contact</button>
<button onclick={onLogin}>Back</button>
<div class='maincontent'>
<aside>
<contacts class='contacts' contacts={contacts}/>
</aside>
<chat/>
</div>

<script>
const store = require('../../services/store')
const actions = require('../../services/actions/index.js')

store.subscribe(()=>{
    console.log('store change', store.getState())
    this.contacts = store.getState().contacts;
})
this.contacts = store.getState().contacts;

this.addContact = ()=>{
    const action = actions.addContact({
    name:'-bob',
    info: 'dude',
    photo: 'cool.png'
    
    })
    store.dispatch(action)
}

this.onBack = ()=>{
    console.log('to welcom')
    riot.route('welcome')
}




this.onLogin = ()=>{
    console.log('login')
    riot.route('auth')
}


this.messages = ['hey','ho'];
</script>

<style>
.main{
    display: flex;
    flex-flow: column wrap;
    height:100%;
}
.maincontent{
    display: flex;
    flex-direction: row;
    justify-content: ;
    align-items: ;
    border: 1px;
    
}
.chat{
    display:flex;
    flex:1;
    flex-direction: column-reverse;
    overflow: auto;
}
 .nomargin{
     margin:0;
 }
</style>
</main>