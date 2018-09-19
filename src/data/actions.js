import db from './firebase';

// Collection and document Names
const COLL_EVENTS = 'events';
const COLL_TICKETS = 'tickets';
const COLL_UTILS = 'utils';
const COLL_REGISTRATIONS = 'registrations';

const DOC_LAST_ORDER = 'lastOrder';

// TODO MAKE DYNAMIC
const ADD_ONS = [
  { name: 'Additional 5 minutes', price: 8, extraMins: 5 },
  { name: 'Autographed selfie from your meet and greet', price: 2 },
  { name: 'Follow back and comment on your most recent', price: 5 },
  { name: 'Personalized thank you video', price: 5 },
  { name: 'Video recording of your meet and greet', price: 10 }
];

const getDocEvent = async eventID => {
  try {
    const eventRef = db.collection(COLL_EVENTS).doc(eventID);
    const snapshot = await eventRef.get();
    const data = await snapshot.data();
    return data;
  } catch (error) {
    console.error('Error getting event doc ', error);
  }
};

const getDocsRegistrations = async eventID => {
  const registrations = [];
  const registrationsRef = db.collection(COLL_REGISTRATIONS);
  const snapshot = await registrationsRef.where('eventID', '==', eventID).get();
  snapshot.forEach(snap => {
    const registration = snap.data();
    registration.id = snap.id;
    registrations.push(registration);
  });
  return registrations;
};

const addDocRegistration = async registration => {
  const newRegistration = await db.collection(COLL_REGISTRATIONS).add(registration);
  return newRegistration;
};

const getDocRegistration = async registrationID => {
  try {
    const registrationRef = db.collection(COLL_REGISTRATIONS).doc(registrationID);
    const snapshot = await registrationRef.get();
    const data = await snapshot.data();
    return data;
  } catch (error) {
    console.error('Error loading registration ', error);
  }
  return {};
};

const updateDocRegistration = async (registrationID, registration) => {
  try {
    const registrationRef = db.collection(COLL_REGISTRATIONS).doc(registrationID);
    const updatedDocRegistration = registrationRef.update({ ...registration });
    return updatedDocRegistration;
  } catch (error) {
    console.error('Error updating registration ', error);
  }
  return {};
};

const getCollEventTickets = async eventID => {
  try {
    const ticketsRef = db
      .collection('events')
      .doc(eventID)
      .collection('tickets');
    const snapshot = await ticketsRef.get();
    const tickets = [];
    snapshot.forEach(snap => {
      const ticket = snap.data();
      const { id } = snap;
      ticket.ticketID = id;
      ticket['addOns'] = ADD_ONS;
      tickets.push(ticket);
    });
    return tickets;
  } catch (error) {
    console.error('Error getting tickets ', error);
  }
};

const addDocTicket = async ticket => {
  const newTicket = await db.collection(COLL_TICKETS).add(ticket);
  return newTicket;
};

const getNewOrderNum = async () => {
  const lastOrderRef = db.collection(COLL_UTILS).doc(DOC_LAST_ORDER);
  const snapshot = await lastOrderRef.get();
  const data = await snapshot.data();
  const newOrderNum = data.orderNum + 1;
  await lastOrderRef.set({ orderNum: newOrderNum });
  return data.orderNum + 1;
};

const getDocsTicketsSold = async eventID => {
  const ticketsSold = [];
  const ticketsRef = db.collection(COLL_TICKETS);
  const snapshot = await ticketsRef.where('eventID', '==', eventID).get();
  snapshot.forEach(snap => {
    const ticket = snap.data();
    ticketsSold.push(ticket);
  });
  return ticketsSold;
};

const actions = {};
actions.getDocEvent = getDocEvent;
actions.getDocsRegistrations = getDocsRegistrations;
actions.addDocRegistration = addDocRegistration;
actions.getDocRegistration = getDocRegistration;
actions.updateDocRegistration = updateDocRegistration;
actions.getCollEventTickets = getCollEventTickets;
actions.addDocTicket = addDocTicket;
actions.getNewOrderNum = getNewOrderNum;
actions.getDocsTicketsSold = getDocsTicketsSold;

export default actions;
