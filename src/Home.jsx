function Home() {

  return (
      <div style={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  flexDirection: 'column',
  backgroundColor: 'transparent',
}}>
  <h2 style={{ color: 'white', fontSize: '60px' }}>
    Welcome to{' '}
    <span style={{
      background: 'linear-gradient(45deg, rgb(255, 215, 0), rgb(255, 165, 0))',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      color: 'transparent'
    }}>
      ClubSync
    </span>
  </h2>
  <p style={{ color: 'white', fontSize: '30px' }}>Ultimate platform for clubs all over India to connect, collabrate and grow</p>
</div>

  )
}

export default Home
