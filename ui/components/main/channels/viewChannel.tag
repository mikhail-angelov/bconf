<view-channel>
    <div class='row'> 
        <div>Name: {opts.channel.name}</div>
    </div>
    <div class='row'>
        <img width='100px' height='100px'>
    </div>
    <div class='row'> 
        <div>{opts.channel.public?'Public':'private'} channel</div>
    </div>
    <div class='row'> 
        <div>Invitation link: {opts.channel.link}</div>
    </div>
    <div class='row'> 
        <div>Description: {opts.channel.description}</div>
    </div>
    
<style>
    view-channel{
        display:flex;
        height: 100%;
        flex-direction: column;
    }
    view-channel .row{
        margin: 5px;
        padding-left: 10px;
        padding-bottom: 7px;
        align-items: center;
        border-bottom: 1px solid gainsboro;
    }
    view-channel material-button{
        margin-right: 5px;
    }
    view-channel img{
        margin-right: 5px;
    }
        
</style>
</view-channel>