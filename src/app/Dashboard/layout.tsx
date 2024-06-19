'use client'
import React, { useEffect, useState } from 'react'
import FirebaseAPI from '../firebase/FirebaseAPI'
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from '../firebase/FirebaseAuth';
import Link from 'next/link';
import { faUser, faComments, faEnvelope, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



export default function layout({ children }: { children: React.ReactNode; }) {
    const { user, logout } = useAuth();
    const { getAllOnlineUsers } = FirebaseAPI()
    const path = usePathname()
    const route = useRouter();


    if (user === '') {
        return route.push("/Login");
    }
    console.log(path)
    console.log(path.includes('Dashboard/DirectMessage'))
    return (
        <main>
            <nav className="has-background-primary un-select">
                <div>
                    <Link href={"/Dashboard"} className={`${path === '/Dashboard' && 'link-active'} has-text-centered`}>
                        <abbr title="User"><FontAwesomeIcon icon={faUser} size="7x" /></abbr>
                        <br />
                        <p className="has-text-black is-size-6"><b>Profile</b></p>
                    </Link>
                </div>

                <div>
                    <Link href={"/Dashboard/DirectMessage"} className={`${path.includes('Dashboard/DirectMessage') && 'link-active'} has-text-centered`}>
                        <abbr title="Direct Message"><FontAwesomeIcon icon={faEnvelope} size="6x" /></abbr>
                        <br />
                        <p className="has-text-black is-size-6"><b>Direct MSG</b></p>
                    </Link>
                </div>

                <div>
                    <Link href={"/Dashboard/GroupChat"} className={`${path === '/Dashboard/GroupChat' && 'link-active'} has-text-centered`}>
                        <abbr title="Group Chat"><FontAwesomeIcon icon={faComments} size="5x" /></abbr>
                        <br />
                        <p className="has-text-black is-size-6"><b>Group Chat</b></p>
                    </Link>
                </div>

                <div>
                    <Link href={"/"} onClick={() => logout()} className="has-text-centered">
                        <abbr title="Sign Out"><FontAwesomeIcon icon={faRightFromBracket} size="6x" /></abbr>
                        <br />
                        <p className="has-text-black is-size-6"><b>Log Out</b></p>
                    </Link>

                </div>
            </nav>
            <div className="main h-100">
                {children}
            </div>
        </main>

    )
}
