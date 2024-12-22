import fs from 'fs/promises';
import path from 'path';
import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rl = readline.createInterface({ input, output });

async function moveFile(sourcePath, destinationFolder) {
    try {
      await fs.mkdir(destinationFolder, { recursive: true });
      const fileName = path.basename(sourcePath);
      const destinationPath = path.join(destinationFolder, fileName);
      await fs.rename(sourcePath, destinationPath);
      console.log(`File moved successfully from ${sourcePath} to ${destinationPath}`);
      return destinationPath;
    } catch (error) {
      console.error(`Error moving file: ${error}`);
      throw error;
    }
}

const createFile = async () => {
    try {
        const fileName = await rl.question('Enter your filename: ');
        const content = await rl.question('Enter the content for your file: ');
        const filePath = `${fileName}.txt`;

        await fs.writeFile(filePath, content);
        console.log(`File ${fileName}.txt created successfully`);

        const destinationFolder = path.join(__dirname, '../generated-files');
        const destinationPath = await moveFile(filePath, destinationFolder);
        console.log("File is moved to", destinationPath);
    } catch (error) {
        console.error(`Error while creating/moving the file: ${err.message}`);
    } finally {
        rl.close();
    }
    
};

createFile();