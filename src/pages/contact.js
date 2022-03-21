import React from 'react';
import { graphql } from 'gatsby';
import { FormiumForm } from '@formium/react';
import { formium } from '../lib/formium';

import Seo from '../components/seo'
import Layout from '../components/layout'
import Hero from '../components/hero'
import * as styles from '../templates/blog-post.module.css'

export default function FeedbackForm({ data }) {
  const [success, setSuccess] = React.useState(false);

  if (success) {
    return (
      <Layout location="contact">
        <Seo
          title="Contact"
          description="Contact Us"
          image={`http:${data.contentfulAsset.resize.src}`}
        />
        <Hero
          image={data.contentfulAsset.gatsbyImageData}
          title="Contact"
          content="Contact Form Below"
        />
        <div className={styles.container}>
          <div className={styles.article}>
            <div className={styles.body}>
              <div>Thank you! Your response has been recorded.</div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout location="contact">
      <Seo
        title="Contact"
        description="Contact Us"
        image={`http:${data.contentfulAsset.resize.src}`}
      />
      <Hero
        image={data.contentfulAsset.gatsbyImageData}
        title="Contact"
        content="Contact Form Below"
      />
      <div className={styles.container}>
        <div className={styles.article}>
          <div className={styles.body}>
            <FormiumForm
              data={data.formiumForm}
              onSubmit={async (values) => {
                // Send form values to Formium
                await formium.submitForm('contact', values);
                setSuccess(true);
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const query = graphql`
{
    formiumForm(slug: { eq: "contact" }) {
      id
      createAt
      name
      projectId
      schema
      slug
      updateAt
      version
    }
    contentfulAsset(contentful_id: {eq: "392YZxjPZFefJsv3jkCWpd"}) {
      gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, width: 1280)
      resize(height: 630, width: 1200) {
        src
      }
    }
  }
`;
