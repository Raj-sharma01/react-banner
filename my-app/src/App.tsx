import './App.css'

function App() {
  const logoUrl: string = 'https://static.www.nfl.com/t_person_squared_mobile/f_auto/league/api/clubs/logos/ARI'
  const middleColor: string = 'black'
  const rightColor: string = '#780b38'

  const name: string = 'Arizona Cardinals'
  const division: string = 'NFC West'
  const id: string = 'GNAWS23RDT5UYR'

  return (
    <>
      <div
        className="skew-wrapper"
        style={{
          ['--middle-color' as string]: middleColor,
          ['--right-color' as string]: rightColor,
        }}
      >
        <div className="skew-content">
          <div className="section left" />
          <div className="section middle">
            <div className="logo-anchor">
              <img src={logoUrl} className="logo" />
            </div>
          </div>
          <div className="section right" />
        </div>
        <div className='details-container'>
          <div className='name'>{name}</div>
          <div className='division'>{division}</div>
          <div className='id'>{id}</div>
        </div>
      </div>
    </>
  )
}

export default App
