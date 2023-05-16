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
    setupOpenCommentSectionButtons();
    setupMediaFileButtons();
    setupSubmitCommentButtons();
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

function setupMediaFileButtons(){
    var mediaFileButtons = $(".comment-media-file-button");
    for (var i = 0; i < mediaFileButtons.length; i++) {
        var mediaFileButton = mediaFileButtons[i];
        mediaFileButton.addEventListener("change", function (event) {
            var mediaFileButton = $(this);
            var postID = "#" + mediaFileButton.attr("data-post-id");
            const [file] = mediaFileButton[0].files;
            const { name: fileName, size } = file;
            const fileSize = (size / 1000).toFixed(2);
            const fileNameAndSize = `${fileName} - ${fileSize}KB`;
            $(postID + " .comment-media-file-label p").html(fileNameAndSize);
        });
    }
}

function setupSubmitCommentButtons(){
    var submitCommentButtons = $(".submit-comment-button");
    for (var i = 0; i < submitCommentButtons.length; i++){
        submitCommentButtons[i].addEventListener("click", function (event) {
            event.preventDefault();

            var submitCommentButton = $(this);
            var postID = "#" + submitCommentButton.attr("data-post-id");

            var comment_text = $(postID + " .submit-comment-text")[0];
            var media_file = $(postID + " .comment-media-file-button")[0];
            if (comment_text.value === "" && media_file.files.length === 0)
                return console.log("Empty form!");
            var fileName = "";
            var template_id = "#comment-template";
            if (media_file.files.length > 0) {
                template_id = "#image-comment-template";
                var [file] = media_file.files;
                fileName = file.name;
            }
            var dateString = getDateString();
            var data = {
                author: { name: "Naruto Uzumaki", image: "Naruto1.jpg" },
                comment: { date: dateString, text: comment_text.value, image: fileName }
            };
            var template = Handlebars.compile($(template_id).html());
            var filled = template(data);
            $(postID + " .post-comments")[0].insertAdjacentHTML("beforeend", filled);
            media_file.value = "";
            comment_text.value = "";
            $(postID + " .comment-media-file-label p").html("Upload Media");
        });
    }
}

function getDateString() {
    var currentDate = new Date();
    return ((currentDate.getHours() > 12) ? (currentDate.getHours() - 12) :
            (currentDate.getHours())) + ":" + currentDate.getMinutes() + " " +
            ((currentDate.getHours > 12) ? ('PM') : ('AM')) + ", " +
            currentDate.getDate() + " " + months[currentDate.getMonth()] +
            " " + currentDate.getFullYear();
}