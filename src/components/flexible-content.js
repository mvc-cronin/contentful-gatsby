import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import Container from './container'
import * as styles from './article-preview.module.css'

const FlexibleContent = ({ flexibleContent }) => {
  if (!flexibleContent) return null
  if (!Array.isArray(flexibleContent)) return null

  return (
    <Container>
      <ul className={styles.articleList}>
        {flexibleContent.map((block) => {
            return (
              <li key={block.id}>
                {block.title && (
                  <h2 className={styles.title}>{block.title}</h2>
                )}

                {block.content && (
                  <div
                    dangerouslySetInnerHTML={{
                    __html: block.content.childMarkdownRemark.html,
                    }}
                  />
                )}

                {block.image && (
                  <div className={styles.link}>
                    <GatsbyImage alt="{block.image.title}" image={block.image.gatsbyImageData} />
                  </div>
                )}

                {block.linkText && (
                  <div>
                    <Link to={block.linkUrl} className={styles.link}>
                      <h3>{block.linkText}</h3>
                    </Link>
                  </div>
                )}
              </li>
            )
        })}
      </ul>
    </Container>
  )
}

export default FlexibleContent
