<chat-item>
<div class='chat-item {chat-item-selected: opts.contact.selected}' onclick={opts.setactive}>
    <div class="chat-item-avatar">
        <div class='tag {tag_hide: (opts.active || opts.chat.unread==0)}'>{opts.chat.unread}</div>
        <img class="chat-item-photo" if={opts.chat.contact.photo} src={opts.chat.contact.photo}>
        <div class="chat-item-initials" if={!opts.chat.contact.photo}>{opts.chat.contact.initials}</div>
    </div>

    <div class="chat-item-description">
        <div class="chat-item-name">{opts.chat.contact.name}</div>
        <div class="chat-item-sub">{opts.chat.contact.sub}</div>
        <div class="chat-item-sub">last message</div>
    </div>
</div>
<style>
    .chat-item {
        display: flex;
        border-top: 1px solid #e7e8ec;
    }
    .chat-item:hover {
        cursor: pointer;
        background: #e9eaec;
    }
    .chat-item-selected {
        background: lavender;
    }
    .chat-item-name-photo{
        width: 32px;
        height: 32px;
        border-radius: 50%;
        float: left;
        margin: 0 10;
    }
    .chat-item-avatar{
        position: relative;
        background-color: cornflowerblue;
        border-radius: 50%;
        height: 32px;
        width: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px;
    }
    .chat-item-description{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .chat-item-name {
        font-weight: 800;
        font-size: 16px;
        overflow: hidden;
    }
    .chat-item-sub{
        font-size: 13px;
        font-style: italic;
        overflow: hidden;
    }
    .tag{
        position: absolute;
        top: -6px;
        right: -12px;
        z-index: 2;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: pink;
    }
    .tag_hide {
        display: none;
    }
</style>
</chat-item>