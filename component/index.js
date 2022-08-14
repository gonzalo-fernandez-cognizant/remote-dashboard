import render from './host'

// import('App1/AppPage').then(remote => {
//     const module = remote.default;
//     module()
// })

// import('App1/AppPage').then(remote => {
//     const module = remote.default;
//     module()
// })
// import('App1/AppPage').then(remote => {
//     const module = remote.default;
//     module()
// })


render()

const root = document.getElementById('root');
const app1Btn = document.getElementById('app1Btn');
const app2Btn = document.getElementById('app2Btn');

app1Btn.addEventListener('click', () => {
    root.innerHTML = '';
    import('App1/Page').then(remote => {
        const module = remote.default;
        module()
    })    
})

app2Btn.addEventListener('click', () => {
    root.innerHTML = '';
    import('App2/Page').then(remote => {
        const module = remote.default;
        module()
    })    
})