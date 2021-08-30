import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head'
import Post from '../components/Post';
import {sortByDate} from '../utils';

export default function Home({ posts }) {
  
  const ss = '';

  return (
    <div>
      <Head>
        <title>Dev blog</title>
      </Head>

      <div className="posts">
        {
          posts.map((post, index) => (
            <Post post={post} key={index} />
          ))
        }
      </div>
    </div>
  )
}

// We can get data from anywhere...this is just an example
export async function getStaticProps() {

  // Get files from the Post directory
  const files = fs.readdirSync(path.join('posts'));

  // Get slug and frontmatter from posts
  const posts = files.map(filename => {
    // Create slug
    const slug = filename.replace('.md', '')

    // Get frontmatter
    const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')

    const { data: frontmatter } = matter(markdownWithMeta)

    return {
      slug,
      frontmatter
    }
  });

  return {
    props: {
      posts: posts.sort(sortByDate),
    }
  }
}