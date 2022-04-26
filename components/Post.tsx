interface Props {
  title: string
  description: string
  mainImage: string
  authorImage: string
  authorName: string
}
function PostElement({
  title,
  description,
  mainImage,
  authorImage,
  authorName,
}: Props) {
  return (
    <div className="group my-2 mx-2 cursor-pointer overflow-hidden rounded-md border p-4 duration-200 hover:bg-yellow-400">
      <img
        className="my-2 h-60 w-full rounded-sm object-cover transition-transform duration-200 group-hover:scale-105 md:max-h-48"
        src={mainImage}
        alt="mainImage"
      />
      <div className="flex justify-between">
        <div>
          <p className="text-lg font-medium">{title}</p>
          <p>
            {description} by <span className="font-medium"> {authorName}</span>
          </p>
        </div>
        <img
          className="mx-2 h-12 w-12 rounded-full object-cover"
          src={authorImage}
          alt="authorImage"
        />
      </div>
    </div>
  )
}

export default PostElement
