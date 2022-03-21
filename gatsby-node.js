const path = require('path')

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPostTemplate = path.resolve('./src/templates/blog-post.js')
  const newsPostTemplate = path.resolve('./src/templates/news-post.js')

  // Define a query for blog posts
  const blogResult = await graphql(
    `
      {
        allContentfulBlogPost(
          filter: { category: { slug: { eq: "blog" } } }
        ) {
          nodes {
            title
            slug
            category {
              slug
            }
          }
        }
      }
    `
  )
  if (blogResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Contentful blog posts`,
      blogResult.errors
    )
    return
  }
  // Create blog posts pages
  // But only if there's at least one blog post found in Contentful
  // `context` is available in the template as a prop and as a variable in GraphQL
  const blogPosts = blogResult.data.allContentfulBlogPost.nodes
  if (blogPosts.length > 0) {
    blogPosts.forEach((blogPost, index) => {
      const previousBlogPostSlug = index === 0 ? null : blogPosts[index - 1].slug
      const nextBlogPostSlug =
        index === blogPosts.length - 1 ? null : blogPosts[index + 1].slug

      createPage({
        path: `/blog/${blogPost.slug}/`,
        component: blogPostTemplate,
        context: {
          slug: blogPost.slug,
          previousBlogPostSlug,
          nextBlogPostSlug,
        },
      })
    })
  }

  // Define a query for news posts
  const newsResult = await graphql(
    `
      {
        allContentfulBlogPost(
          filter: { category: { slug: { eq: "news" } } }
        ) {
          nodes {
            title
            slug
            category {
              slug
            }
          }
        }
      }
    `
  )
  if (newsResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Contentful news posts`,
      newsResult.errors
    )
    return
  }
  // Create news posts pages
  // But only if there's at least one news post found in Contentful
  // `context` is available in the template as a prop and as a variable in GraphQL
  const newsPosts = newsResult.data.allContentfulBlogPost.nodes
  if (newsPosts.length > 0) {
    newsPosts.forEach((newsPost, index) => {
      const previousNewsPostSlug = index === 0 ? null : newsPosts[index - 1].slug
      const nextNewsPostSlug =
        index === newsPosts.length - 1 ? null : newsPosts[index + 1].slug

      createPage({
        path: `/news/${newsPost.slug}/`,
        component: newsPostTemplate,
        context: {
          slug: newsPost.slug,
          previousNewsPostSlug,
          nextNewsPostSlug,
        },
      })
    })
  }
}
