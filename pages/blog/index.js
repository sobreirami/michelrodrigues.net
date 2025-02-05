import { styled } from '../../stitches.config'
import Head from 'next/head'
import Base from '../../layouts/Base'
import stripHtml from '../../lib/strip-html'
import { getAllPosts, getPostBySlug } from '../../lib/blog'
import ListItem from '../../components/ListItem'
import FeaturedArticle from '../../components/FeaturedArticle'
import { ListGroup } from '../../components/ListGroup'
import { AnimateSharedLayout } from 'framer-motion'

export async function getStaticProps() {
  const allPosts = getAllPosts(['date', 'skip', 'slug', 'title'])

  const featuredParams = [
    'date',
    'slug',
    'title',
    'image',
    'content',
    'description',
  ]

  const featuredPosts = [
    getPostBySlug(
      'migrando-uma-aplicacao-de-grande-porte-do-vue3-para-o-vite',
      featuredParams
    ),
  ]

  return {
    props: {
      title: 'Blog // Michel Rodrigues',
      tagline: 'Histórias. Atualizações. Guias.',
      image: '/static/images/blog-bw.jpg',
      primaryColor: 'pink',
      secondaryColor: 'yellow',
      featuredPosts,
      allPosts,
    },
  }
}

function Blog(props) {
  const renderFeatured = () => {
    return props.featuredPosts.map((post, index) => {
      return (
        <FeaturedArticle
          key={index}
          index={index}
          href={`/blog/${post.slug}/`}
          title={post.title}
          description={post.description}
          image={post.image}
          stats={post.stats}
          content={post.content}
        />
      )
    })
  }

  const renderAll = () => {
    return props.allPosts.map((post, index) => {
      if (!post.skip) {
        return (
          <ListItem
            key={index}
            index={index}
            href={`/blog/${post.slug}/`}
            title={post.title}
            date={post.date}
          />
        )
      }
    })
  }

  const { title, image } = props
  const description = `Posts sobre desenvolvimento web, engenharia de software e carreira em tecnológia.`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://michelrodrigues.net/blog" property="og:url" />
        <meta
          content={`https://michelrodrigues.net${image}`}
          property="og:image"
        />
      </Head>

      <AnimateSharedLayout>
        <p dangerouslySetInnerHTML={{ __html: description }} />

        {props.featuredPosts.length && (
          <>
            <h2>Destaques</h2>
            <FeaturedArticles>{renderFeatured()}</FeaturedArticles>
          </>
        )}

        <h2>Todos</h2>
        <ListGroup>{renderAll()}</ListGroup>
      </AnimateSharedLayout>
    </>
  )
}

const FeaturedArticles = styled('div', {
  margin: '10px 0 0 -20px',
  '@bp2': { display: 'flex', justifyContent: 'space-between' },
})

Blog.Layout = Base

export default Blog
