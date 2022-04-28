import { useTheme } from 'next-themes'

function Main() {
    const { theme, setTheme } = useTheme()
    return (
        <div className='topplayerPanel'>
            <iframe id="discord" src={`https://discord.com/widget?id=877546680801697813&theme=${theme}`} width="100%" height="300" allowtransparency="true" frameBorder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
        </div>
    )
}

export default Main;