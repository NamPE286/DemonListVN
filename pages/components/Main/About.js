function Main() {
    function processLink(s) {
        if (s.length > 15) {
          return s.slice(0, 13) + "...";
        }
        return s;
      }
    return (
        <div className="mainpanel" id="about">
            <h2>About</h2>
            <p>This page was made in NextJS with SCSS and Firebase. <a href='https://github.com/NamPE286/DemonListVN'> Source code (click here)</a></p>
            <h2>Join Our Discord Server</h2>
            <iframe id="discord2" src="https://discord.com/widget?id=877546680801697813&theme=dark" width="50%" height="300" allowtransparency="true" frameBorder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
            <h2>Credit</h2>
            <h3 id='role'>• Featured List VN Owner</h3>
            <div className="credit">
                <img src="https://yt3.ggpht.com/ytc/AAUvwnjglRqQfBFknV54s-A7rDqU41E4mCyCUxLk9eT7wA=s88-c-k-c0x00ffffff-no-rj"></img>
                <div className="creditContent">
                    <h3>Hito73</h3>
                    <hr></hr>
                    <a href="https://www.youtube.com/channel/UCYw-j3PO02FCfEL-M-VZqGg">YouTube</a>
                    <a href="https://www.facebook.com/profile.php?id=100015875652073">Facebook</a>
                    <a>Discord: Hito73#4105</a>
                </div>
            </div>
            <div className="credit">
                <img src="https://avatars.githubusercontent.com/u/80624167?v=4"></img>
                <div className="creditContent">
                    <h3>VnPower</h3>
                    <hr></hr>
                    <a>Discord: VnPower#5919</a>
                    <a href="https://github.com/rVnPower">GitHub</a>
                </div>
            </div>
            <h3 id='role'>• Demon List VN Owner</h3>
            <div className="credit">
                <img src="https://yt3.ggpht.com/OBeTi6u8XxufbZxeJRe9jYx9nmBkAdYVBrZLQlke8BQXoMznrmQsoqD5V3K7fHMfx8fJfaeI=s88-c-k-c0x00ffffff-no-rj"></img>
                <div className="creditContent">
                    <h3>noeruchan</h3>
                    <hr></hr>
                    <a href='https://m.youtube.com/c/noeruchangd/featured'>Youtube</a>
                    <a>Discord: noeru#0563</a>
                </div>
            </div>
            <div className="credit">
                <img src="https://yt3.ggpht.com/LPuxniDbgFswSgusUD_P4LCSYVPObpOMcbBdBD31ZDWrehS-7wSakq17bCc29fN3OCAV6BtEIg=s88-c-k-c0x00ffffff-no-rj"></img>
                <div className="creditContent">
                    <h3>axyb</h3>
                    <hr></hr>
                    <a href="https://m.youtube.com/channel/UCcdpyP7JZZima9_Ukaguj-w">YouTube</a>
                    <a>Discord: shiraaaaaa;#6309</a>
                </div>
            </div>
            <div className="credit">
                <img src="https://yt3.ggpht.com/u-NToatBL5sFU64lmf2jpr8VTGQ0JpwfHnd5hAB6KiXrvfcFygwjRAvqfCqQkIk-6qx4txCwyw=s88-c-k-c0x00ffffff-no-rj"></img>
                <div className="creditContent">
                    <h3>Kanota</h3>
                    <hr></hr>
                    <a href="https://www.youtube.com/channel/UCyHGYrLHvmZ-5rDTOxcCwAw">YouTube</a>
                    <a>Discord: Kanota#1191</a>
                </div>
            </div>
            <h3 id='role'>• Designer</h3>
            <div className="credit">
                <img src="https://cdn.discordapp.com/attachments/955026244427210812/955026262240428052/275017775_2701633393464712_7996914072184440323_n.png"></img>
                <div className="creditContent">
                    <h3>NamPE</h3>
                    <hr></hr>
                    <a href="https://www.youtube.com/channel/UCCj7J4fxHF70n5zxccZQDww">YouTube</a>
                    <a href="https://www.facebook.com/profile.php?id=100008542323249">Facebook</a>
                    <a href="https://www.youtube.com/channel/UCCj7J4fxHF70n5zxccZQDww">GitHub</a>
                </div>
            </div>
            <h3 id='role'>• Developer</h3>
            <div className="credit">
                <img src="https://cdn.discordapp.com/attachments/955026244427210812/955026262240428052/275017775_2701633393464712_7996914072184440323_n.png"></img>
                <div className="creditContent">
                    <h3>NamPE</h3>
                    <hr></hr>
                    <a href="https://www.youtube.com/channel/UCCj7J4fxHF70n5zxccZQDww">YouTube</a>
                    <a href="https://www.facebook.com/profile.php?id=100008542323249">Facebook</a>
                    <a href="https://www.youtube.com/channel/UCCj7J4fxHF70n5zxccZQDww">GitHub</a>
                </div>
            </div>
            <div className="credit">
                <img src="https://avatars.githubusercontent.com/u/80624167?v=4"></img>
                <div className="creditContent">
                    <h3>VnPower</h3>
                    <hr></hr>
                    <a>Discord: VnPower#5919</a>
                    <a href="https://github.com/rVnPower">GitHub</a>
                </div>
            </div>
            <h3 id='role'>• List Helper</h3>
            <div className="credit">
                <img src="https://avatars.githubusercontent.com/u/80624167?v=4"></img>
                <div className="creditContent">
                    <h3>VnPower</h3>
                    <hr></hr>
                    <a>Discord: VnPower#5919</a>
                    <a href="https://github.com/rVnPower">GitHub</a>
                </div>
            </div>
        </div>
    )
}

export default Main;
