import { format } from 'date-fns'
import { Link } from 'react-router-dom'
export default function Post({ _id, title, summary, cover, content, createdAt, author }) {
    return (
        <div className="post">

            <div className="texts">
                <Link to={`/post/${_id}`}>
                    <h2>{title}</h2>
                </Link>
                <p className="info">
                    {/* <a className="author">elsalik</a> */}
                    <time>{format(new Date(createdAt), 'MMM d, yyy, hh:mm a')}</time>
                    <div className="author"></div>
                </p>
                <p className='summary'>{summary}</p>
            </div>

            <div className="image">
                <Link to={`/post/${_id}`}>
                    <img src={"http://localhost:5000/" + cover} alt="" />
                </Link>
            </div>
        </div>
    )
} 