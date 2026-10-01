import React, { FunctionComponent } from 'react'
import { Link } from 'gatsby'

type PostTagsProps = {
  tags: string[]
}

const PostTags: FunctionComponent<PostTagsProps> = function ({ tags }) {
  const validTags = (tags ?? []).filter(tag => tag && tag.trim())
  if (validTags.length === 0) return null

  return (
    <div className="post-tags">
      {validTags.map(tag => (
        <Link key={tag} to={`/?tag=${tag}`} className="post-tags-item">
          #{tag}
        </Link>
      ))}
    </div>
  )
}

export default PostTags
