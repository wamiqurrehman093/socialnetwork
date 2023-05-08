/* Post Heart Control */

var heart_buttons = document.getElementsByClassName("heart-post");

for (var i = 0; i < heart_buttons.length; i++) {
    heart_buttons[i].addEventListener("click", function (event) {
        if (this.className === "heart-post-pressed")
            unheart_post(this);
        else
            heart_post(this);
    });
}

function heart_post(heart_button) {
    heart_button.className = "heart-post-pressed";
    heart_button.nextElementSibling.innerText = parseInt(heart_button.nextElementSibling.innerText) + 1;
}

function unheart_post(heart_button) {
    heart_button.className = "heart-post";
    heart_button.nextElementSibling.innerText = parseInt(heart_button.nextElementSibling.innerText) - 1;
}

/* Post Comment Control */

var comment_buttons = document.getElementsByClassName("open-comment-section");
var posts = document.getElementsByClassName("post");

for (var i = 0; i < comment_buttons.length; i++) {
    comment_buttons[i].addEventListener("click", OpenCommentSectionButton, false);
    comment_buttons[i].comment_section = posts[i].getElementsByClassName("comment-section")[i];
}

function OpenCommentSectionButton(event) {
    var comment_section = event.currentTarget.comment_section;
    if (comment_section.style.display === "grid")
        comment_section.style.display = "none";
    else
        comment_section.style.display = "grid";
}