import { useState, useEffect } from 'react';
// import { useQuill } from 'react-quilljs';
// import 'quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const { quill, quillRef } = useQuill();

    // useEffect(() => {
    //     if (quill) {
    //         quill.on('text-change', () => {
    //             setContent(quill.root.innerHTML);
    //         });
    //     }
    // }, [quill]);

    async function createNewPost(ev) {
        ev.preventDefault();
        const data = new FormData();
        data.append('title', title);
        data.append('summary', summary);
        data.append('content', content);
        if (files) {
            data.append('file', files[0]);
        }

        const response = await fetch('https://yourt-post.onrender.com/post', {
            method: 'POST',
            body: data,
        });

        if (response.ok) {
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to="/" />;
    }

    const formStyle = {
        background: "rgb(34 34 34 / 56%)",
        padding: "20px",
        borderRadius: "10px",
        // width: "90%",
        // maxWidth: "500px",
        margin: "30px auto",
        boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.1)",
        // display: "flex",
        // flexDirection: "column",
        // gap: "15px"
    };

    const inputStyle = {
        width: "100%",
        padding: "12px",
        borderRadius: "5px",
        fontSize: "16px",
        background: "rgb(0 0 0 / 6%)",
        border: "1px solid #444",
        color: "white",
        transition: "0.3s ease-in-out"
    };

    const buttonStyle = {
        width: "100%",
        padding: "12px",
        borderRadius: "5px",
        fontSize: "16px",
        background: "rgb(108 43 240)",
        border: "none",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "0.3s ease-in-out"
        // fontFamily: "Baloo Bhaijaan 2'"
    };

    return (
        <form onSubmit={createNewPost} style={formStyle}>
            <input
                type="text"
                placeholder="العنوان"
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
                style={inputStyle}
            />
            <input
                type="text"
                placeholder="الملخص"
                value={summary}
                onChange={(ev) => setSummary(ev.target.value)}
                style={inputStyle}
            />
            <br />
            <label style={{ color: "white", fontSize: "16px", padding: "10px" }}>المقال</label>
{/*             <div ref={quillRef} style={{ ...inputStyle, minHeight: "200px", padding: "10px" }} />
            <br /> */}
            <label style={{ color: "white", fontSize: "16px", padding: "10px" }}>إضافة صورة</label>
            <input type="file" onChange={(ev) => setFiles(ev.target.files)} style={inputStyle} />

            <button style={buttonStyle}>نشر</button>
        </form>
    );
}
