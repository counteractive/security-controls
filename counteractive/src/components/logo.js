import React from 'react'
import Img from 'gatsby-image'
import { useStaticQuery, graphql } from 'gatsby'

export default function Logo() {
    const data = useStaticQuery(graphql`
      query {
        file(relativePath: { eq: "logo.png" }) {
          childImageSharp {
            fixed(width: 30, height: 27) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `)
    return <Img fixed={data.file.childImageSharp.fixed} />
  }