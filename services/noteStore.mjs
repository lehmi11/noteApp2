import datastore from 'nedb-promise'

export class Note {
    constructor(noteTitle, description, priority, dueDate, state) {
        this.noteTitle = noteTitle;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
        this.state = state;
        this.createDate = new Date();
      // this.state = state ? state: false;
    }
}

export class NoteStore {
    constructor(db) {
        this.db = db || new datastore({filename: './data/notes.db', autoload: true});
    }

    async add(noteTitle, description, priority, dueDate, state) {
        let note = new Note(noteTitle, description, priority, dueDate, state);
        return await this.db.insert(note);
    }

    async updateNote(id, noteTitle, description, priority, dueDate, state) {
        await this.db.update({_id: id}, {$set: {"noteTitle": noteTitle, "description": description, "priority": priority, "dueDate": dueDate, "state": state}});
    }

    async get(id){
        return await this.db.findOne({_id: id});
    }

    async all() {
        return await this.db.find({});
    }

    async allNotDoneNotes() {
        return await this.db.cfind({  state: {$exists: false} });
    }


     async allDynamic2(sortAlg, order, showOnlyDoneNotes) {
         console.log("SortBy: " + sortAlg + " / " + "OrderBy: " + order + " / " + "showOnlyDoneNotes: " + showOnlyDoneNotes) ; // Troubleshooting
        if (showOnlyDoneNotes == "true") {
            console.log("Show only Done Notes")
            return await this.db.cfind({state:{$exists: false}}).sort({[sortAlg]: + order}).exec();
        } else {
            console.log("Show all Notes");
            return await this.db.cfind({}).sort({[sortAlg]: + order}).exec();

        }

     }

     async allDynamic(sortAlg, order) {
         // console.log("SortBy: " + sortAlg + " / " + "OrderBy: " + order) ; // Troubleshooting
         switch(sortAlg) {
             case "priority":
                 return await this.db.cfind({}).sort({priority: order }).exec();
                 break;
             case "createDate":
                 return await this.db.cfind({}).sort({createDate: order }).exec();
                 break;
             case "dueDate":
                 return await this.db.cfind({}).sort({dueDate: order }).exec();
                 break;
             default:
                 return await this.db.cfind({_id: -1}).exec();
         }

     }

     async orderByTitle() {
         return await this.db.cfind({}).sort({_id : 1}).exec();
     }

}

export const noteStore = new NoteStore();