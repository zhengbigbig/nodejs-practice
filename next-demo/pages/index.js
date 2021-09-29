import Link from 'next/link'
import styles from '../styles/Home.module.scss'

export default function Home() {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    <Link href="/posts/first-post">
                        <a>点这里</a>
                    </Link>
                </h1>

                <p className={styles.description}>
                    Get started by editing{' '}
                    <code className={styles.code}>pages/index.js</code>
                </p>

                <div className={styles.grid}>

                </div>
            </main>

            <footer className={styles.footer}>

            </footer>
        </div>
    )
}
