let currentInput;
let cliOutput;
let inputLine;

document.addEventListener('DOMContentLoaded', () => {
    cliOutput = document.getElementById('cli-output');
    displayBanner();
    displayWelcomeMessage();
    
    const { inputLine: newInputLine, input } = createInputLine();
    inputLine = newInputLine;
    if (!cliOutput.contains(inputLine)) {
        cliOutput.appendChild(inputLine);
    }
    
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const command = e.target.value.trim();
            if (command) {
                executeCommand(command);
                e.target.value = '';
            }
        }
    });
    
    document.addEventListener('click', () => {
        currentInput.focus();
    });
});

function createInputLine() {
    const inputLine = document.createElement('div');
    inputLine.className = 'terminal-input-line';
    const prompt = document.createElement('span');
    prompt.className = 'prompt';
    prompt.textContent = 'guest@jakoblangtry.com:~$ ';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'cli-input';
    input.setAttribute('spellcheck', 'false');
    input.setAttribute('autocomplete', 'off');
    
    inputLine.appendChild(prompt);
    inputLine.appendChild(input);
    
    input.focus();
    currentInput = input;
    return { inputLine, input };
}

function displayBanner() {
    const banner = `
     ██╗ █████╗ ██╗  ██╗ ██████╗ ██████╗     ██╗      █████╗ ███╗   ██╗ ██████╗████████╗██████╗ ██╗   ██╗
     ██║██╔══██╗██║ ██╔╝██╔═══██╗██╔══██╗    ██║     ██╔══██╗████╗  ██║██╔════╝╚══██╔══╝██╔══██╗╚██╗ ██╔╝
     ██║███████║█████╔╝ ██║   ██║██████╔╝    ██║     ███████║██╔██╗ ██║██║  ███╗  ██║   ██████╔╝ ╚████╔╝ 
██   ██║██╔══██║██╔═██╗ ██║   ██║██╔══██╗    ██║     ██╔══██║██║╚██╗██║██║   ██║  ██║   ██╔══██╗  ╚██╔╝  
╚█████╔╝██║  ██║██║  ██╗╚██████╔╝██████╔╝    ███████╗██║  ██║██║ ╚████║╚██████╔╝  ██║   ██║  ██║   ██║   
 ╚════╝ ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝     ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝   
                                                                                                    v1.0.0
`;
    appendOutput(banner, 'ascii-art');
}

function displayWelcomeMessage() {
    appendOutput('Welcome to Jakob Langtry\'s terminal interface.\nType \'help\' to see available commands.', 'info-text');
}

function appendOutput(text, className = '') {
    const output = document.createElement('div');
    output.className = className;
    output.textContent = text;
    if (inputLine && inputLine.parentNode === cliOutput) {
        cliOutput.insertBefore(output, inputLine);
    } else {
        cliOutput.appendChild(output);
    }
    cliOutput.scrollTop = cliOutput.scrollHeight;
}

function executeCommand(command) {
    const commandLine = document.createElement('div');
    commandLine.textContent = `guest@jakoblangtry.com:~$ ${command}`;
    cliOutput.insertBefore(commandLine, inputLine);
    
    switch (command) {
        case 'help':
            appendOutput('Available commands: help, whoami, date, echo, repo, clear, email, weather, exit, curl, banner, resume, projects', 'info-text');
            break;
        case 'clear':
            cliOutput.innerHTML = '';
            displayBanner();
            cliOutput.appendChild(inputLine);
            break;
        case 'whoami':
            appendOutput('guest');
            break;
        case 'date':
            appendOutput(new Date().toLocaleString());
            break;
        case 'banner':
            displayBanner();
            break;
        case 'email':
            appendOutput('Opening email client...');
            window.location.href = 'mailto:jjalangtry@gmail.com';
            break;
        case 'repo':
            appendOutput('Opening repository...');
            window.open('https://github.com/jjl4287', '_blank');
            break;
        case 'weather':
            appendOutput('Usage: weather [city]. Example: weather Brussels');
            break;
        case 'exit':
            appendOutput('Goodbye! Closing terminal...');
            setTimeout(() => window.close(), 1000);
            break;
        case 'resume':
            appendOutput('Opening resume...');
            window.open('JakobLangtrySep24.pdf', '_blank');
            break;
        case 'projects':
            const projectsList = [
                { name: 'Link Converter', url: 'https://convert.jakoblangtry.com' }
            ];
            appendOutput('Available projects:\n' + projectsList.map((project, index) => 
                `${index + 1}. ${project.name} - ${project.url}`
            ).join('\n'), 'info-text');
            appendOutput('Click on a project URL or type its name to open it.', 'info-text');
            break;
        default:
            if (command.toLowerCase() === 'link converter') {
                appendOutput('Opening Link Converter...');
                window.open('https://convert.jakoblangtry.com', '_blank');
                break;
            }
            if (command.startsWith('weather ')) {
                const city = command.split(' ')[1];
                appendOutput(`Weather report: ${city}\n\n_'""\'-.    Light snow\n \\_(   ).  -2(-7) °C\n  /(___(_)  ↗ 16 km/h\n   * * *   1 km\n  * * *    0.0 mm`, 'command-output');
            } else if (command.startsWith('echo ')) {
                appendOutput(command.substring(5));
            } else {
                appendOutput(`Command not found: ${command}. Type 'help' for available commands.`, 'error-text');
            }
    }
}