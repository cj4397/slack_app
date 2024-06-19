'use client'
import React, { useState, useEffect } from 'react'
import FirebaseAPI from '../firebase/FirebaseAPI'
import MiniLinks from './components/MiniLinks'


export default function page() {
    const { getUserDetails } = FirebaseAPI()
    const [userDetails, setUserDetails]: any = useState({})
    useEffect(() => {
        const give_users = async () => {
            const result = await getUserDetails()
            setUserDetails(result)
        }
        give_users()
    }, [])
    const date = new Date(userDetails.created_at).getMonth() + '-' + new Date(userDetails.created_at).getDate() + '-' + new Date(userDetails.created_at).getFullYear()
    return (
        <div>
            <MiniLinks />
            <section className="box">
                <div className="has-text-centered	">
                    <img src="https://bulma.io/images/placeholders/128x128.png" alt="" />
                </div>
                {userDetails.username && <>
                    Name:
                    <br />
                    <p className="ml-5">{userDetails.username}</p>
                    <br />
                    Email:
                    <br />
                    <p className="ml-5">{userDetails.email}</p>
                    <br />
                    Created at:
                    <br />
                    <time className="ml-5">{date}</time>
                </>}

            </section>
            <section className="box">
                Friends
                <div>

                </div>
            </section>
            <section className="box">
                Groups
                <div>

                </div>
            </section></div>
    )
}
