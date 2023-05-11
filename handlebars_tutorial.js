function fill_template() {
    var data = {
        title: "Why handlebar is cool",
        list: [
            {name: "You can generate stuff"},
            {name: "It works on both ends"},
            {name: "It weighs like 24 kb"}
        ],
        footer: "This is a footer"
    };
    var template = Handlebars.compile(document.querySelector("#template").innerHTML);
    var filled = template(data);
    document.querySelector("#output").innerHTML = filled;
}