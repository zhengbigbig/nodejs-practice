import Link from 'next/link'
import React from 'react'
// @ts-ignore
import styles from 'styles/Home.module.scss'

export default function Home() {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    <Link href="/posts">
                        <a>点这里</a>
                    </Link>
                </h1>
            </main>

            <footer className={styles.footer}>

            </footer>
        </div>
    )
}
