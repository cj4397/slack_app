'use client'
import React, { useEffect, useState } from 'react'
import MiniLinks from '../components/MiniLinks'
import FirebaseAPI from '@/app/firebase/FirebaseAPI'
import Link from 'next/link'

export default function page() {
    const { getUserDetails, getFriends } = FirebaseAPI()
    const [userDetails, setUserDetails]: any = useState({})
    const [list, setList]: any = useState([])
    useEffect(() => {
        const give_users = async () => {
            const result = await getUserDetails()
            setUserDetails(result)
        }
        const get_friends = async () => {
            const x = await getFriends()
            setList(x)
        }
        get_friends()
        give_users()
    }, [])
    return (
        <div>

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
            </section>

            {/* <section className='un-select has-background-success nav-section'>
                Friends

                <ul>
                    {list.map((e: any) => (
                        <li>
                            wsdfg
                            <Link href={{
                                pathname: `/dashboard/DirectMessage/${e.data.username}`,
                                query: { friend: `${e}` },
                            }}
                                as={`/dashboard/DirectMessage/${e.data.username}`}>
                                {e.data.username}
                                <br />
                                {e.email}
                            </Link>

                        </li>
                    ))}
                </ul>
            </section>
            <div className='main-section'>

            </div> */}
            page</div>
    )
}

