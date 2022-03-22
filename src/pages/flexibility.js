import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import Seo from '../components/seo'
import Layout from '../components/layout'
import Hero from '../components/hero'
import FlexibleContent from '../components/flexible-content'
import * as styles from '../templates/blog-post.module.css'

class FlexibilityIndex extends React.Component {
  render() {
    const flexibilityPage = get(this, 'props.data.contentfulPage')

    return (
      <Layout location={this.props.location}>
        <Seo
          title={flexibilityPage.title}
          description={flexibilityPage.description.childMarkdownRemark.excerpt}
          image={`http:${flexibilityPage.heroImage.resize.src}`}
        />
        <Hero
          image={flexibilityPage.heroImage.gatsbyImageData}
          title={flexibilityPage.heroImage.title}
          content={flexibilityPage.description?.childMarkdownRemark?.excerpt}
        />
        <div className={styles.container}>
          <div className={styles.article}>
            <FlexibleContent flexibleContent={flexibilityPage.flexibleContent} />
            {/* <pre>{JSON.stringify(flexibilityPage.flexibleContent, null, 2)}</pre> */}
          </div>
        </div>
      </Layout>
    )
  }
}

export default FlexibilityIndex

export const pageQuery = graphql`
query FlexibilityPageQuery {
    contentfulPage(contentful_id: {eq: "myks2Spm0jCiXCCZvaUyS"}) {
      description {
        childMarkdownRemark {
          excerpt
        }
      }
      heroImage {
        title
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, width: 1280)
        resize(height: 630, width: 1200) {
          src
        }
      }
      title
      flexibleContent {
        ... on ContentfulFlexibleCallToAction {
          id
          internal {
            type
          }
          content {
            childMarkdownRemark {
              html
            }
          }
          linkText
          linkUrl
          sys {
            type
          }
        }
        ... on ContentfulFlexibleImage {
          id
          internal {
            type
          }
          image {
            gatsbyImageData(
              layout: FULL_WIDTH,
              placeholder: BLURRED,
              width: 424,
              height: 212
              )
            title
            sys {
              type
            }
          }
        }
        ... on ContentfulFlexibleText {
          id
          internal {
            type
          }
          title
          content {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`
