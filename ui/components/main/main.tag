<main>
    <div class='row'>
        <div class='col-xs-2' style='height:100%; display: flex;'>
            <div style='flex:1'>
                <settingsMenu if={isSettingsState()} user={auth.user} status={getStatus()} updatestatus={updatestatus}/>
                <contacts if={isContactsState()} removeContact={removeContact} contacts={contacts.filtered} choose_contact={chooseContact}  startChat={startChat} />
                <chatlist if={isChatsState()} chats={chats} setActiveChat={setActiveChat}/>
            </div>
            <mtabs changeTab={changeTab} activeTab={state.sub}/>
        </div>

        <div class='col-xs-10' style='height:100%; display: flex;'>

            <settings 
                if={isSettingsState()}
                user={auth.user} 
                status={getStatus()} 
                updatestatus={updatestatus}
            />
            <chat 
                if={isChatsState()} 
                class="chat"  
                user={auth.user} 
                messages={chats} 
                contact={chats.contact} 
                accountFoto={accountFoto} 
            />
            <contactinformation 
                if={isContactsState()} 
                class="contact_information" 
                show={contactSelect} 
                changeTab={changeTab} 
                contact={selectedContact} 
                chatWith={startChat}
            />
        </div>
    </div>

    <script>
        
const store = require('../../services/store')
const actions = require('../../services/actions/index.js')
const _ = require('lodash')

const openSocketAction = actions.openWS('echo.websocket.org')
store.dispatch(openSocketAction);

const contactList = actions.setContactList()
store.dispatch(contactList);

store.dispatch(actions.ensureUserInfo());

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

const subUiState = localStorage.getItem('uiState') || actions.uiState.sub.CONTACTS;

const newStateAction = actions.newState({main:actions.uiState.main.MAIN, sub:subUiState});
store.dispatch(newStateAction);

const initChats = actions.initChats(this.auth)
store.dispatch(initChats)

this.isContactsState = ()=>this.state.sub === actions.uiState.sub.CONTACTS;
this.isChatsState = ()=>this.state.sub === actions.uiState.sub.CHATS;
this.isSettingsState = ()=>this.state.sub === actions.uiState.sub.SETTINGS;

this.changeTab = newState =>{
    const action = actions.subState(newState)
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

this.onLogout = ()=>{
    store.dispatch(actions.logout());
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

this.getStatus = ()=>{
    return _.get(this,'auth.user.status') || 'Change status'
}

this.updatestatus = (newstatus)=>{
    store.dispatch(action.changeUserStatus(newstatus));
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
        .position_relative {
            position: relative;
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