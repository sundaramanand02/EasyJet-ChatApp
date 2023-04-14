import React, { useEffect, useState } from 'react'
import './Chat.css';
import { useParams } from 'react-router-dom';
import { addDoc, doc, onSnapshot, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from './firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';

const Chat = ({userName}) => {
    const { groupId } = useParams();
    const [groupName, setgroupName] = useState('');
    const [msg, setmsg] = useState("");
    const [messages, setmessages] = useState([]);
    useEffect(() => {
        console.log(groupId);
        if (groupId) {
            const getGroup = onSnapshot(doc(db, 'groups', groupId), (doc) => {
                // console.log(doc); 
                setgroupName(doc.data().name);
            });
            const q = query(collection(db, "groups", groupId, "messages"), orderBy("timestamp", "asc"))
            const getMessage = onSnapshot(q, (snapshot) => {
                let msgList = [];
                snapshot.docs.forEach((doc) => {
                    msgList.push({ ...doc.data() });
                })
                setmessages(msgList);

            })
        }
    }, [groupId]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (msg == "") {
            return alert("Please enter a message.We ain't gonna fill our database cause of your error:)");
        }
        try {
            const sendData = await addDoc(collection(db, "groups", groupId, "messages"), {
                name: userName,
                message: msg,
                timestamp: serverTimestamp()
            })
        }
        catch (e) {
            console.error("error", e);
        }
        setmsg("");
    }

    return (
        <div className='chat'>
            {/* --------------------------chatheader-------------------- */}
            <div className="chatHeader">
                <img src="https://cdn-icons-png.flaticon.com/512/924/924915.png" alt="" />
                <div className="chatHeaderInfo">
                    <h3>{groupName}</h3>
                    <p>Last seen at {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>
                <div className="chatHeaderRight">
                    <button style={{ border: "none" }}>
                        <span className="material-symbols-outlined"> search </span>
                    </button>
                    <button style={{ border: "none" }}>
                        <span className="material-symbols-outlined"> attach_file </span>
                    </button>
                    <button style={{ border: "none" }}>
                        <span className="material-symbols-outlined"> more_vert </span>
                    </button>
                </div>
            </div>
            {/* ----------chatBody---------- */}
            <div className="chatBody">
                {
                    messages.map((message) => (
                        <p className={`chatMessage ${message.name==`${userName}` && 'chatReceiver'}`}>
                            <span className='chatName'>{message.name}</span>
                            {message.message}
                            <span className='timestamp'>{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                        </p>
                        )
                    )
                }
                <p className="chatMessage chatReceiver">
                    <span className='chatName'>Rahul</span>
                    Hello
                    <span className='timestamp'>10:59am</span>
                </p>
            </div>
            {/* ----------------------chatFooter---------------------- */}
            <div className="chatFooter">
                <span className="material-symbols-outlined">
                    add_reaction
                </span>
                <form action="" onSubmit={(e) => sendMessage(e)}>
                    <input value={msg} onChange={(e) => setmsg(e.target.value)} type="text" placeholder='Type a message' />
                    <button type="submit" style={{ border: 'none' }}>
                        <span className="material-symbols-outlined"> send </span>
                    </button>
                    <button style={{ border: 'none' }}>
                        <span className="material-symbols-outlined"> mic </span>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Chat