import {noteStore} from '../services/noteStore'

export class NoteController {

    async showNotes (req, res) {
        res.render("showNotes", {
            layout: 'layout',
            title: 'NoteApp',
            theme: req.styleSwitcher.style,
            changeTheme: '/otherTheme',
            notes: await noteStore.allDynamic2(req.mySettings.sortBy, req.mySettings.orderDirection, req.mySettings.showOnlyDoneNotes)
        });
    };

    async createNote(req, res) {
        res.render("newNote", {
            layout: 'layout',
            title: 'Neues Todo',
            theme: req.styleSwitcher.style
        });
    };

    async createNoteSucceded(req, res) {
        await  noteStore.add(req.body.noteTitle, req.body.description, req.body.priority, req.body.dueDate, req.body.state);
        res.redirect("/");
    };

    async editNote(req, res) {
        await res.render("editNote", {
            layout: 'layout',
            title: "Edit Todo",
            theme: req.styleSwitcher.style,
            note: await noteStore.get(req.params.id)
        });
    }

    async changeNote(req, res) {
        await noteStore.updateNote(req.body.id, req.body.noteTitle, req.body.description, req.body.priority, req.body.dueDate, req.body.state);
        res.redirect("/");
    };

    changeTheme(req, res) {
        if(req.styleSwitcher.style === 'style') {
            req.styleSwitcher.style = 'purple';
        } else {
            req.styleSwitcher.style = 'style';
        }
        res.redirect('/');
    };
}

export const noteController = new NoteController();

