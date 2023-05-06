var heart_buttons = document.getElementsByClassName("heart-post");

for (var i = 0; i < heart_buttons.length; i++) {
    heart_buttons[i].addEventListener("click", function () {
        if (this.className === "heart-post-pressed")
            this.className = "heart-post";
        else
            this.className = "heart-post-pressed";
    })
}