import React from 'react'
import Head from 'next/head'

import profileImage from '../assets/profile.jpg'
import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";
import { FaMediumM } from 'react-icons/fa';

import { Container, Card } from '../styles/pages/Home'

const Home: React.FC = () => {
  return (
    <Container>
      <Head>
        <title>Michel Rodrigues</title>
      </Head>

      <Card>
        <img src={profileImage} alt="Michel Rodrigues" />
        <h1>
          Michel Rodrigues
        </h1>
        <span>Software Engineer</span>
        <div>
          <a href="https://github.com/sobreirami/" target="_blank"><FiGithub /></a>
          <a href="https://www.linkedin.com/in/michel-rodrigues-85a1bb58/" target="_blank"><FiLinkedin /></a>
          <a href="https://medium.com/@Sobreira" target="_blank"><FaMediumM /></a>
          <a href="https://www.instagram.com/sobreirami/" target="_blank"><FiInstagram /></a>
        </div>
      </Card>
    </Container>
  )
}

export default Home
