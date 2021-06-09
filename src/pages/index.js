import React from "react"
import * as PropTypes from "prop-types"

import { Link, graphql } from "gatsby"
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"

import { rhythm } from "../utils/typography"
import Layout from "../layouts"

const propTypes = {
  data: PropTypes.object.isRequired,
}

const Blog = ({ node }) => {
  return (
    <div>
      <Link
        style={{ color: `inherit`, textDecoration: `none` }}
        to={node.gatsbyPath}
      >
        <div
          style={{
            display: `flex`,
            alignItems: `center`,
            borderBottom: `1px solid lightgray`,
            paddingBottom: rhythm(1 / 2),
            marginBottom: rhythm(1 / 2),
          }}
        >
          <div style={{ marginRight: rhythm(1 / 2) }}>
            <GatsbyImage
                style={{ margin: 0 }}
                image={node.image.gatsbyImageData}
            />
          </div>


          <div style={{ flex: 1 }}><Link to={node.gatsbyPath}>{node.title}</Link></div>
        </div>
      </Link>
    </div>
  )
}

class IndexPage extends React.Component {
  render() {
    const blogEdges = this.props.data.allContentfulBlogPost.edges
    return (
      <Layout>
        <div style={{ marginBottom: rhythm(2) }}>
          <h2>{`Gatsby's`} integration with the Contentful Image API</h2>
          <Link to="/image-api/">See examples</Link>
          <br />
          <div>
              <StaticImage src="https://images.unsplash.com/photo-1619538189193-2c20c210f8b6?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="A dinosaur" />
          </div>
          <br />
          <br />
          <h2>Localization</h2>
          <p>
            The <code>gatsby-source-contentful</code> plugin offers full support
            for {`Contentful's`} localization features. Our sample space
            includes products localized into both English and German.
          </p>
          <p>
            An entry and asset node are created for each locale following
            fallback rules for missing localization. In addition, each node has
            an additional field added, <code>node_locale</code> so you can
            select for nodes from a single locale
          </p>
          <h3>Blogs</h3>

          {blogEdges.map(({ node }, i) => (
              <Blog node={node} key={node.id} />
          ))}
          <br />
          <br />

        </div>
      </Layout>
    )
  }
}

IndexPage.propTypes = propTypes

export default IndexPage

export const pageQuery = graphql`
  query {
    allContentfulBlogPost {
      edges {
        node {
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
    }
  }
`
