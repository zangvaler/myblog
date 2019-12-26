import '../static/style/components/advert.css'



const Advert = (props) => {
    let imgarr = props.arr
    return (
        <div className="ad-div comm-box">
            {
                imgarr.map((item, key) => {
                    return (
                        <div key={key}>
                            <img src={"http://localhost:3000/public/avatar/" + item.videosrc} width="100%" height="80px"/>
                        </div>
                    )
                })}
        </div>
    )
}




export default Advert