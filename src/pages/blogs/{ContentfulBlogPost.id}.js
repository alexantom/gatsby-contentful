import React from "react"
import * as PropTypes from "prop-types"

import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from "../../layouts"
import { rhythm } from "../../utils/typography"

const propTypes = {
  data: PropTypes.object.isRequired,
}

class ProductTemplate extends React.Component {
  render() {
    const blogPost = this.props.data.contentfulBlogPost
    const {
      title,
      description,
      updatedAt,
      image,
      author,
      id,
    } = blogPost
    const heroImage = image?.gatsbyImageData
    return (
      <Layout>
        <div
          style={{
            display: `flex`,
            justifyContent: `center`,
          }}
        >
          <GatsbyImage
              style={{ marginBottom: rhythm(1) }}
              image={heroImage}
          />
        </div>
        <h1 style={{ marginBottom: rhythm(1 / 2) }}>{title}</h1>
        <h4>Updated at {updatedAt}</h4>
        <div>
          <div
            dangerouslySetInnerHTML={{
              __html: description.childMarkdownRemark.html,
            }}
          />
          <div>
            <span>Author: </span>
            <div>
              <div>{author.name}</div>
              <div>{author.title}</div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

ProductTemplate.propTypes = propTypes

export default ProductTemplate

export const pageQuery = graphql`
  query($id: String!) {
    contentfulBlogPost(id: { eq: $id }) {
      id
      title
      updatedAt
      description {
        childMarkdownRemark {
          html
        }
      }
      image: heroImage {
        gatsbyImageData(width: 200)
      }
      author {
        name
        phone
        id
        title
      }
    }
  }
`
