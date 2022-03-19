import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import Seo from '../components/seo'
import Layout from '../components/layout'
import Hero from '../components/hero'
import * as styles from '../templates/blog-post.module.css'

class RootIndex extends React.Component {
  render() {
    const [homePage] = get(this, 'props.data.allContentfulHomePage.nodes')

    return (
      <Layout location={this.props.location}>
        <Seo
          title={homePage.title}
          description={homePage.description.childMarkdownRemark.excerpt}
          image={`http:${homePage.heroImage.resize.src}`}
        />
        <Hero
          image={homePage.heroImage.gatsbyImageData}
          title={homePage.heroImage.title}
          content={homePage.description?.childMarkdownRemark?.excerpt}
        />
        <div className={styles.container}>
          <div className={styles.article}>
            <div
              className={styles.body}
              dangerouslySetInnerHTML={{
                __html: homePage.body?.childMarkdownRemark?.html,
              }}
            />
          </div>
        </div>
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    allContentfulHomePage(
      filter: { contentful_id: { eq: "CFCRzGRd9teOMOtifKVov" } }
    ) {
      nodes {
        title
        description {
          childMarkdownRemark {
            excerpt
          }
        }
        heroImage {
          title
          description
          gatsbyImageData(
            layout: FULL_WIDTH,
            placeholder: BLURRED,
            width: 1280
          )
          resize(height: 630, width: 1200) {
            src
          }
        }
        body {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`
