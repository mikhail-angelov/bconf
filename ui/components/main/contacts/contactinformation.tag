<contact-information>
    <div if={!opts.contact} class="row">
        select contact
    </div>
    <div if={opts.contact} class="row">
        {opts.contact.name}
    </div>
</contact-information>