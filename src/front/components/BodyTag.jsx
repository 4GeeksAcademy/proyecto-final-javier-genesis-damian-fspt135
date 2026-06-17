


export const BodyTag = ({tag, onSelectedTag}) =>{
    const onClick = (e)=> {
        e.preventDefault()
        onSelectedTag(tag)
    }
    return(
        <div>
            <button onClick={onClick}>
                <i className="fa-regular fa-heart"></i>
            </button>
            <h6>{tag.title}</h6>
        </div>
    )
}