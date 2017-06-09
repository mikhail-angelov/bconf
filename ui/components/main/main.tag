import './contacts/contacts.tag'
import './contacts/contactInformation.tag'
import './contacts/contactSearch.tag'
import './contacts/addChannel.tag'
import './chats/chatMenu.tag'
import './chats/chat.tag'
import './settings/settingsMenu.tag'
import './settings/settings.tag'
import './channels/editChannel.tag'
import './channels/viewChannel.tag'
import './mtabs.tag'
import './mainTopMenu.tag'

import _ from 'lodash'

<main>
    <div class='row' style='width: 100%;'>
        <div class='col-xs-2 leftPannel'>
            <div style='flex:1'>
                <contacts if={isContactsTab()} contacts={contacts.filtered} select_contact={selectContact} />
                <chat-menu if={isChatsTab()} chats={chats.list} setActiveChat={setActiveChat}/>
                <settings-menu if={isSettingsTab()} vm={settingsMenuVm}/>
            </div>
            <mtabs changeTab={changeTab} activeTab={state.sub}/>
        </div>

        <div class='col-xs-10 rightPannel'>
            <main-top-menu vm={topMenuVm} />
            <contact-information if={isContactsState()} vm={baseVm} />
            <chat if={isChatsState()} vm={baseVm}/>
            <contact-search if={isContactSearchState()} vm={baseVm} />
            <edit-channel if={isAddChannelState()} vm={addChannelVm} />
            <edit-channel if={isEditChannelState()} vm={editChannelVm()} />
            <view-channel if={isViewChannelState()} vm={viewChannelVm()} />
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

this.updateState = ()=>{
    this.contacts = store.getState().contacts;
    this.chats = store.getState().chats;
    this.state = store.getState().uiState;
    this.auth = store.getState().auth;
}

store.subscribe(()=>{
    this.updateState()
    this.update()
    console.log('===', store.getState())
})
this.updateState()

this.baseVm = {
    store: store,
    action: action
}

this.addChannelVm = {
    channel: {},
    save: channel=>store.dispatch(action.addChannel(channel)),
    cancel: ()=>store.dispatch(action.setContentState(action.ui.MAIN_CONTENT.CHATS))
}
this.editChannelVm = () => ({
    channel: store.getState().channels.selected,
    save: channel=>store.dispatch(action.saveChannel(channel)),
    addContact: (channel, contact)=>store.dispatch(action.addContactToChannel(channel, contact)),
    removeContact: (channel, contact)=>store.dispatch(action.removeContactFromChannel(channel, contact)),
    remove: channelId=>store.dispatch(action.removeChannel(channelId)),
    cancel: ()=>store.dispatch(action.setContentState(action.ui.MAIN_CONTENT.CHATS))
})

this.viewChannelVm = () => ({
    channel: store.getState().channels.selected
})

this.settingsMenuVm ={
    getHostInfo: ()=>{console.log('getHostInfo')},
    getUserInfo: ()=>{console.log('getUserInfo')}
}

this.topMenuVm = {
    search: ()=>store.dispatch(action.setContentState(action.ui.MAIN_CONTENT.CONTACT_SEARCH)),
    addChannel: ()=>store.dispatch(action.setContentState(action.ui.MAIN_CONTENT.ADD_CHANNEL)),
    logout: ()=>store.dispatch(action.logout())
}

const initChats = action.initChats(this.auth)
store.dispatch(initChats)

this.isContactsTab = ()=>this.state.sub === action.ui.MAIN_SUB.CONTACTS;
this.isChatsTab = ()=>this.state.sub === action.ui.MAIN_SUB.CHATS;
this.isSettingsTab = ()=>this.state.sub === action.ui.MAIN_SUB.SETTINGS;
this.isChatsState = ()=>this.state.content === action.ui.MAIN_CONTENT.CHATS;
this.isContactsState = ()=>this.state.content === action.ui.MAIN_CONTENT.CONTACTS;
this.isSettingsState = ()=>this.state.content === action.ui.MAIN_CONTENT.SETTINGS;
this.isContactSearchState = ()=>this.state.content === action.ui.MAIN_CONTENT.CONTACT_SEARCH;
this.isAddChannelState = ()=>this.state.content === action.ui.MAIN_CONTENT.ADD_CHANNEL;
this.isEditChannelState = ()=>this.state.content === action.ui.MAIN_CONTENT.EDIT_CHANNEL;
this.isViewChannelState = ()=>this.state.content === action.ui.MAIN_CONTENT.VIEW_CHANNEL;

this.changeTab = subState =>store.dispatch(action.setSubState(subState))

this.setActiveChat = (chatId)=>{
    store.dispatch(action.setActiveChat(chatId)),
    store.dispatch(action.setContentState(action.ui.MAIN_CONTENT.CHATS))
}



this.selectContact = (contact)=>{
    store.dispatch(action.selectContact(contact)), //todo: create chat
    store.dispatch(action.setContentState(action.ui.MAIN_CONTENT.CHATS))
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
        height: 100%;
        display: flex;
        flex-direction: column;
    }
</style>
</main>