import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'
interface IFormInput {
  id: string
  name: string
  email: string
  comment: string
}

type Props = {
  postId: string
}

function CommentsForm(props: Props) {
  const { postId } = props
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    fetch('/api/createComments', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((res) => {
        console.log(data)
        setSubmitted(true)
      })
      .catch((error) => {
        console.log(error)
        setSubmitted(false)
      })
  }

  let content = submitted ? (
    <div className="my-10 bg-yellow-500 py-10 px-10 text-white">
      <h1 className="text-3xl font-bold">
        Thank You For Submitting a Comment!
      </h1>
      <p>Once it approved it will be added!</p>
    </div>
  ) : (
    <form className="my-2 p-4" onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" value={postId} {...register('id')} name="id" />
      <label className="my-4 block">
        <span className="my-4 text-lg font-medium">Name</span>
        <input
          {...register('name', { required: true })}
          type="text"
          placeholder="Name"
          className="w-full rounded border p-2  outline-none focus:ring"
        />
      </label>
      <label className="my-4 block">
        <span className="my-4 text-lg font-medium">Email</span>
        <input
          {...register('email', { required: true })}
          type="email"
          placeholder="Email"
          className="w-full rounded border p-2  outline-none focus:ring"
        />
      </label>
      <label className="my-4 block">
        <span className="my-4 text-lg font-medium">Your Comment</span>
        <textarea
          {...register('comment', { required: true })}
          rows={8}
          placeholder="Comment!"
          className="w-full rounded border p-2 outline-none focus:ring"
        />
      </label>
      {errors.name && <p className="text-red-500">Please Enter valid Name</p>}
      {errors.email && <p className="text-red-500">Please Enter valid email</p>}
      {errors.comment && (
        <p className="text-red-500">Please Enter valid comment</p>
      )}
      <button className="cursor:pointer w-full border bg-yellow-400 p-4 text-lg font-medium hover:bg-yellow-600">
        Leave Comment
      </button>
    </form>
  )

  return content
}

export default CommentsForm
