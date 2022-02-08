function Main(player) {
    return (
        <div className='topplayerPanel'>
            <h2>Top Player</h2>
            {
                Object.keys(player).map(i => {
                    return (
                        <div className='player' key={i}>
                            <section>
                                <img src={player[i].avatar}/>
                            </section>
                            <div className='topplayerInfo'>
                                <p>{player[i].name} - {player[i].point}pt</p>
                            </div>
                        </div>
                    )
                })
            }


        </div>
    )
}

Main.defaultProps = [
    {
        avatar: "https://cdn.donmai.us/original/61/6d/__uruha_rushia_and_piyoko_hololive_drawn_by_ixia_ixia424__616ddf55c52baa0cced4fdb8f3a432b8.png",
        name: "Rushia",
        point: "1000"
    },
    {
        avatar: "https://yt3.ggpht.com/uMUat6yJL2_Sk6Wg2-yn0fSIqUr_D6aKVNVoWbgeZ8N-edT5QJAusk4PI8nmPgT_DxFDTyl8=s900-c-k-c0x00ffffff-no-rj",
        name: "Gawr Gura",
        point: "1000"
    },
    {
        avatar: "https://pbs.twimg.com/profile_images/1318958836120649728/7JHxy2UO.jpg",
        name: "Amelia",
        point: "1000"
    }
]

export default Main;