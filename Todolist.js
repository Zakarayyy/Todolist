const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const todolist = 'Todolist.txt';
let numTask = 1;

function todo() {
    rl.question('Souhaitez vous ajouter (a), supprimer (s), consulter (c) ou quitter (q) la To Do list ?  ', (reponse) => {
        if (reponse === 'a') {
            rl.question('Quelle est la tâche à ajouter? ', (task) => {
                fs.appendFile(todolist, numTask +' - '+ ' ' + task + '\n', (err) => {
                    if (err) throw err; // Voir commentaire tout en bas
                    console.log('Tâche ajoutée avec succès!');
                    todo();
                });
                numTask++;
            });
        } else if (reponse === 'c') {
            fs.readFile(todolist, 'utf8', (err, data) => {
                if (err) throw err; // Voir commentaire tout en bas
                console.log(data);
                todo();
            });
        } else if (reponse === 'q') {
            console.log('Au revoir!');
            rl.close();
        } else if (reponse === 's') {
            rl.question('Quelle est la tâche a supprimer? ', (rank) => {
                fs.readFile(todolist, 'utf8', (err, data) => {
                    // Voir commentaire tout en bas 
                    if (err) throw err; // Voir commentaire tout en bas
                    let tasks = data.split('\n');
                    let index = tasks.findIndex(task => task.startsWith(rank),' -');
                    if (index !== -1) {
                        tasks.splice(index, 1);
                        fs.writeFile(todolist, tasks.join('\n'), (err) => {
                            if (err) throw err; // Voir commentaire tout en bas
                            console.log('Tâche supprimée avec succès!');
                            todo();
                        });
                    } else {
                        console.log('Tâche non trouvée.');
                        todo();
                    }
                });
            });
        } else {
            console.log('Commande invalide. Veuillez reessayer.');
            todo();
        }
    });
}

todo();


// Suite au retard que j'ai, je me suis aidé d'un ia pour complété certaine partie du code tout en cherchant des explications à ce que l'ia ma fourni
// J'ai compris la majorité du mini projet, mais certains partie (notamment la ou des commentaire on était ajouté) sont encore un peu flou 