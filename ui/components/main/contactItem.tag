<contact-item>
<div class='contact-item'>
<div class="account-foto">
    <a class="friend_photo" href="#">
        <img class="account_photo_img" src={this.opts.item.photo}>
    </a>
</div>

<div class="account-name">{this.opts.item.name}</br>
    {this.opts.item.info}</div>

</div>
<style>
    .contact-item {
    display: flex;
    flex-flow: row nowrap;
    padding: 5 15;
    flex-basis: 100%;
    border-top: 1px solid #e7e8ec;
    }
    .account-foto {
        margin: 0 10;
        width: 80;
        height: 80;
        float: left;
        margin-left: 5%;

    }
    .account_photo_img {
    width: 80;
    height: 80;
    border-radius: 50%;
    }
    .account-name {
    display: flex;
    flex-flow: row wrap;
    flex-basis: 100%;
    justify-content: flex-start;
    align-items: center;
    }
</style>    
</contact-item>