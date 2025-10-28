const API = import.meta.env.VITE_API;

export async function getActivities() {
  try {
    const response = await fetch(API + "/activities");
    const result = await response.json();

    if (Array.isArray(result)) return result;
    if (result && Array.isArray(result.data)) return result.data;

    // Unexpected shape — log for debugging and return empty array // got help ! i could nottt figure this out for the life of m e
    console.warn("getActivities: unexpected response shape", result);
    return [];
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function getActivity(id) {
  try {
    const response = await fetch(API + "/activities/" + id);
    const result = await response.json();
    // If the API wraps the activity in a `data` property, unwrap it.
    if (result && result.data) return result.data;
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function createActivity(token, activity) {
  if (!token) {
    throw Error("You must be signed in to create an activity.");
  }

  const response = await fetch(API + "/activities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(activity),
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}

export async function deleteActivity(token, id) {
  if (!token) {
    throw Error("You must be signed in to delete an activity.");
  }

  const response = await fetch(API + "/activities/" + id, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token },
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}
