function Main(annoucement) {
    return (
        <div className='annoucementPanel'>
            <h2>Annoucement</h2>
            {
                Object.keys(annoucement).map(i => {
                    return (
                    <div className="annouce" key={i}>
                        <div className="annouceContent">
                            <a className="annoucementTitle">{annoucement[i].title}</a><a>{annoucement[i].date}</a>
                            <p>{annoucement[i].content}</p>
                        </div>
                    </div>
                )})
            }

        </div>
    )
}

Main.defaultProps = [
    {
        title: "Title",
        date: "30/1/2022",
        content: "Annoucement go here"
    },
    {
        title: "Title Title",
        date: "31/1/2022",
        content: "This is an annoucement"
    },
    {
        title: "Long Annoucement Title Long Annoucement Title Long Annoucement Title",
        date: "1/2/2022",
        content: "Long annoucement go here Long annoucement go here Long annoucement go here Long annoucement go here"
    },
]

export default Main;