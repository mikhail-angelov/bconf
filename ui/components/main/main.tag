<main>
    <div class='main'>

        <navbar style="margin-bottom: 15px;" onLogout={onLogout} addContact={addContact} onBack={onBack}/>

        <div class='row' style="margin-bottom: 15px;">

            <div class='col-xs-3 toflex white position_of_left_side'>

                <div class="useraccountinfo"  if={isSettingsState()}>
                    <useraccountinfo user_name={user} status={status} updatestatus={updatestatus}/>
                </div>

                <div class="searchbar" if={isContactsState() || isChatsState()}>
                    <searchbar searchContact={searchContact} />
                </div>

                <div class="contacts toflex" if={isContactsState()}>
                    <contacts removeContact={removeContact} contacts={contacts.filtered} choose_contact={chooseContact}  startChat={startChat} />
                </div>

                <chatlist if={isChatsState()} chats={chats} setActiveChat={setActiveChat}/>

                <div class="tabs-field">
                    <tabs changeState={changeState} active_tab={state.sub}/>
                </div>

            </div>

            <div if={isChatsState()} class='col-xs-9 toflex white position_of_right_side'>

                <chatmenu if={search} chatSearchOpen={chatSearchOpen} />

                <chatsearch if={!search} chatSearchClose={chatSearchClose} searchMessage={searchMessage} />

                <chat class="chat"  user={user} messages={chats} contact={chats.contact} accountFoto={accountFoto} />

                <chatinput user_name={user} onsendMessage={sendMessage} />

            </div>
            
            <div if={isContactsState()}  class='col-xs-9 white toflex position_of_right_side'>
                
                <div show={!contactSelect} class="contact_not_selected">
                    <i class="material-icons font_size">account_circle</i>
                    <p>choose contact from your contactlist</p>
                </div>

                <contactinformation class="contact_information" show={contactSelect} changeState={changeState} contact={selectedContact} chatWith={startChat}/>
            
            </div>
        
        </div>
   
    </div>

    <script>
        
const store = require('../../services/store')
const actions = require('../../services/actions/index.js')

const openSocketAction = actions.openWS('echo.websocket.org')
store.dispatch(openSocketAction);

const contactList = actions.setContactList()
store.dispatch(contactList);

const subUiState = localStorage.getItem('uiState') || actions.uiState.sub.CONTACTS;

const newStateAction = actions.newState({sub: subUiState, main:actions.uiState.main.MAIN});
store.dispatch(newStateAction);

store.subscribe(()=>{
    this.contacts = store.getState().contacts;
    this.chats = store.getState().chats;
    this.state = store.getState().uiState;
    this.auth = store.getState().auth;
    this.update();
    console.log('===', store.getState())
})
this.contacts = store.getState().contacts;
this.chats = store.getState().chats;
this.auth = store.getState().auth;
this.state = store.getState().uiState;

const initChats = actions.initChats(this.auth)
store.dispatch(initChats)

this.isContactsState = ()=>this.state.sub === actions.uiState.sub.CONTACTS;
this.isChatsState = ()=>this.state.sub === actions.uiState.sub.CHATS;
this.isSettingsState = ()=>this.state.sub === actions.uiState.sub.SETTINGS;

this.changeState = newState =>{
    const action = actions.newState(newState)
    store.dispatch(action)
}

this.setActiveChat = (chatId)=>{
    const action = actions.setActiveChat(chatId);
    store.dispatch(action);
    this.update();
}
this.startChat = (contact)=>{
    const newStateAction = actions.newState({sub:actions.uiState.sub.CHATS, main:actions.uiState.main.MAIN});
    store.dispatch(newStateAction);
    const action = actions.startChat(contact);
    store.dispatch(action);
    this.setActiveChat(contact.userId)
}

this.onLogout = ()=>{
    this.user = null
    store.dispatch(actions.logout(this.user))
    console.log('logout')
}

this.addContact = ()=>{
    const action = actions.addContact({
                userId: 'test' + Math.floor((Math.random() * 100) + 1),
                firstName: 'name' + Math.floor((Math.random() * 100) + 1),
                secondName: 'secondname',
                info: 'some information about this contact',
                status: 'I`m cool',
                country: 'USA',
                city: 'California',
                phoneNumber: '123456789'
            });
    store.dispatch(action);
}

this.removeContact = (contactId)=>{
    const action = actions.removeContact(contactId)
    store.dispatch(action)
    this.update()
    console.log('contact removed')
}

this.searchContact = (searchText)=>{
    const action = actions.searchContact(searchText)
    store.dispatch(action)
    this.update()
}

this.contactSelect = false;

this.chooseContact = (contact)=>{
    this.selectedContact = contact;
    this.contactSelect = true;
    this.update();
}

this.user = this.auth;

this.onBack = ()=>{
    console.log('to welcome')
    riot.route('welcome')
}

this.onLogin = ()=>{
    console.log('login')
    riot.route('auth')
}

this.sendMessage = (value)=>{
        if (value) {
            const action = actions.addMessage({
                id:'any',
                userId:'test',
                text: value,
                type:'out',
                from: 'me',
                date: new Date()
            })
            store.dispatch(action)

            const echo = actions.sendMessage({
                username:'test',
                message: value
            });
            store.dispatch(echo)

        }
}

this.searchMessage = (text)=> {
    const action = actions.searchMessage(text);
    store.dispatch(action);
    this.update();
    console.log('message searched')
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
            flex-direction: column;
            flex: 100%;
        }
        
        .toflex {
            display: flex;
        }

        .position_of_right_side{
            margin-right: 10px;
            padding: 0;
            position: relative;
        }
        .position_of_left_side{
             padding: 0px; 
             margin: 0 10px; 
             position: relative;
             overflow-x: hidden;
        }
        
        .contacts {
            overflow-y: auto;
            overflow-x: hidden;
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
        .contact_not_selected {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
        }
        .contact_information {
            display: flex;
            height: 100%;
            margin: 0 20px;
        }
        .font_size {
            font-size: 100px;
            color: #cc0044;
        }
    </style>
</main>