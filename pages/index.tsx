import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import { sanityClient, urlFor } from '../sanity'
import { Post } from '../typings'
import PostElement from '../components/Post'
import Link from 'next/link'
interface Props {
  posts: [Post]
}

const Home = ({ posts }: Props) => {
  return (
    <div className="mx-auto max-w-6xl">
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      {/* <div className="mx-auto flex max-w-6xl items-center justify-between bg-yellow-400 py-10 lg:py-0">
        <div className="space-y-5 px-4">
          <h1 className="max-w-xl font-serif text-6xl">
            <span className="underline decoration-black decoration-4">
              Medium
            </span>{' '}
            is a place to read, write and connect
          </h1>
          <h2 className="text-lg font-medium">
            It's easy to post your thinking on any tobic and connect with
            mellion of readers
          </h2>
        </div>
        <img
          src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"
          alt="M"
          className="hidden h-40 md:inline-flex lg:h-full"
        />
      </div> */}

      <div className="mx-auto flex max-w-6xl items-center justify-between bg-yellow-400 py-4 px-4 lg:py-0">
        <div className="space-y-4">
          <h1 className="max-w-xl font-serif text-6xl">
            <span className="underline decoration-black decoration-4">
              Medium
            </span>{' '}
            is a place to read, write and connect
          </h1>
          <h2 className="text-lg font-medium">
            {' '}
            It's easy to post your thinking on any tobic and connect with
            mellion of readers
          </h2>
        </div>
        <img
          src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"
          alt="M"
          className="hidden h-40 md:inline-flex lg:h-full"
        />
      </div>
      <div className="gird-cols-1 my-4 grid sm:grid-cols-2 md:grid-cols-3">
        {posts.map((post) => (
          <Link key={post._id} href={`/posts/${post.slug.current}`}>
            <div>
              <PostElement
                title={post.title}
                description={post.description}
                mainImage={urlFor(post.mainImage).url()}
                authorImage={urlFor(post.author.image).url()}
                authorName={post.author.name}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const query = `*[_type == 'post']{
    _id,
    title,
    slug,
    author -> {
    name,
    image,
    
  },
  mainImage,
  description
  }`

  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts,
    },
  }
}
