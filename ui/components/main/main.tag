<main>
    <div class='row' style='width: 100%;'>
        <div class='col-xs-2 leftPannel'>
            <div style='flex:1'>
                <settingsMenu if={isSettingsState()} user={auth.user} status={getStatus()} updatestatus={updatestatus}/>
                <contacts if={isContactsState()} contacts={contacts.filtered} select_contact={selectContact} />
                <chatlist if={isChatsState()} chats={chats} setActiveChat={setActiveChat}/>
            </div>
            <mtabs changeTab={changeTab} activeTab={state.sub}/>
        </div>

        <div class='col-xs-10' class='rightPannel'>

            <settings 
                if={isSettingsState()}
                user={auth.user} 
                status={getStatus()} 
                updatestatus={updatestatus}
            />
            <chat 
                if={isChatsState()} 
                user={auth.user} 
                messages={chats} 
                contact={chats.contact} 
                accountFoto={accountFoto} 
            />
            <contactinformation 
                if={isContactsState()} 
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

this.selectContact = (contact)=>{
    const action = actions.selectContact(contact)
    store.dispatch(action)
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
    .leftPannel{
        height:100%; 
        display: flex; 
        flex-direction: column;
        border-right: 1px solid gainsboro;
        padding-right: 0px;
    }

    .rightPannel{
        height:100%; 
        display: flex;
    }
</style>
</main>