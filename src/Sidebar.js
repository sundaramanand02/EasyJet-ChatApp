import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import { collection, getDocs ,onSnapshot } from "firebase/firestore";
import { db } from './firebase';
 


const Sidebar = ({userName}) => {
    const [group, setGroup] = useState([]);
    console.log(userName);
    const getGroups = async () => {
        // const getData = await getDocs(collection(db, 'groups'));
        const getData=onSnapshot(collection(db,'groups'),(snapshot)=>{
            let list = [];
            snapshot.docs.forEach((doc)=>{
                list.push({
                    id:doc.id,
                    ...doc.data()
                })
            })
            setGroup(list);
        })
        // let list = [];
        // getData.forEach((doc) => {
        //     list.push({
        //         id: doc.id,
        //         ...doc.data()
        //     });
        //     // console.log(doc.data(),doc.id);
        // });
        // setGroup(list);

    };

    useEffect(() => {
        getGroups();
    }, []);
    // console.log(userName);
    return (
        <div className="sidebar">
            <div className="sidebarHeader">
                <div style={{display:"flex" }}>
                    <img
                        src="https://media.istockphoto.com/id/1216425366/photo/heart-and-soul.jpg?s=612x612&w=0&k=20&c=bj4RaFi61ToNPKaHfszM1ShMjl3Lf_Qg0FvhkV1eM0s="
                        alt=""
                    />
                    {/* <h1>vfrw</h1> */}
                    <h1>{userName}</h1>
                </div>
                <div className="sidebarHeaderRight">
                    <button style={{ border: "none" }}>
                        <span className="material-symbols-outlined">
                            radio_button_checked
                        </span>
                    </button>
                    <button style={{ border: "none" }}>
                        <span class="material-symbols-outlined">more_vert</span>
                    </button>
                    <button style={{ border: "none" }}>
                        <span className="material-symbols-outlined">chat</span>
                    </button>
                </div>
            </div>
            {/* sidebarSearch */}
            <div className="sidebarSearch">
                <div className="sidebarSearchContainer">
                    <span className="material-symbols-outlined">search</span>
                    <input type="text" placeholder="Search Contacts" />
                </div>
            </div>
            {/* sidebarChats */}
            <div className="sidebarChats">
                <SidebarChat addNewChat />
                {
                    group.map((group) => {
                        return <SidebarChat key={group.id} name={group.name} id={group.id} />
                    })
                }
                {/* <SidebarChat />
                <SidebarChat />
                <SidebarChat /> */}
            </div>
        </div>
    );
};

export default Sidebar;
