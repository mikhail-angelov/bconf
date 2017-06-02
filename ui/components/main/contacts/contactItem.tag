<contact-item>
<div class='contact-item {contact-item-selected: opts.contact.selected}' onclick={opts.select_contact_item}>
    <div class="contact-item-avatar">
        <img class="contact-item-photo" if={opts.contact.photo} src={opts.contact.photo}>
        <div class="contact-item-initials" if={!opts.contact.photo}>{opts.contact.initials}</div>
    </div>

    <div class="contact-item-description">
        <div class="contact-item-name">{opts.contact.name}</div>
        <div class="contact-item-sub">{opts.contact.sub}</div>
    </div>
</div>
<style>
    .contact-item {
        display: flex;
        border-top: 1px solid #e7e8ec;
    }
    .contact-item:hover {
        cursor: pointer;
        background: #e9eaec;
    }
    .contact-item-selected {
        background: lavender;
    }
    .contact-item-name-photo{
        width: 32px;
        height: 32px;
        border-radius: 50%;
        float: left;
        margin: 0 10;
    }
    .contact-item-avatar{
        background-color: cornflowerblue;
        border-radius: 50%;
        height: 32px;
        width: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px;
    }
    .contact-item-description{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .contact-item-name {
        font-weight: 800;
        font-size: 16px;
        overflow: hidden;
    }
    .contact-item-sub{
        font-size: 13px;
        font-style: italic;
        overflow: hidden;
    }

</style>    
</contact-item>