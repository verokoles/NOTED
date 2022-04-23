//$ using jquery in variables

// name functions for recording and saving notes
const $saveNoteBtn = $(".save-note");
const $newNoteBtn = $(".new-note");
const $noteTitle = $(".note-title");
const $noteDesc = $(".note-textarea");

// var to render the list of notes
const $noteList = $(".list-container .list-group");

// startnote acts as keeping track of what you type as a note
const activeNote = {};

// get all the notes 
//check paths and requests in insomnia
const getNotes = () => {
    return $.ajax({
        url: "/api/notes",
        method: "GET",
    });
};

//saving a note *note
const saveNote = (note) => {
    return $.ajax({
        url: "/api/notes",
        data: note,
        method: "POST",
    });
};

//delete a note? *id
const deleteNote = (id) => {
    return $.ajax({
        url: "api/notes" + id,
        method: "DELETE",
    });
};
//display notes or show empty inputs
const renderActiveNote = () => {
    $saveNoteBtn.hide();
    if(activeNote.id) {
// .attr sets atributes of note title/desc
$noteTitle.attr("readonly", true);
$noteDesc.attr("readonly", true);
//returns new title and text of note
//.val gets the values of the inputs title+desc
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
    saveNote(newNote)
    .then(() => {
        getAndShowNotes();
        renderActiveNote();
    });
};
// activeNote shown
const showActiveNote = function() {
    activeNote = $(this).data();
    renderActiveNote();
    };
    
    // activeNote empties and user can type in a new line
    const viewNewNote = function() {
        activeNote = {};
        renderActiveNote();
    };


//DELETE NOTE!!
const handleDeleteNote = function (event) {
    event.stopPropagation();
// this function jqueries the parent class from html
    const note = $(this).parent(".list-group-item").data();
    if (activeNote.id === note.id) {
        activeNote = {};
      }
    
      deleteNote(note.id).then(() => {
        getAndShowNotes();
        renderActiveNote();
      });
    };

const handleRenderSaveBtn = function () {
    //if theres no note desc or title hide SAVE btn, otherwise make SAVE btn visible
    if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
      $saveNoteBtn.hide();
    } else { $saveNoteBtn.show();
    }
    };

//show list of titles of the notes recorded
const renderNotes = (notes) => {
    $noteList.empty();
    const noteListItems = [];
// creates a list item with delete button
    const create$li = (text, withDeleteBtn = true) => {
        const $li = $("<li class='list-group-item'>");
        const $span = $("<span>").text(text);
        $li.append($span);

// pulls html list section to append to the delte button
        if(withDeleteBtn) { const $deleteBtn = $(
            "<i class='fas fa-trash-alt text-danger float-right delete-note'>");
          $li.append($deleteBtn);
        }
        return $li;
      };
      if (notes.length === 0) {
          noteListItems.push(create$li("Empty note list", false));
      }
      //push new note to list
      notes.forEach((note) => {
          const $li = create$li(note.title).data(note);
          noteListItems.push($li);
      });
      $noteList.append(noteListItems);
    };


//show notes and add to list on the left
const getAndShowNotes = () => {
    return getNotes().then(renderNotes); };
    //query button functions to show notes 
    $saveNoteBtn.on("click", handleNote);
    $noteList.on("click", ".list-group-item", showActiveNote);
    $newNoteBtn.on("click", viewNewNote);
    $noteList.on("click", ".delete-note", handleDeleteNote);
    $noteTitle.on("keyup", handleRenderSaveBtn);
    $noteDesc.on("keyup", handleRenderSaveBtn);


//call to show final list of notes/tasks

getAndShowNotes();