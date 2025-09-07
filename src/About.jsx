function About() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'flex-start',
      padding: '40px',
      color: 'white'
    }}>
      <h2 style={{ fontSize: '60px', margin: 0, color: 'white' }}>
        About{' '}
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

      {/* Problem Section */}
      <h3 style={{ fontSize: '28px', marginTop: '30px' }}>🎯 Problem We are solving</h3>
      <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
        Today, clubs (technical, cultural, debate, etc.) in IITs/NITs operate in silos.
        <br />Within the same college: Lack of coordination → event clashes, duplicate efforts.
        <br />Across colleges: No common space to collaborate (hackathons, debates, fests).
      </p>

      {/* Features Section */}
      <h3 style={{ fontSize: '28px', marginTop: '30px' }}>🛠 Platform Features</h3>
      <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
        <strong>1️⃣ College-Level Collaboration (Intra-college)</strong>
        <br />• Clubs create profiles (description, members, type: tech, cultural, debate, etc.)
        <br />• Dashboard of upcoming events (calendar view)
        <br />• Message board / announcements (like mini-Reddit for clubs)
        <br />• Conflict detection
        <br /><br />
        <strong>2️⃣ Inter-College Collaboration</strong>
        <br />• Clubs from different IITs/NITs can connect
        <br />• Collaboration requests
        <br />• Central event calendar for inter-college fests/collabs
      </p>

      {/* Tech Stack Section */}
      <h3 style={{ fontSize: '28px', marginTop: '30px' }}>📂 Tech Stack</h3>
      <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
        • Frontend → React (UI), Next.js (routing, SEO, SSR)
        <br />• Backend → Node.js + Express (APIs)
        <br />• Database → MySQL (clubs, members, events, messages)
        <br />• Deployment → Vercel (frontend), Render/Railway (backend), PlanetScale (MySQL hosting)
        <br />• Deployment/Integration → GitHub repo, CI/CD, Vercel + Render + DB hosting
      </p>
    </div>
  )
}

export default About
