type PostCardProps = {
  post: {
    title: string;
    type: string;
    city: string;
    date: string;
    user: {
      name: string;
    }
  }
}


export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="border p-4">
      <h2>{post.title}</h2>
      <p>{post.type}</p>
      <p>
        {post.city}, {post.date}
      </p>
      <p>von {post.user.name}</p>


    </div>
  )
}