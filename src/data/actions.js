import db from './firebase';

// Collection and document Names
const COLL_EVENTS = 'events';
const COLL_TICKETS = 'tickets';
const COLL_UTILS = 'utils';
const COLL_REGISTRATIONS = 'registrations';

const getDocEvent = async eventID => {
  try {
    const eventRef = db.collection(COLL_EVENTS).doc(eventID);
    const snapshot = await eventRef.get();
    const data = await snapshot.data();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const addDocRegistration = async registration => {
  const newRegistration = await db.collection(COLL_REGISTRATIONS).add(registration);
  return newRegistration;
  // this.setState({ registrationID: newRegistration.id });
};

const actions = {};
actions.getDocEvent = getDocEvent;
actions.addDocRegistration = addDocRegistration;

export default actions;
