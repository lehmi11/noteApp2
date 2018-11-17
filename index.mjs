import express from 'express';
import bodyParser from 'body-parser';
import hbs from 'express-hbs';
import path from 'path';
import {noteRoutes} from './routes/noteRoutes';
import {registerHelpers} from './utils/handlebar-util'
import session from 'express-session';
import styleSwitcher from './utils/style-switcher';
import cookie from 'cookie-parser';
import utils from './utils/priority-helper';
import sessionUserSettings from './utils/userSettings';


const app = express();
app.engine('hbs', hbs.express4());
app.set('view engine', 'hbs');
app.set('views', path.resolve('views'));
registerHelpers(hbs);
hbs.registerHelper('times', utils);

app.use(session({secret: '1234567', resave: false, saveUninitialized: true}));
app.use(styleSwitcher);
app.use(sessionUserSettings);
app.use(cookie());
app.use(bodyParser.urlencoded({extended: false}));
app.use(noteRoutes);
app.use(express.static(path.resolve('public')));

const hostname = '127.0.0.1';
const port = 3001;
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});