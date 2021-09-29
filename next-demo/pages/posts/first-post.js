import React, {useCallback} from 'react'
import Link from 'next/link'
import styles from 'styles/first-post.module.scss'

export default function X() {
    const clickMe = useCallback(() => {
        console.log('you clicked me')
    }, [])
    return (
        <>
            <div className={styles.wrapper}>
                <h1>First Post</h1>
                <button onClick={clickMe}>click me</button>
                <hr/>
                回到首页 <Link href="/"><a>点这里</a></Link>
            </div>
            <style jsx>{`
              h1 {
                color: red;
              }
            `}</style>
        </>
    )
}