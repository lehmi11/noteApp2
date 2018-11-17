import express from 'express';
const router = express.Router();
import {noteController} from '../controller/noteController.mjs';

router.get("/", noteController.showNotes.bind(noteController));
router.get("/createNote", noteController.createNote.bind(noteController));
router.post("/createNote", noteController.createNoteSucceded.bind(noteController));
router.get("/editNote/:id", noteController.editNote.bind(noteController));
router.post("/editNote/:id", noteController.changeNote.bind(noteController));
router.get("/otherTheme", noteController.changeTheme.bind(noteController));

export const noteRoutes = router;