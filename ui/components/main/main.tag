<main>
    <div class='main'>

        <navbar style="margin-bottom: 15px;" addContact={addContact}/>

        <div class='row' style="margin-bottom: 15px;">

            <div class='col-xs-3 toflex white' style="padding: 0px; margin: 0 10px; position: relative;">

                <div class="useraccountinfo"  if={state==='accountlist'}>
                    <useraccountinfo user_name={user} status={status} updatestatus={updatestatus}/>
                </div>

                <div class="searchbar" if={state==='contacts'}>
                    <searchbar contacts={contacts} searchContact={searchContact} />
                </div>

                <div class="contacts toflex" if={state=='contacts'}>
                    <contacts removeContact={removeContact} contacts={contacts.filtered} />
                </div>
                <div class="tabs-field">
                    <tabs contactList={contactList} chatList={chatList} accountList={accountList} state={state} />
                </div>
            </div>
            <div class='col-xs-9 toflex white align_bottom' style="margin-right: 10px; padding: 0; flex: 100%;">

                <chatmenu if={search} chatSearchOpen={chatSearchOpen} />

                <chatsearch if={!search} chatSearchClose={chatSearchClose} />

                <chat class="chat" user={user} messages={messages} accountFoto={accountFoto} />

                <chatinput user_name={user} onsendMessage={sendMessage} onsendMessageButton={sendMessageButton} />

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
    console.log('add');
    const action = actions.addContact({
                userId: 'any',
                firstName: 'name' + Math.floor((Math.random() * 100) + 1),
                secondName: 'secondname',
                info: 'some information'
            });
    store.dispatch(action);
    this.update();
}

this.removeContact = (contactId)=>{
    console.log('contact removed',contactId)
    const action = actions.removeContact(contactId)

    store.dispatch(action)
    this.update()
    console.log('contact removed')
}
this.searchContact = (searchText)=>{
    
    console.log('searched')
    const action = actions.searchContact(searchText)
    store.dispatch(action)
    this.update()
    console.log('contact searched')
    
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
                from: 'me',
                date: new Date()
            })
            store.dispatch(action)

            const echo = actions.addMessage({
                id:'any',
                userId:'test',
                text: value +' your self',
                type:'in',
                from: { name:'echo', surname:''},
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

        this.state = 'contacts';
        console.log(this.state);

        this.contactList = ()=> {
            console.log(this.state + 'main')
            this.state = 'contacts';
            this.state === 'contacts';
            this.update();
        }
        this.chatList = ()=> {
            console.log(this.state + 'main2')
            this.state = 'chatlist';
            this.state === 'chatlist';
            this.update();
        }
        this.accountList = ()=> {
            console.log(this.state + 'main3')
            this.state = 'accountlist';
            this.state === 'accountlist';
            this.update();
        }


        this.search = true;
        console.log(this.search)

        this.chatSearchOpen = ()=> {
            this.search = false;
            this.update();
            console.log(this.search)
        }
        this.chatSearchClose = ()=> {
            this.search = true;
            this.update();
            console.log(this.search)
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
            margin-bottom: 35px;
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