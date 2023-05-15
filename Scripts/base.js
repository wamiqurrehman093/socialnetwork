/* JQuery */

$(document).ready(function () {
    setupLikeButtons();
    setupCommentButtons();
});

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

/* Like Posts */

function setupLikeButtons() {
    var likeButtons = $(".like-post-button");
    for (var i = 0; i < likeButtons.length; i++) {
        likeButtons[i].addEventListener("click", function () {
            var likeButton = $(this);
            var postID = "#" + likeButton.attr("data-post-id");
            var likeLabel = $(postID + " .post-like-reaction p");
            likeLabel.html(processLike(likeButton, likeLabel));
        });
    }
}

function processLike(likeButton, likeLabel) {
    if (likeButton.attr("class") === "like-post-button") {
        likeButton.attr("class", "like-post-button-pressed");
        return parseInt(likeLabel.html()) + 1;
    }
    else {
        likeButton.attr("class", "like-post-button");
        return parseInt(likeLabel.html()) - 1;
    }
}

/* Post Comment Control */

function setupCommentButtons() {
    var openCommentButtons = $(".open-comment-section");
    var posts = $(".post");
    var submit_comment_buttons = $(".submit-comment");

    setupOpenCommentSectionButtons();

    for (var i = 0; i < openCommentButtons.length; i++) {
        var comment_section = posts[i].getElementsByClassName("comment-section")[0];
        submit_comment_buttons[i].addEventListener("click", SubmitComment, false);
        var submit_comment_section = comment_section.getElementsByClassName("submit-comment-section")[0];
        var post_comments = comment_section.getElementsByClassName("post-comments")[0];
        var comment_form = submit_comment_section.getElementsByTagName("form")[0];
        comment_form.addEventListener("submit", SubmitComment, false);
        var submit_comment_button = comment_form.getElementsByClassName("submit-comment")[0];
        submit_comment_button.post_comments = post_comments;
        submit_comment_button.comment_form = comment_form;
        
        var media_file_button = comment_form.getElementsByClassName("media-file")[0];
        media_file_button.addEventListener("change", (event) => {
            const [file] = event.target.files;
            const {name: fileName, size} = file;
            const fileSize = (size / 1000).toFixed(2);
            const fileNameAndSize = `${fileName} - ${fileSize}KB`;
            event.target.nextElementSibling.innerText = fileNameAndSize;
        });
    }
}

function setupOpenCommentSectionButtons() {
    var openCommentButtons = $(".open-comment-section");
    for (var i = 0; i < openCommentButtons.length; i++) {
        openCommentButtons[i].addEventListener("click", function () {
            var postID = "#" + $(this).attr("data-post-id");
            var commentSection = $(postID + " .comment-section");
            commentSection.toggle();
        });
    }
}


function SubmitComment(event) {
    event.preventDefault();
    var comment_form = event.target.comment_form;
    var comment_text = comment_form.querySelector(".submit-comment-text");
    var media_file = comment_form.getElementsByClassName("media-file")[0];
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
    var currentDate = new Date();
    var dateString = (
        (currentDate.getHours() > 12) ? (currentDate.getHours() - 12) : 
        (currentDate.getHours())) + ":" + currentDate.getMinutes() + " " + 
        ((currentDate.getHours > 12) ? ('PM') : ('AM')) + ", " + 
        currentDate.getDate() + " " + months[currentDate.getMonth()] + 
        " " + currentDate.getFullYear();
    var data = {
        author: {name: "Naruto Uzumaki", image: "Naruto1.jpg"},
        comment: {date: dateString, text:comment_text.value, image: fileName}
    };
    var template = Handlebars.compile(document.querySelector(template_id).innerHTML);
    var filled = template(data);
    event.target.post_comments.insertAdjacentHTML("beforeend", filled);
    media_file.value = "";
    comment_text.value = "";
    comment_form.querySelector(".media-file-label").innerText = "Upload Media";
}