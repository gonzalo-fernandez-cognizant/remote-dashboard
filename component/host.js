import './styles.scss'

const root = document.getElementById('root');

const addTitle = () => {
    const title = document.createElement('h2')
    title.innerHTML = `ENVIRONMENT: ${process.env.NODE_ENV}`;
    root.appendChild(title)
    title.classList.add('title')
}

const addGreeting = () => {
    const title = document.createElement('h1')
    title.innerHTML = `Welcome HOME`;
    root.appendChild(title)
    title.classList.add('title')
}

const render = () => {
    addGreeting()
    addTitle();
}


export default render;