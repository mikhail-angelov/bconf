<contact-item onclick={chatStarted} >
<div class='contact-item {selected: this.selected}'>
<div class="account-foto">
    <a class="friend_photo" href="#">
        <img class="account_photo_img" src={this.opts.contact.photo}>
    </a>
</div>

<div class="account-name">{this.opts.contact.firstName}</br>
    {this.opts.contact.status}</div>

    <div class="removecontact">
        <i class="material-icons" onclick={()=>this.opts.remove_contact_item(this.opts.contact.userId)}>delete forever</i>
    </div>

</div>
<script>
    this.setActiveChat = ()=> {
        console.log('setactivechat')
        const active = this.opts.contact.userId;
        this.opts.set_active(active);
    }

    this.chatStarted = ()=>{
        //- this.opts.chatwith(this.opts.contact);
        this.opts.account_information(this.opts.contact);
    }

    this.selectAccount = ()=>{
        this.opts.account_information(this.opts.contact);
    }

</script>
<style>
    .contact-item {
        display: flex;
        flex-flow: row nowrap;
        border-top: 1px solid #e7e8ec;
    }
    .contact-item:hover {
        cursor: pointer;
        background: #e9eaec;
    }
    
    .account_photo_img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        float: left;
        margin: 0 10;
    }
    .account-name {
        display: flex;
        flex-flow: row wrap;
        flex-basis: 100%;
        justify-content: flex-start;
        align-items: center;
    }
    .removecontact {
        float: right;
        width: 30;
        padding: 28px 0px;
    }
</style>    
</contact-item>