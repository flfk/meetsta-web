import { db } from './firebase';
import { storage } from './firebase';

// Collection and document Names
const COLL_ADD_ONS = 'addOns';
const COLL_DASHBOARD_USERS = 'dashboardUsers';
const COLL_EMAILS = 'emails';
const COLL_EVENTS = 'events';
const COLL_LEADERBOARD_SIGNUPS = 'leaderboardSignups';
const COLL_TICKETS = 'tickets';
const COLL_REGISTRATIONS = 'registrations';
const COLL_UTILS = 'utils';

const DOC_LAST_ORDER = 'lastOrder';

const STORAGE_MERCH_BASE_PATH = 'gs://online-meet-and-greets.appspot.com/merch/';
const STORAGE_MERCH_EXTENSION = '.png/';

const STORAGE_DASHBOARD_TEASER_PATH = 'gs://online-meet-and-greets.appspot.com/dashboardTeasers/';
const STORAGE_DASHBOARD_TEASER_EXTENSION = '.png/';

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

const getDocsEvent = async () => {
  try {
    const eventsRef = db.collection(COLL_EVENTS);
    const events = [];
    const snapshot = await eventsRef.get();
    snapshot.forEach(snap => {
      const event = snap.data();
      event.eventID = snap.id;
      events.push(event);
    });
    return events;
  } catch (error) {
    console.error('Error getting all event docs ', error);
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
      .collection(COLL_EVENTS)
      .doc(eventID)
      .collection(COLL_TICKETS);
    const snapshot = await ticketsRef.get();
    const tickets = [];
    snapshot.forEach(snap => {
      const ticket = snap.data();
      const { id } = snap;
      ticket.ticketID = id;
      tickets.push(ticket);
    });
    return tickets;
  } catch (error) {
    console.error('Error getting tickets ', error);
  }
};

const getDocEventTicket = async (eventID, ticketID) => {
  try {
    const ticketsRef = db
      .collection(COLL_EVENTS)
      .doc(eventID)
      .collection(COLL_TICKETS)
      .doc(ticketID);
    const snapshot = await ticketsRef.get();
    const data = await snapshot.data();
    const { id } = snapshot;
    const ticket = { ...data, ticketID: id };
    return ticket;
  } catch (error) {
    console.error('Error loading event ticket doc ', error);
  }
};

const getCollEventTicketAddOns = async (eventID, ticketID) => {
  try {
    const addOnsRef = db
      .collection(COLL_EVENTS)
      .doc(eventID)
      .collection(COLL_TICKETS)
      .doc(ticketID)
      .collection(COLL_ADD_ONS);
    const snapshot = await addOnsRef.get();
    const addOns = [];
    snapshot.forEach(snap => {
      const addOn = snap.data();
      addOn.addOnID = snap.id;
      addOns.push(addOn);
    });
    return addOns;
  } catch (error) {
    console.error('Error getting addOns ', error);
  }
};

const getCollAddOns = async eventID => {
  try {
    const addOnsRef = db
      .collection(COLL_EVENTS)
      .doc(eventID)
      .collection(COLL_ADD_ONS);
    const snapshot = await addOnsRef.get();
    const addOns = [];
    snapshot.forEach(snap => {
      const addOn = snap.data();
      const { addOnID } = snap;
      addOn.addOnID = addOnID;
      addOns.push(addOn);
    });
    return addOns;
  } catch (error) {
    console.error('Error getting addOns ', error);
  }
};

const addDocTicket = async ticket => {
  const newTicket = await db.collection(COLL_TICKETS).add(ticket);
  return newTicket;
};

const getDocTicket = async ticketID => {
  const ticketRef = db.collection(COLL_TICKETS).doc(ticketID);
  const snapshot = await ticketRef.get();
  return snapshot.data();
};

const updateDocTicket = async (ticketID, ticket) => {
  try {
    const ticketRef = db.collection(COLL_TICKETS).doc(ticketID);
    const updatedDocTicket = ticketRef.update({ ...ticket });
    return updatedDocTicket;
  } catch (error) {
    console.error('Error updating ticket ', error);
  }
  return {};
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

const addDocEmailRequest = async emailRequest => {
  const email = await db.collection(COLL_EMAILS).add(emailRequest);
  return email;
};

// LEADERBOARD RELATED

const fetchDashboardTeaserImgURL = async username => {
  let downloadURL = null;
  try {
    const refPath = STORAGE_DASHBOARD_TEASER_PATH + username + STORAGE_DASHBOARD_TEASER_EXTENSION;
    downloadURL = await storage.refFromURL(refPath).getDownloadURL();
  } catch (error) {
    console.error('Actions, fetchMerchImgUrl', error);
  }
  return downloadURL;
};

const fetchMerchImgUrl = async merchID => {
  let downloadURL = null;
  try {
    const refPath = STORAGE_MERCH_BASE_PATH + merchID + STORAGE_MERCH_EXTENSION;
    downloadURL = await storage.refFromURL(refPath).getDownloadURL();
  } catch (error) {
    console.error('Actions, fetchMerchImgUrl', error);
  }
  return downloadURL;
};

const leaderboardSignup = async user => {
  try {
    await db.collection(COLL_LEADERBOARD_SIGNUPS).add(user);
  } catch (error) {
    console.error('Actions, leaderboardSignup, ', error);
  }
};

// EXPORTS

const actions = {};

actions.getDocEvent = getDocEvent;
actions.getDocsEvent = getDocsEvent;
actions.getCollEventTickets = getCollEventTickets;
actions.getDocEventTicket = getDocEventTicket;
actions.getCollEventTicketAddOns = getCollEventTicketAddOns;
actions.getCollAddOns = getCollAddOns;

actions.getDocsRegistrations = getDocsRegistrations;
actions.addDocRegistration = addDocRegistration;
actions.getDocRegistration = getDocRegistration;
actions.updateDocRegistration = updateDocRegistration;

actions.addDocTicket = addDocTicket;
actions.getDocTicket = getDocTicket;
actions.updateDocTicket = updateDocTicket;
actions.getNewOrderNum = getNewOrderNum;
actions.getDocsTicketsSold = getDocsTicketsSold;

actions.addDocEmailRequest = addDocEmailRequest;

actions.fetchDashboardTeaserImgURL = fetchDashboardTeaserImgURL;
actions.fetchMerchImgUrl = fetchMerchImgUrl;
actions.leaderboardSignup = leaderboardSignup;

export default actions;
