import app from "./app.js";
import { APP_NAME } from "./config.js";
import { PORT } from "./config.js";
import { CASE_SENSITIVE_ROUTING } from "./config.js";

app.set('appName', APP_NAME);
app.set('port', PORT);
app.set('case sensitive routing', CASE_SENSITIVE_ROUTING);

app.listen(app.get('port'));
console.log(`Server ${app.get('appName')} running on port ${app.get('port')}`);