import { styled } from '../stitches.config'
import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { parseISO, format, intervalToDuration } from 'date-fns'
import Base from '../layouts/Base'
import stripHtml from '../lib/strip-html'
import items from '../data/about'

export async function getStaticProps() {
  const meta = {
    title: 'Sobre // Michel Rodrigues',
    description: 'Michel Rodrigues ',
    tagline: 'Sobre. Carreira.',
    image: '/static/images/about-bw.jpg',
    primaryColor: 'orange',
    secondaryColor: 'yellow',
  }

  return { props: meta }
}

function About(props) {
  const { title, description, image } = props

  const renderIntro = () => {
    return (
      <Container>
        <Section>
          <Image
            alt="Michel"
            src="/static/images/michel.jpg"
            width="380"
            height="380"
            priority
          />
        </Section>
        <Section>
          <Paragraph
            css={{
              marginTop: '16px',
              '@bp2': { marginTop: '-6px' },
            }}
          >
            Olá, Eu sou <strong>Michel Rodrigues</strong>. Iniciei no mundo da
            programação em 2011, trabalhando com{' '}
            <strong>PHP e Javascript</strong>.
          </Paragraph>
          <Paragraph>
            Trabalho principalmente com desenvolvimento web e mobile, utilizando
            stacks como{' '}
            <strong>React, React Native, Next.js e serviços GCP</strong>. Minha
            missão é proporcionar soluções front-end que sejam{' '}
            <strong>intuitivas, acessíveis e de alto desempenho</strong>.
          </Paragraph>
          <Paragraph>
            Busco constantemente
            <strong>
              {' '}
              ampliar meus conhecimento e compartilhar o que aprendi durante
              minha jornadas
            </strong>
            .
          </Paragraph>
        </Section>
      </Container>
    )
  }

  const renderAll = () => {
    return items.map((item, index) => {
      return (
        <div style={{ marginBottom: 40 }} key={index}>
          <h3>{item.jobTitle}</h3>
          <p style={{ margin: 0 }}>
            <>
              {item.companyUrl !== '#' ? (
                <a href={item.companyUrl} target="_blank">
                  {item.company}
                </a>
              ) : (
                <strong
                  style={{
                    textDecoration: 'underline',
                  }}
                >
                  {item.company}
                </strong>
              )}
            </>
            <span> • {item.location}</span>
          </p>
          <p style={{ margin: 0 }}>
            <span>{format(parseISO(item.startDate), 'LLL yyyy')}</span>
            <span> – </span>
            <span>
              {item.endDate
                ? format(parseISO(item.endDate), 'LLL yyyy')
                : 'Present'}
            </span>
            <span> • </span>
            <span>{getDuration(item.startDate, item.endDate)}</span>
          </p>
        </div>
      )
    })
  }

  const getDuration = (startDate, endDate) => {
    const durationObj = intervalToDuration({
      start: parseISO(startDate),
      end: endDate ? parseISO(endDate) : new Date(),
    })

    let durationStr = ''

    if (durationObj.years > 1) {
      durationStr = `${durationObj.years} anos `
    } else if (durationObj.years === 1) {
      durationStr = `${durationObj.years} ano `
    }

    if (durationObj.months > 0) {
      durationStr += `${durationObj.months} meses`
    }

    return durationStr
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://michelrodrigues.net/about" property="og:url" />
        <meta
          content={`https://michelrodrigues.net${image}`}
          property="og:image"
        />
      </Head>

      {renderIntro()}

      <h2>Carreira</h2>
      {renderAll()}
    </>
  )
}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  '@bp2': { flexDirection: 'row' },
})

const Paragraph = styled('p', {
  '@bp2': { margin: '15px 0' },
})

const Section = styled('div', {
  marginTop: '0px',
  width: 'auto',
  '@bp2': { width: '48%' },
})

About.Layout = Base

export default About
