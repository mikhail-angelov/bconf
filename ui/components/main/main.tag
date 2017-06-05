import './contacts/contacts.tag'
import './contacts/contactInformation.tag'
import './chats/chatlist.tag'
import './chats/chat.tag'
import './settings/settingsMenu.tag'
import './settings/settings.tag'
import './mtabs.tag'

import _ from 'lodash'

<main>
    <div class='row' style='width: 100%;'>
        <div class='col-xs-2 leftPannel'>
            <div style='flex:1'>
                <contacts if={isContactsState()} contacts={contacts.filtered} select_contact={selectContact} />
                <chatlist if={isChatsState()} chats={chats.list} setActiveChat={setActiveChat}/>
                <settings-menu if={isSettingsState()} vm={settingsMenuVm}/>
            </div>
            <mtabs changeTab={changeTab} activeTab={state.sub}/>
        </div>

        <div class='col-xs-10' class='rightPannel'>
            <contact-information if={isContactsState()} contact={contacts.selected} />
            <chat if={isChatsState()} store={store} action={action}/>
            <settings if={isSettingsState()} info={'not implemented yet'} />
        </div>
    </div>

<script>
        
const store = this.opts.store
const action = this.opts.action

const openSocketAction = action.openWS('echo.websocket.org')
store.dispatch(openSocketAction);

const contactList = action.setContactList()
store.dispatch(contactList);

store.dispatch(action.ensureUserInfo());

this.getState = ()=>{
    this.contacts = store.getState().contacts;
    this.chats = store.getState().chats;
    this.state = store.getState().uiState;
    this.auth = store.getState().auth;
}

store.subscribe(()=>{
    this.getState()
    this.update()
    console.log('===', store.getState())
})
this.getState()

this.settingsMenuVm ={
    getHostInfo: ()=>{console.log('getHostInfo')},
    getUserInfo: ()=>{console.log('getUserInfo')}
}

const initChats = action.initChats(this.auth)
store.dispatch(initChats)

this.isContactsState = ()=>this.state.sub === action.uiState.left.CONTACTS;
this.isChatsState = ()=>this.state.sub === action.uiState.left.CHATS;
this.isSettingsState = ()=>this.state.sub === action.uiState.left.SETTINGS;

this.changeTab = newState =>{
    store.dispatch(action.subState(newState))
}

this.setActiveChat = (chatId)=>{
    store.dispatch(action.setActiveChat(chatId));
    this.update();
}
this.startChat = (contact)=>{
    const newStateAction = action.newState({sub:action.uiState.sub.CHATS, main:action.uiState.main.MAIN});
    store.dispatch(newStateAction);
    store.dispatch(action.startChat(contact));
    this.setActiveChat(contact.userId)
}

this.onLogout = ()=>{
    this.user = null
    store.dispatch(action.logout(this.user))
    console.log('logout')
}

this.addContact = ()=>{
    const addContactAction = action.addContact({
                userId: 'test' + Math.floor((Math.random() * 100) + 1),
                firstName: 'name' + Math.floor((Math.random() * 100) + 1),
                secondName: 'secondname',
                info: 'some information about this contact',
                status: 'I`m cool',
                country: 'USA',
                city: 'California',
                phoneNumber: '123456789'
            });
    store.dispatch(addContactAction);
}

this.removeContact = (contactId)=>{
    store.dispatch(action.removeContact(contactId))
    console.log('contact removed')
}

this.searchContact = (searchText)=>{
    store.dispatch(action.searchContact(searchText))
    this.update()
}

this.contactSelect = false;

this.selectContact = (contact)=>{
    store.dispatch(action.selectContact(contact))
}

this.onLogout = ()=>{
    store.dispatch(action.logout());
}

this.sendMessage = (value)=>{
        if (value) {
            const addMessage = action.addMessage({
                id:'any',
                userId:'test',
                text: value,
                type:'out',
                from: 'me',
                date: new Date()
            })
            store.dispatch(addMessage)

            const echo = action.sendMessage({
                username:'test',
                message: value
            });
            store.dispatch(echo)

        }
}

this.searchMessage = (text)=> {
    store.dispatch(action.searchMessage(text));
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