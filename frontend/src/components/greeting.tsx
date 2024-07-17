'use client'

import { Typewriter } from 'react-simple-typewriter'

export default function Greeting() {
  return (
    <div>
        <h1 className="text-center text-5xl lg:text-6xl font-bold">Fullstack {''}
            <span>
            <Typewriter
                words={['Test', 'Challange', 'Study']}
                loop={5}
                cursor
                cursorStyle='_'
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
            />
            </span>
        </h1>
    </div>
  )
}
