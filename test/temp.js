const {spawn} = require('child_process');
// const ls = spawn('code', ['-v']);
const ls = spawn('code', ['--install-extension', 'redhat.java']);

ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
})

ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
})