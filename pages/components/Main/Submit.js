function Main(levels) {

    return (
        <div className="mainpanel" data-aos="fade-up" data-aos-duration="600">
            <h2>Submit</h2>
            <div className="submissionRules">
                <h3>Submission Rules</h3>
                <ul>
                    <li>Only 100% records of any demons in the list are accepted.</li>
                    <li>Illegitimate records related to any cheat tools or secret ways will be rejected (However, FPS bypass is allowed, up to 300 FPS).</li>
                    <li>Stealing videos from others will not be accepted.</li>
                </ul>
            </div>
            <div className="submitForm" data-aos="fade-up" data-aos-duration="600">
                <iframe className="google-form" src="https://docs.google.com/forms/d/e/1FAIpQLScyjv64Ezp9-3kQPUvZ-aCpEjKue9jhXKqVnq2bFSGqARpzUg/viewform?embedded=true" width="90%" height="1260" frameBorder="0" marginHeight="0" marginWidth="0"></iframe>
            </div>
            <p className="submitP">Doesn't work? <a href="https://forms.gle/YfRLRSrb1MPB8vqG7"><u>Click Here</u></a></p>
        </div>
    )
}

export default Main;
