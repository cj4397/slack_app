'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import FirebaseAPI from '@/app/firebase/FirebaseAPI'
import Search from '../components/Search'



export default function layout({ children }: { children: React.ReactNode; }) {
    const { getFriends } = FirebaseAPI()
    const [list, setList]: any = useState([])

    useEffect(() => {
        const get_friends = async () => {
            const x = await getFriends()
            setList(x)
        }
        get_friends()
    }, [])

    return (
        <main>
            <Search />
            <section className='un-select has-background-success nav-section'>
                Friends

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
            </section>
            <div className='main-section'>
                {children}
            </div>
        </main>
    )
}
