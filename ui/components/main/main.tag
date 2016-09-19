<main>
<div class='main'>
<navbar/>
<button onclick={addContact}>Add Contact</button>
<button onclick={onLogin}>Back</button>
<div class='row'>
    <div class='col-xs-3'>
    <searchbar/>
    <contacts contacts={contacts}/>
    </div>
    <div class="col-xs-offset-1"/>
    <div class='col-xs-8'>
    <chat messages={messages}/>
    <chatinput messages={messages}/>
    </div>
</div>
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
    this.update()
    console.log('Contact')
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

body {
    margin: 0;
    border-left: 2px solid;
    border-right: 2px solid;
    border-bottom: 2px solid;
}

.main{
    display: flex;
    flex-flow: column nowrap;
    height: 100%;
    width: 100%;
    background-color: #fafbfc;
}
.main .row {
    box-sizing: border-box;
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    -ms-flex: 0 1 auto;
    -webkit-box-flex: 0;
    flex: 0 1 100%;
    -ms-flex-direction: row;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    flex-direction: row;
    -ms-flex-wrap: wrap;
    flex-wrap: nowrap;
    margin:0;
    
}



.main .col-xs, .col-xs-1, .col-xs-10, .col-xs-11, .col-xs-12, 
.col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, 
.col-xs-8, .col-xs-9 {
    overflow: auto;
    border-right: 1px solid #e7e8ec;
    border-left: 1px solid #e7e8ec;
    padding: 0;
}

.main .col-xs-3 {
    flex-flow: column nowrap;
}

.main .col-xs-8, .col-xs-9 {
    flex-direction: column;
    justify-content: flex-end;
}

div {
    display: flex;
}

</style>
</main>