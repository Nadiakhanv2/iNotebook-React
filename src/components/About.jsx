import React, {useContext, useEffect} from 'react'
import NoteContext from '../context/notes/noteContext'

const About = () => {
  const a = useContext(NoteContext)

  useEffect(() => {
    a.update();
    // eslint-disable-next-line
  }, [])


  return (
    <div>
      Hey, This is  {a.state.name} and she is in {a.state.class}
    </div>
  )
}

export default About
