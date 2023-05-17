$(document).ready(function () {
    setupPostSubmission();
    setupRecentPosts();
});

function setupPostSubmission(){
    setupPostMediaFileButton();
    setupSubmitPostButton();
}

function setupPostMediaFileButton() {
    var mediaFileButton = $(".post-media-file-button")[0];
    mediaFileButton.addEventListener("change", function (event) {
        var mediaFileButton = $(this);
        const [file] = mediaFileButton[0].files;
        const { name: fileName, size } = file;
        const fileSize = (size / 1000).toFixed(2);
        const fileNameAndSize = `${fileName} - ${fileSize}KB`;
        $(".post-media-file-label p").html(fileNameAndSize);
    });
}

function setupSubmitPostButton(){
    var submitPostButton = $(".submit-post-button")[0];
    submitPostButton.addEventListener("click", function (event) {
        event.preventDefault();

        var postText = $(".submit-post-text")[0];
        var mediaFile = $(".post-media-file-button")[0];
        if (postText.value === "" && mediaFile.files.length === 0)
            return console.log("Empty form!");
        var fileName = "";
        var templateId = "#post-template";
        if (mediaFile.files.length > 0) {
            templateId = "#image-post-template";
            var [file] = mediaFile.files;
            fileName = file.name;
        }
        var dateString = getDateString();
        var postNumber = $("#recent-posts .post").length;
        console.log($("#recent-posts .post").length);
        var data = {
            author: {name: "Naruto Uzumaki", image: "Naruto1.jpg"},
            post: {
                date: dateString, text: postText.value, image: fileName, number: postNumber + 1,
                numberOfLikes: 0, numberOfComments: 0, numberOfShares: 0
            }
        };
        var template = Handlebars.compile($(templateId).html());
        var filled = template(data);
        $("#recent-posts")[0].insertAdjacentHTML("beforeend", filled);
        mediaFile.value = "";
        postText.value = "";
        $(".post-media-file-label p").html("Upload Media");
        
        setupPostControls(postNumber);
        console.log(postNumber);
    });
}

function setupRecentPosts(){
    for (var i = 0; i < $("#recent-posts .post").length; i++)
        setupPostControls(i);
}

function setupPostControls(postIndex){
    setupLikeButton(postIndex);
    setupOpenCommentSectionButton(postIndex);
    setupSubmitCommentButton(postIndex);
    setupCommentMediaFileButton(postIndex);
}

function setupLikeButton(buttonIndex){
    $(".like-post-button")[buttonIndex].addEventListener("click", function () {
        var likeButton = $(this);
        var postID = "#" + likeButton.attr("data-post-id");
        var likeLabel = $(postID + " .post-like-reaction p");
        likeLabel.html(processLike(likeButton, likeLabel));
    });
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

function setupOpenCommentSectionButton(buttonIndex){
    $(".open-comment-section")[buttonIndex].addEventListener("click", function () {
        var postID = "#" + $(this).attr("data-post-id");
        var commentSection = $(postID + " .comment-section");
        commentSection.toggle();
    });
}

function setupCommentMediaFileButton(buttonIndex) {
    $(".comment-media-file-button")[buttonIndex].addEventListener("change", function (event) {
        var mediaFileButton = $(this);
        var postID = "#" + mediaFileButton.attr("data-post-id");
        const [file] = mediaFileButton[0].files;
        const { name: fileName, size } = file;
        const fileSize = (size / 1000).toFixed(2);
        const fileNameAndSize = `${fileName} - ${fileSize}KB`;
        $(postID + " .comment-media-file-label p").html(fileNameAndSize);
    });
}

function setupSubmitCommentButton(buttonIndex){
    $(".submit-comment-button")[buttonIndex].addEventListener("click", function (event) {
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

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function getDateString() {
    var currentDate = new Date();
    return ((currentDate.getHours() > 12) ? (currentDate.getHours() - 12) :
            (currentDate.getHours())) + ":" + currentDate.getMinutes() + " " +
            ((currentDate.getHours > 12) ? ('PM') : ('AM')) + ", " +
            currentDate.getDate() + " " + months[currentDate.getMonth()] +
            " " + currentDate.getFullYear();
}