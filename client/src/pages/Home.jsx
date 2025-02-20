import Post from "../Post";
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react";


export default function Home() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/post').then(response => {

            response.json().then(posts => {
                setPosts(posts);
            });
        });
    }, []);
    return (
        <div>
            <header>
                <Link to="" className="logo"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-envelope-open-heart-fill" viewBox="0 0 16 16">
                    <path d="M8.941.435a2 2 0 0 0-1.882 0l-6 3.2A2 2 0 0 0 0 5.4v.313l4.222 2.475q.035-.087.08-.17c.665-1.3 2.362-1.917 3.698-1.25 1.336-.667 3.033-.05 3.699 1.25a3 3 0 0 1 .08.17L16 5.713V5.4a2 2 0 0 0-1.059-1.765zM0 6.873l4 2.344c-.012.542.124 1.117.416 1.694l.004.006L0 13.372v-6.5Zm.059 7.611 4.9-2.723c.563.73 1.383 1.467 2.49 2.198l.551.365.551-.365c1.107-.73 1.927-1.467 2.49-2.198l4.9 2.723A2 2 0 0 1 14 16H2a2 2 0 0 1-1.941-1.516M16 13.372l-4.42-2.455.004-.006c.292-.577.428-1.152.415-1.694L16 6.873v6.5Z" />
                    <path d="M8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132" />
                </svg></Link>

                <nav>
                    {(
                        <>
                            <Link to='/create'>create new post</Link>
                            <Link to='/'><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z" />
                                <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z" />
                            </svg></Link>

                        </>
                    )}
                </nav>
            </header>
            {posts.length > 0 && posts.map(post => {
                return <Post key={post._id} {...post} />
            })}
        </div>
    )
}
