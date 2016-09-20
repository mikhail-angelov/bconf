<main>
<div class='main'>
<navbar style="margin-bottom: 15px;"/>
<div class='row'>
    <div class='col-xs-3 toflex'>
       <div class="searchbar">
            <searchbar/>
       </div>
        <div class="contacts toflex">
            <contacts contacts={contacts}/>
        </div>
    </div>
    <div class="col-xs-offset-1 toflex"></div>
    <div class='col-xs-8 toflex'>
    <div class="chat toflex">
    <chat messages={messages}/>
    </div>
    <div class="input">
    <chatinput messages={messages}/>
    </div>
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
    border-right: 1px solid #e7e8ec;
    border-left: 1px solid #e7e8ec;
    flex-direction: column;
    flex: 100%;
}

.main .col-xs-8, .col-xs-9 {

}

.toflex {
    display:flex;
}
.contacts {
    overflow: auto;
    flex-flow: column nowrap;
    flex: 1 1 100%;
}
.chat {
    overflow: auto;
    flex-flow: column-reverse nowrap;
    flex: 1 1 100%;
}
.input {
    height: 100px;
    padding: 10 25;
}

</style>
</main>