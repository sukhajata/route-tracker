// eslint-disable
// this is an auto generated file. This will be overwritten

export const getJourney = `query GetJourney($id: ID!) {
  getJourney(id: $id) {
    id
    from
    to
    schedule {
      items {
        id
        day
        time
      }
      nextToken
    }
    stops {
      items {
        id
        name
        latitude
        longitude
        address
      }
      nextToken
    }
  }
}
`;
export const listJourneys = `query ListJourneys(
  $filter: ModelJourneyFilterInput
  $limit: Int
  $nextToken: String
) {
  listJourneys(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      from
      to
      schedule {
        items {
          id
          day
          time
        }
        nextToken
      }
      stops {
        items {
          id
          name
          latitude
          longitude
          address
        }
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getSchedule = `query GetSchedule($id: ID!) {
  getSchedule(id: $id) {
    id
    day
    time
    journey {
      id
      from
      to
    }
  }
}
`;
export const listSchedules = `query ListSchedules(
  $filter: ModelScheduleFilterInput
  $limit: Int
  $nextToken: String
) {
  listSchedules(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      day
      time
      journey {
        id
        from
        to
      }
    }
    nextToken
  }
}
`;
export const getTrip = `query GetTrip($id: ID!) {
  getTrip(id: $id) {
    id
    date
    scheduleId
    passengers {
      items {
        id
        name
        seat
        stopId
      }
      nextToken
    }
  }
}
`;
export const listTrips = `query ListTrips(
  $filter: ModelTripFilterInput
  $limit: Int
  $nextToken: String
) {
  listTrips(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      date
      scheduleId
      passengers {
        items {
          id
          name
          seat
          stopId
        }
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getPassenger = `query GetPassenger($id: ID!) {
  getPassenger(id: $id) {
    id
    trip {
      id
      date
      scheduleId
    }
    name
    seat
    stopId
  }
}
`;
export const listPassengers = `query ListPassengers(
  $filter: ModelPassengerFilterInput
  $limit: Int
  $nextToken: String
) {
  listPassengers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      trip {
        id
        date
        scheduleId
      }
      name
      seat
      stopId
    }
    nextToken
  }
}
`;
export const getStop = `query GetStop($id: ID!) {
  getStop(id: $id) {
    id
    journey {
      id
      from
      to
    }
    name
    latitude
    longitude
    address
  }
}
`;
export const listStops = `query ListStops(
  $filter: ModelStopFilterInput
  $limit: Int
  $nextToken: String
) {
  listStops(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      journey {
        id
        from
        to
      }
      name
      latitude
      longitude
      address
    }
    nextToken
  }
}
`;
