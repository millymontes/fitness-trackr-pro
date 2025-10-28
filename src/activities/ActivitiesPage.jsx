import { useEffect, useState } from "react";
import { getActivities } from "../api/activities.js";
import { useAuth } from "../auth/AuthContext.jsx";
import ActivityForm from "./ActivityForm.jsx";
import ActivityList from "./ActivityList.jsx";

export default function ActivitiesPage() {
  const { token } = useAuth();

  const [activities, setActivities] = useState([]);

  const syncActivities = async () => {
    const data = await getActivities();
    setActivities(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    syncActivities();
  }, []);

  return (
    <section>
      <h1>Activities</h1>
      <ActivityList activities={activities} />
      {token && <ActivityForm syncActivities={syncActivities} />}
    </section>
  );
}
