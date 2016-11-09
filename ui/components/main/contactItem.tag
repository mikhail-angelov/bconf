<contact-item>
<div class='contact-item'>
<div class="account-foto">
    <a class="friend_photo" href="#">
        <img class="account_photo_img" src={this.opts.item.photo}>
    </a>
</div>


<div class="account-name">{this.opts.item.firstName}</br>
    {this.opts.item.info}</div>

    <div class="removecontact">
        <i class="material-icons" onclick={()=>this.opts.removecontactitem(this.opts.item.id)}>delete forever</i>
    </div>

</div>
<style>
    .contact-item {
        display: flex;
        flex-flow: row nowrap;
        padding: 5 15;
        flex-basis: 100%;
        border-top: 1px solid #e7e8ec;
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