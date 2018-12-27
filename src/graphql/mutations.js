// eslint-disable
// this is an auto generated file. This will be overwritten

export const createJourney = `mutation CreateJourney($input: CreateJourneyInput!) {
  createJourney(input: $input) {
    id
    code
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
export const updateJourney = `mutation UpdateJourney($input: UpdateJourneyInput!) {
  updateJourney(input: $input) {
    id
    code
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
export const deleteJourney = `mutation DeleteJourney($input: DeleteJourneyInput!) {
  deleteJourney(input: $input) {
    id
    code
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
export const createSchedule = `mutation CreateSchedule($input: CreateScheduleInput!) {
  createSchedule(input: $input) {
    id
    day
    time
    journey {
      id
      code
      from
      to
    }
  }
}
`;
export const updateSchedule = `mutation UpdateSchedule($input: UpdateScheduleInput!) {
  updateSchedule(input: $input) {
    id
    day
    time
    journey {
      id
      code
      from
      to
    }
  }
}
`;
export const deleteSchedule = `mutation DeleteSchedule($input: DeleteScheduleInput!) {
  deleteSchedule(input: $input) {
    id
    day
    time
    journey {
      id
      code
      from
      to
    }
  }
}
`;
export const createTrip = `mutation CreateTrip($input: CreateTripInput!) {
  createTrip(input: $input) {
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
export const updateTrip = `mutation UpdateTrip($input: UpdateTripInput!) {
  updateTrip(input: $input) {
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
export const deleteTrip = `mutation DeleteTrip($input: DeleteTripInput!) {
  deleteTrip(input: $input) {
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
export const createPassenger = `mutation CreatePassenger($input: CreatePassengerInput!) {
  createPassenger(input: $input) {
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
export const updatePassenger = `mutation UpdatePassenger($input: UpdatePassengerInput!) {
  updatePassenger(input: $input) {
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
export const deletePassenger = `mutation DeletePassenger($input: DeletePassengerInput!) {
  deletePassenger(input: $input) {
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
export const createStop = `mutation CreateStop($input: CreateStopInput!) {
  createStop(input: $input) {
    id
    journey {
      id
      code
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
export const updateStop = `mutation UpdateStop($input: UpdateStopInput!) {
  updateStop(input: $input) {
    id
    journey {
      id
      code
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
export const deleteStop = `mutation DeleteStop($input: DeleteStopInput!) {
  deleteStop(input: $input) {
    id
    journey {
      id
      code
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
