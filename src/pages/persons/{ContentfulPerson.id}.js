import React from "react"
import * as PropTypes from "prop-types"

import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from "../../layouts"
import { rhythm } from "../../utils/typography"

const propTypes = {
  data: PropTypes.object.isRequired,
}

class PersonTemplate extends React.Component {
  render() {
    const person = this.props.data.contentfulPerson
    const {
      title,
      phone,
      image,
      twitter,
    } = person
    const profileImg = image.gatsbyImageData
    return (
      <Layout>
        <div
          style={{
            display: `flex`,
            alignItems: `center`,
            marginBottom: rhythm(1),
          }}
        >
          <GatsbyImage
              style={{
                marginRight: rhythm(1 / 2),
              }}
              image={profileImg}
          />
        </div>
        <div>
          <h2>Authors</h2>
          <div>{title}</div>
          <div>{phone}</div>
          <div>{twitter}</div>
        </div>
      </Layout>
    )
  }
}

PersonTemplate.propTypes = propTypes

export default PersonTemplate

export const pageQuery = graphql`
  query($id: String!) {
  contentfulPerson(id: { eq: $id }) {
      id
      phone
      title
      twitter
      image {
        gatsbyImageData(layout: FIXED, width: 60)
      }
    }
  }
`
