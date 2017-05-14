const kInlineCommentSelector = "#files tr.inline-comments";
const kGlobalCommentSelector = "#comments .timeline-comment";
const kCommentFocusedClass = "focused-by-extension";

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
    if (e.key == "j") {
        focusNext();
    }
    if (e.key == "k") {
        focusPrevious();
    }
});
