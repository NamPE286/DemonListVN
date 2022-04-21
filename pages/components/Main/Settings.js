import { useTheme } from 'next-themes'

function Main() {
  const { theme, setTheme } = useTheme()
  console.log(theme)
  function processThing(x) {
    let v = JSON.parse(JSON.stringify(x))
    v = v.charAt(0).toUpperCase() + v.slice(1)
    return v
  }
  return (
    <div className="mainpanel">
      <h2>Settings</h2>
      <div>
        <label for="themes">Theme: </label>
        <select name="themes" id="themes">
          <option value={theme} selected disabled hidden>{processThing(theme)}</option>
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
