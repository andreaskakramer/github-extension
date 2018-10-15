const kInlineCommentClass = "review-comment";
const kInlineCommentSelector = `#files tr.inline-comments .js-comments-holder > .${kInlineCommentClass}`;
const kGlobalCommentClass = "timeline-comment";
const kGlobalCommentSelector = `#comments .${kGlobalCommentClass}`;
const kCommentFocusedClass = "focused-by-extension";
const kLikeButtonSelector = "button[data-reaction-label='+1']";
const kGlobalReplySelector = "#all_commit_comments .timeline-new-comment button.write-tab";
const kInlineReplySelector = ".review-thread-reply-button";

function query(selector) {
    return document.querySelectorAll(selector);
}

function getAll() {
    return query(`${kInlineCommentSelector},${kGlobalCommentSelector}`);
}

function getFocused() {
    return query(`.${kCommentFocusedClass}`);
}

function getFocusedIndex(elems) {
    for (var i = 0; i < elems.length; i++) {
        if (elems[i].classList.contains(kCommentFocusedClass)) {
            return i;
        }
    }
    return -1;
}

function focusNext() {
    const all = getAll();
    if (!all) {
        return;
    }
    const focusedIndex = getFocusedIndex(all);
    if (focusedIndex < all.length - 1) {
        focus(all[focusedIndex + 1]);
    }
}

function focusPrevious() {
    const all = getAll();
    if (!all) {
        return;
    }
    const focusedIndex = getFocusedIndex(all);
    if (focusedIndex > 0) {
        focus(all[focusedIndex - 1]);
    } else {
        focus(all[0]);
    }
}

function toggleLike() {
    query(`.${kCommentFocusedClass} ${kLikeButtonSelector}`)
        .forEach(comment => comment.click());
}

function startReply() {
    const focused = getFocused();
    if (!focused.length) {
        return;
    }
    const comment = focused[0];
    if (comment.classList.contains(kInlineCommentClass)) {
        comment.parentElement.parentElement.querySelector(kInlineReplySelector).click();
    } else {
        document.querySelector(kGlobalReplySelector).click();
    }
}

function focus(elem) {
    getFocused().forEach(
        comment => comment.classList.remove(kCommentFocusedClass));
    elem.classList.add(kCommentFocusedClass);
    elem.scrollIntoViewIfNeeded();
}

window.addEventListener("keydown", function(e) {
    if (e.altKey || e.shiftKey || e.ctrlKey || e.metaKey ||
        e.target.nodeName == "TEXTAREA") {
        return;
    }
    switch (e.key) {
        case "j":
            focusNext();
            break;
        case "k":
            focusPrevious();
            break;
        case "l":
            toggleLike();
            break;
        case "r":
            startReply();
            e.preventDefault();
            break;
    }
});
