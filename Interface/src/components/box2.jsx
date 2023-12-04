import { useState } from 'react'
import { MagicCard } from 'react-magic-motion'
import 'react-magic-motion/card.css'
import useDragger from '../hooks/useDragger'

function CloseFullscreenSvg() {
  return (
    <>
      <rect
        x="1"
        y="16"
        width="14"
        height="15"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M26 5L18 13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18 13H22"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18 13V9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        stroke="currentColor"
        strokeWidth="2"
      />
    </>
  )
}

function OpenFullscreenSvg() {
  return (
    <>
      <rect
        x="1"
        y="8"
        width="21"
        height="23"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M7 24L15 16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M15 16H11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M15 16V20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        stroke="currentColor"
        strokeWidth="2"
      />
    </>
  )
}

const Box = ({ id, name, styleClass, poster, text, date, tema }) => {
  useDragger(id)
  const [isCardExpanded, setIsCardExpanded] = useState(false)

  return (
    <div id={id} className={styleClass}>
      <span className="note-name">{name}</span>
      <MagicCard
        isCardExpanded={isCardExpanded}
        onBackgroundFadeClick={() => setIsCardExpanded(false)}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <div
          style={{
            width: isCardExpanded ? '40rem' : '17rem',
            gap: '1rem',
            display: 'flex',
            flexDirection: 'column',
            padding: '1.35rem 0',
            color: isCardExpanded ? 'white' : 'currentColor'
          }}
        >
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <button
              style={{ position: 'absolute', right: 90, zIndex: 9999 }}
              onClick={() => setIsCardExpanded(!isCardExpanded)}
            >
              <svg
                key="exclude"
                width="15"
                height="15"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isCardExpanded ? (
                  <CloseFullscreenSvg />
                ) : (
                  <OpenFullscreenSvg />
                )}
              </svg>
            </button>
          </div>

          <div style={{ overflowY: 'auto' }}>
            {isCardExpanded && (
              <section
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}
              >
                <h4 style={{ fontSize: '1.2em', fontWeight: 600 }}>{name}</h4>

                <p>{`Tema: ${tema}`}</p>

                <img src={poster} />

                <p>{text}</p>

                <p>{date}</p>
              </section>
            )}
          </div>
        </div>
      </MagicCard>
    </div>
  )
}

export default Box
