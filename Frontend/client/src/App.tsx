import {useEffect, useState} from "react"

function App() {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/api/activities')
    .then(response => response.json())
    .then(data => setActivities(data))
  }, [])
  const title = 'Welcome to Reactivities'
  return (
      <div>
        <h3 className="app" style={{color: 'red'}}>{title}</h3>
        <ul>
          {activities.map((activity: any) => (
            <li key={activity.id}>{activity.title}</li>
          ))}
        </ul>
      </div>
  )
}

export default App
