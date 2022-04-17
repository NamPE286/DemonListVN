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
            <p>This page was made in NextJS with SCSS and Firebase.</p>
            <h2>Join Our Discord Server</h2>
            <iframe id="discord2" src="https://discord.com/widget?id=877546680801697813&theme=dark" width="50%" height="300" allowtransparency="true" frameBorder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
            <h2>Credit</h2>
            <h3 id='role'>• Owner</h3>
            <div className="credit">
                <img src="https://avatars.githubusercontent.com/u/80624167?v=4"></img>
                <div className="creditContent">
                    <h3>VnPower</h3>
                    <hr></hr>
                    <a>Discord: VnPower#5919</a>
                    <a href="https://github.com/rVnPower">GitHub</a>
                </div>
            </div>
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
