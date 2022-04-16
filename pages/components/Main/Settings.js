import { useTheme } from 'next-themes'

function Main() {
  const { theme, setTheme } = useTheme()
  return (
    <div className="mainpanel">
      <h2>Settings</h2>
      <div>
        <label for="themes">Theme: </label>
        <select name="themes" id="themes">
          <option value={theme} selected disabled hidden>{theme.charAt(0).toUpperCase() + theme.slice(1)}</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
        <br></br><br></br>
        <button onClick={() => setTheme(document.getElementById('themes').value)}>Apply</button>
      </div>
    </div>
  )
}

export default Main;
