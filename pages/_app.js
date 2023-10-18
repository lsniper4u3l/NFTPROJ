import '../styles/globals.css'
import Link from 'next/link'

function MyApp({Component, pageProps}) {
    return (
    <div>
        <nav className='border-b p-6'>
            <p className='text-4xl font-bold'>Metaverse Marketplace</p>
            <div className='flex mt-4'>
                 <Link href="/">
                    <p className='mr-6 text-pink-500'>
                        Home
                    </p>
                 </Link>
                 <Link href="/create-item">
                    <p className='mr-6 text-pink-500'>
                        Sell digital Asset
                    </p>
                 </Link>
                 <Link href="/my-assets">
                    <p className='mr-6 text-pink-500'>
                        My digital Asset
                    </p>
                 </Link>
                 <Link href="/create-dashboard">
                    <p className='mr-6 text-pink-500'>
                        Create Dashboard
                    </p>
                 </Link>
            </div>
        </nav>  
        <Component {...pageProps} />
    </div>
    )
}

export default MyApp