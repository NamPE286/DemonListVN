import { useTheme } from 'next-themes'

function Main() {
  const { theme, setTheme } = useTheme()
  return (
    <div className="mainpanel" data-aos="fade-up" data-aos-duration="600">
      <h2>Settings</h2>
      <div>
        The current theme is: {theme}
        <button onClick={() => setTheme('light')}>Light Mode</button>
        <button onClick={() => setTheme('dark')}>Dark Mode</button>
      </div>
    </div>
  )
}

export default Main;
