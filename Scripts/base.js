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
var submit_comment_buttons = document.getElementsByClassName("submit-comment");

for (var i = 0; i < comment_buttons.length; i++) {
    comment_buttons[i].addEventListener("click", OpenCommentSectionButton, false);
    var comment_section = posts[i].getElementsByClassName("comment-section")[i];
    comment_buttons[i].comment_section = comment_section;
    submit_comment_buttons[i].addEventListener("click", SubmitComment, false);
    var submit_comment_section = comment_section.getElementsByClassName("submit-comment-section")[0];
    var post_comments = comment_section.getElementsByClassName("post-comments")[0];
    var comment_form = submit_comment_section.getElementsByTagName("form")[0];
    comment_form.addEventListener("submit", SubmitComment, false);
    var submit_comment_button = comment_form.getElementsByClassName("submit-comment")[0];
    submit_comment_button.post_comments = post_comments;
    submit_comment_button.comment_form = comment_form;
    var media_file_button = comment_form.querySelector("#media-file");
    media_file_button.addEventListener("change", (event) => {
        const [file] = event.target.files;
        const {name: fileName, size} = file;
        const fileSize = (size / 1000).toFixed(2);
        const fileNameAndSize = `${fileName} - ${fileSize}KB`;
        event.target.nextElementSibling.innerText = fileNameAndSize;
    });
}

function OpenCommentSectionButton(event) {
    var comment_section = event.currentTarget.comment_section;
    if (comment_section.style.display === "grid")
        comment_section.style.display = "none";
    else
        comment_section.style.display = "grid";
}

function SubmitComment(event) {
    event.preventDefault();
    var comment_form = event.target.comment_form;
    var comment_text = comment_form.querySelector(".submit-comment-text");
    var media_file = comment_form.querySelector("#media-file");
    if (comment_text.value === "" && media_file.files.length === 0) {
        return console.log("Empty form!");
    }
    var fileName = "";
    var template_id = "#comment-template";
    if (media_file.files.length > 0) {
        template_id = "#image-comment-template";
        var [file] = media_file.files;
        fileName = file.name;
    }
    var data = {
        author: {name: "Naruto Uzumaki", image: "Naruto1.jpg"},
        comment: {date: "12:08 PM, 10 May 2023", text:comment_text.value, image: fileName}
    };
    var template = Handlebars.compile(document.querySelector(template_id).innerHTML);
    var filled = template(data);
    event.target.post_comments.insertAdjacentHTML("beforeend", filled);
    media_file.value = "";
    comment_text.value = "";
    comment_form.querySelector(".media-file-label").innerText = "Upload Media";
}