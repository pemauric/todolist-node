const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const port = 3000

const conn = require('./db/conn');

const Task = require('./models/Task');

const taskRoutes = require('./routes/tasks.routes');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
//app.set('views', path.join(__dirname, 'views'));


app.use(express.static('public'))
app.use(express.urlencoded ({ 
        extended: true
    })
)

app.use(express.json());

app.use('/', taskRoutes);


/* 
app.listen(port, (err) => {
    if (err) {
        console.error('Erro ao iniciar o servidor:', err);
    } else {
        console.log(`Servidor rodando na porta ${port}`);
    }
}); */

conn
.sync({force: true})
//.sync()
.then( () => {
    app.listen(3000, () => {
        console.log(`Server listening on port ${port}`);
        console.log("Shut down server press CTRL+C");
    });
})
.catch((err) => console.log(err))

