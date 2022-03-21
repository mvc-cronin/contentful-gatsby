import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import Seo from '../components/seo'
import Layout from '../components/layout'
import Hero from '../components/hero'
import ArticlePreview from '../components/article-preview'

class NewsIndex extends React.Component {
  render() {
    const posts = get(this, 'props.data.allContentfulBlogPost.nodes')

    return (
      <Layout location={this.props.location}>
        <Seo title="News" />
        <Hero title="News" />
        <ArticlePreview posts={posts} />
      </Layout>
    )
  }
}

export default NewsIndex

export const pageQuery = graphql`
  query NewsIndexQuery {
    allContentfulBlogPost(
      filter: { category: { slug: { eq: "news" } } }
      sort: { fields: [publishDate], order: DESC }
    ) {
      nodes {
        title
        category {
          slug
        }
        slug
        publishDate(formatString: "MMMM Do, YYYY")
        tags
        heroImage {
          gatsbyImageData(
            layout: FULL_WIDTH
            placeholder: BLURRED
            width: 424
            height: 212
          )
        }
        description {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`
