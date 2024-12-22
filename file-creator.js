import readline from 'readline';
import fs from 'fs';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const createFile = () => {
    rl.question(`Enter your filename: `, (fileName) => {
        rl.question(`Enter the content for your file: `, (content) => {
            fs.writeFile(`${fileName}.txt`, content, (err) => {
                if(err) {
                    console.error(`Error while creating the file: ${err.message}`);
                } else {
                    console.log(`File ${fileName}.txt created successfully`);
                }
                rl.close();
            })
        })
    })
};

createFile();