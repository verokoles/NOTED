//$ using jquery in variables

// name functions for recording and saving notes
const $saveNoteBtn = $(".save-note");
const $newNoteBtn = $(".new-note");
const $noteTitle = $(".note-title");
const $noteDesc = $(".note-textarea");

// var to render the list of notes
const $noteList = $("".list-container .list-group");

// startnote acts as keeping track of what you type as a note
const activeNote = {};

// get all the notes 
//check paths and requests in insomnia
const getNotes = () => {
    return $.ajax({
        url: "/api/notes",
        method: "GET",
    });
});

//saving a note *note
const saveNote = (note) => {
    return $.ajax({
        url: "/api/notes",
        data: notEqual,
        method: "POST",
    });
});

//delete a note? *id
const deleteNote = (id) => {
    return $.ajax({
        url: "api/notes" + id,
        method: "DELETE",
    });
});
//display notes or show empty inputs
const renderActiveNote = () => {
    $saveNoteBtn.hide();
    if(activeNote.id) {

$noteTitle.attr("readonly", true);
$noteDesc.attr("readonly", true);
//returns new title and text of note
$noteTitle.val(activeNote.title);
$noteDesc.val(activeNote.text);
    } else {
        $noteTitle.attr("readonly", false);
        $noteDesc.attr("readonly", false);
        // returns empty space
        $noteTitle.val("");
        $noteDesc.val("");
    }
};
// updating the newly created notes from input and saving
const handleNote = function () {
    const newNote = {
        title: $noteTitle.val(),
       text: $noteDesc.val(),
    };
    saveNote(newNote).then(() => {
        getandShowNotes();
        renderActiveNote();
    });
};

//DELETE NOTE!!
const handleNoteDelete = function (event) {
    event.stopPropagation();
// this function jqueries the parent class from html
    const note = $(this).parent(".list-group-item").data();
}
// activeNote shown

// activeNote empties and user can type in a new line

//show list of titles of the notes recorded
//show notes and add to list on the left
//call to show final list of notes/tasks
getandShowNotes();