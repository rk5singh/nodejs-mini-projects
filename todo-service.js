import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const todos = [];

const showMenu = () => {
    console.log(`\n1: Add a task`);
    console.log(`2: View tasks`);
    console.log(`3: Delete task`);
    console.log(`4: Exit`);

    rl.question(`Choose an option`, handleInput);
};

const handleInput = (option) => {
    if(option == 1) {
        rl.question("Enter the Task:", (task) => {
            todos.push(task);
            console.log(`Task added: ${task}`);
            showMenu();
        })
    } else if(option == 2) {
        console.log(`\n Your Todo Lists`);
        todos.forEach((todo, index) => {
            console.log(`${index+1}. ${todo}`);
        });
        showMenu();
    } else if(option == 3) {
        rl.question("Enter task number, you want to delete!", (taskPosition) => {
            todos.splice(taskPosition-1, 1);
            console.log(`\nYour updated todos list:`);
            todos.forEach((todo, index) => {
                console.log(`${index+1}.${todo}`);
            });
            showMenu();
        });
    } else if(option == 4) {
        console.log('Good Bye !');
        rl.close();
    } else {
        console.log('Please select valid option');
        showMenu();
    }
}

showMenu();
