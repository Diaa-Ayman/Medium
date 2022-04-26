import React from 'react'
import Header from '../../components/Header'
import { sanityClient, urlFor } from '../../sanity'
import { Post } from '../../typings'
import { GetStaticProps } from 'next'
import PortableText from 'react-portable-text'
import CommentsForm from '../../components/CommentsForm'
interface Props {
  post: Post
}
function PostPage({ post }: Props) {
  return (
    <div>
      <Header />
      <img
        src={urlFor(post.mainImage).url()!}
        alt="Main Image"
        className="h-44 w-full object-cover"
      />
      <article className="mx-auto my-4 max-w-3xl p-4">
        <h1 className="text-3xl font-bold uppercase">{post.title}</h1>
        <h4 className="mb-4 font-light italic text-gray-600">
          {post.description}
        </h4>
        <div className="flex items-center ">
          <img
            className="mr-2 h-10 w-10 rounded-full"
            src={urlFor(post.author.image).url()!}
            alt="Author image"
          />
          <p className="text-sm font-extralight text-gray-600">
            Blog By{' '}
            <span className="font-md text-lg text-green-600">
              {post.author.name}
            </span>{' '}
            -- puplished at {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>
        <div>
          <PortableText
            className="mt-4"
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            content={post.body}
            serializers={{
              h1: (props: any) => (
                <h1 style={{ color: 'green', fontSize: '3rem' }} {...props} />
              ),
              h2: (props: any) => (
                <h1 style={{ color: 'green', fontSize: '1.5rem' }} {...props} />
              ),
              h3: (props: any) => (
                <h1 style={{ color: 'green', fontSize: '1.5rem' }} {...props} />
              ),
              link: ({ href, children }: any) => (
                <a href={href} className="text-blue-500 hover:underline">
                  {children}
                </a>
              ),
              li: ({ children }: any) => (
                <li className="special-list-item">{children}</li>
              ),
            }}
          />
        </div>
      </article>
      <hr className="mx-auto my-4 max-w-2xl border border-yellow-300" />
      <div className="mx-4 max-w-3xl md:mx-auto">
        <p className="font-medium text-yellow-500">Enjoy The Article</p>
        <h1 className="my-4 text-3xl text-black">Leave Comment Below!</h1>
      </div>
      <div className="mx-auto max-w-2xl">
        <CommentsForm postId={post._id} />
      </div>
      {post.comments.length > 0 ? (
        <div className="my-8 mx-auto max-w-2xl rounded-sm border bg-white p-8 shadow shadow-yellow-300">
          <h1 className="my-4 text-2xl font-bold text-black">Comments</h1>
          <hr />
          {post.comments.map((comment) => (
            <div className="my-4 w-full border p-4 text-black shadow ">
              <p className="text-lg text-yellow-500"> {comment.name}:</p>
              <p className="text-lg font-bold">{comment.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="my-8 mx-auto max-w-2xl rounded-sm border bg-white p-8 shadow shadow-yellow-300">
          <h1 className="align-center text-2xl font-bold">No Comments!</h1>
        </div>
      )}
    </div>
  )
}

export default PostPage

export const getStaticPaths = async () => {
  const query = `*[_type == 'post']{
        _id, 
        slug {current}
      
      }`
  const posts = await sanityClient.fetch(query)
  const paths = posts?.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }))
  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const query = `*[_type == 'post' && slug.current == $slug][0]{
        _id,
        title,
        slug,
        author -> {
        name,
        image,
      },
      'comments': *[
        _type == 'comment' &&
        post._ref == ^._id &&
        approved == true],
      mainImage,
      description,
      _createdAt,
      body
      }`

  const post = await sanityClient.fetch(query, {
    slug: context.params?.slug,
  })

  //   if (!post) {           // Has an issue
  //     return {
  //       notfound: true,
  //     }
  //   }
  return {
    props: {
      post,
    },
    revalidate: 60,
  }
}
