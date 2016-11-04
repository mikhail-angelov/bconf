<main>
    <div class='main'>

        <navbar style="margin-bottom: 15px;" />

        <div class='row' style="margin-bottom: 15px;">
            <div class='col-xs-3 toflex'>
                <div class="useraccountinfo">
                    <useraccountinfo user_name={user} status={status} updatestatus={updatestatus}/>
                </div>
                <div class="searchbar">
                    <searchbar contacts={contacts} searchContact={searchContact}/>
                </div>
                <div class="contacts toflex white">
                    <contacts removeContact={removeContact} contacts={contacts}/>
                </div>
            </div>
            <div class="col-xs-1 toflex">
                <useraccountsettings/>
            </div>
            <div class='col-xs-8 toflex white align_bottom' style="margin-right: 15px; padding: 0;">

                <chatmenu/>

                <chat class="chat" user={user} messages={messages} accountFoto={accountFoto}/>

                <chatinput user_name={user} onsendMessage={sendMessage} onsendMessageButton={sendMessageButton}/>

            </div>
        </div>
    </div>

    <script>
const store = require('../../services/store')
const actions = require('../../services/actions/index.js')

store.subscribe(()=>{
    console.log('store change', store.getState())
    this.contacts = store.getState().contacts;
    this.messages = store.getState().messages['test'];
})
this.contacts = store.getState().contacts;
this.messages = store.getState().messages['test'];



this.addContact = ()=>{
    const action = actions.addContact({
    name: Math.floor((Math.random() * 100) + 1),
    info: 'dude',
    photo: 'cool.png',
    id: Math.floor((Math.random() * 100) + 1)
    })

    store.dispatch(action)
    this.update()
    console.log('Contact')
}
this.removeContact = (contactId)=>{
    console.log('contact removed',contactId)
    const action = actions.removeContact(contactId)

    store.dispatch(action)
    this.update()
    console.log('contact removed')
}
this.searchContact = (contactName)=>{
    if(contactName.keyCode==13){
    console.log('searched', contactName)
    const action = actions.searchContact(contactName)
    store.dispatch(action)
    this.update()
    console.log('contact searched')
    }
}

this.user = {firstname:'Ivan', secondname:'Dmitrich'};


this.accountFoto = ()=> {
    const foto = accountFoto({
        photo: 'cool.png'
    })
}

this.onBack = ()=>{
    console.log('to welcome')
    riot.route('welcome')
}




this.onLogin = ()=>{
    console.log('login')
    riot.route('auth')
}



this.sendMessage = (e)=>{
    console.log(e.keyCode, e.shiftKey, e.ctrlKey)
    if(e.keyCode=='13' && e.shiftKey){
        const value = e.target.value.trim();
        if (value) {
            const action = actions.addMessage({
                id:'any',
                userId:'test',
                text:value,
                type:'out',
                from: { name:'Ivan'},
                date: new Date()
            })
            store.dispatch(action)

            const echo = actions.addMessage({
                id:'any',
                userId:'test',
                text: value +' your self',
                type:'in',
                from: { name:'Vasy'},
                date: new Date()
            })
            store.dispatch(echo)


            console.log(this.messages);
            e.target.value = '';
            this.update();
            }
        e.target.value = '';
    }

this.sendMessageButton = (e)=>{
    console.log('send');
    var text = document.getElementById('text');
    text.value = text.value.concat(this.messages);
    e.target.text.value = '';
        this.update();
} 
}


this.status = 'Status';

this.updatestatus = (newstatus)=>{
    this.status = newstatus;
    this.update();
}



</script>

    <style>
        body {
            margin: 0;
            border-left: 2px solid;
            border-right: 2px solid;
            border-bottom: 2px solid;
            font-size: 12.5px;
            font-weight: 400;
            font-family: -apple-system, BlinkMacSystemFont, Roboto, Open Sans, Helvetica Neue, sans-serif;
            outline: none;
        }
        
        textarea {
            resize: none;
        }
        
        textarea:focus {
            outline: none;
        }
        
        input:focus {
            outline: none;
        }
        
        .main {
            display: flex;
            flex-flow: column nowrap;
            height: 100%;
            width: 100%;
            background-color: #edeef0;
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
            margin: 0;
        }
        
        .main .col-xs,
        .col-xs-1,
        .col-xs-10,
        .col-xs-11,
        .col-xs-12,
        .col-xs-2,
        .col-xs-3,
        .col-xs-4,
        .col-xs-5,
        .col-xs-6,
        .col-xs-7,
        .col-xs-8,
        .col-xs-9 {
            border-right: 1px solid #e7e8ec;
            border-left: 1px solid #e7e8ec;
            flex-direction: column;
            flex: 100%;
        }
        
        .main .col-xs-8,
        .col-xs-9 {}
        
        .toflex {
            display: flex;
        }
        
        .contacts {
            overflow: auto;
            flex-flow: column nowrap;
            flex: 1 1 100%;
        }
        
        .chat {
            overflow: auto;
            flex-flow: column nowrap;
            flex: 1 1 100%;
            padding: 0 15;
            justify-content: flex-end;
        }
        
        .chatinput material-button {
            background: #cc0044;
            margin: 0px 0px 0px 20px;
        }
        
        .white {
            background: #fff;
            border-radius: 4px;
            box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.27);
        }
        
        .align_bottom {
            justify-content: flex-end;
        }
    </style>
</main>