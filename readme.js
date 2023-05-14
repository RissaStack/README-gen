import inquirer from 'inquirer';
import fs from 'fs';

const licenseLink = {
    'Apache 2.0': 'https://img.shields.io/badge/License-Apache_2.0-blue.svg',
    'BSD 3-Clause':
        'https://img.shields.io/badge/License-BSD_3--Clause-blue.svg',
    'Eclipse Public License 1.0':
        'https://img.shields.io/badge/License-EPL_1.0-red.svg',
    'GNU GPL v3': 'https://img.shields.io/badge/License-GPLv3-blue.svg',
    ISC: 'https://img.shields.io/badge/License-ISC-blue.svg',
    MIT: 'https://img.shields.io/badge/License-MIT-yellow.svg',
    'MPL 2.0': 'https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg',
    Unlicense: 'https://img.shields.io/badge/license-Unlicense-blue.svg',
};

inquirer
    .prompt([
        {
            type: 'input',
            name: 'Title',
            message: 'What is the title of your project?',
            default: '',
        },
        {
            type: 'input',
            name: 'Description',
            message: 'Write a brief description of your project.',
            default: '',
        },
        {
            type: 'input',
            name: 'Installation',
            message: 'What are the installation instructions for the user?',
            default: '',
        },
        {
            type: 'input',
            name: 'Usage',
            message: 'What is your project used for?',
            default: '',
        },
        {
            type: 'input',
            name: 'Contributions',
            message: 'How can someone contribute?',
            default: '',
        },
        {
            type: 'input',
            name: 'Testing',
            message: 'What is your testing procedure?',
            default: '',
        },
        {
            type: 'list',
            name: 'License',
            message: 'Select the license you used.',
            default: '',
            choices: [
                'Apache 2.0',
                'BSD 3-Clause',
                'Eclipse Public License 1.0',
                'GNU GPL v3',
                'ISC',
                'MIT',
                'MPL 2.0',
                'Unlicense',
            ],
        },
        {
            type: 'input',
            name: 'Github',
            message: 'What is your Github username?',
            default: '',
        },
        {
            type: 'input',
            name: 'Email',
            message: 'What is your email?',
            default: '',
        },
    ])
    .then((answers) => {
        let readme = '';
        const keys = Object.keys(answers);

        keys.forEach((key) => {
            if (key === 'Title') {
                readme += `# ${answers['Title']} ![License](${
                    licenseLink[answers['License']]
                })\n`;
            } else if (key === 'Installation') {
                readme += '## Table of Contents\n';
                for (let i = 1; i < keys.length; i++) {
                    readme += `* [${keys[i]}](#${keys[i].toLowerCase()})\n`;
                }
            } else if (key === 'Github' || key === 'Email') {
                readme += '## Questions\n';
                readme += `You can find my Github [here](https://github.com/${answers['Github']} If you have any questions or concerns you can contact me by [email](${answers}["Email"]))\n`;
                // readme += `If you have any questions or concerns you can contact me by [email](${answers['Email']})\n`;
            } else {
                readme += `## ${key}\n`;
                if (key === 'License') {
                    readme += `This project is licensed under ${answers['License']} protocol.`;
                } else {
                    readme += answers[key];
                }
                readme += '\n';
            }
        });

        fs.writeFile('./readme.md', readme, {}, () => {
            console.log('readme created');
        });
    })
    .catch((error) => {
        if (error.isTtyError) {
            console.log('Must be run in an interactive environment.');
        } else {
            console.log(error);
        }
    });
