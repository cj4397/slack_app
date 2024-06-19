'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import FirebaseAPI from '@/app/firebase/FirebaseAPI'



export default function page() {
    const { getFriends, getUserDetails } = FirebaseAPI()
    const [list, setList]: any = useState([])
    const [userDetails, setUserDetails]: any = useState({})

    useEffect(() => {
        // const give_users = async () => {
        //     const result = await getUserDetails()
        //     setUserDetails(result)
        // }
        const get_friends = async () => {
            const x = await getFriends()
            console.log(x)
            setList(x)
        }
        // give_users()
        get_friends()
    }, [])
    return (
        <div>Channels page
            <ul>
                {list.map((e: any) => (
                    <li>
                        wsdfg
                        <Link href={{
                            pathname: `/dashboard/DirectMessage/${e.data.username}`,
                            query: { friend: `${e}` },
                        }}
                            as={`/Dashboard/DirectMessage/${e.data.username}`}>
                            {e.data.username}
                            <br />
                            {e.email}
                        </Link>

                    </li>
                ))}
            </ul>

        </div>
    )
}
