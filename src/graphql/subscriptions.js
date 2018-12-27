// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateJourney = `subscription OnCreateJourney {
  onCreateJourney {
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
export const onUpdateJourney = `subscription OnUpdateJourney {
  onUpdateJourney {
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
export const onDeleteJourney = `subscription OnDeleteJourney {
  onDeleteJourney {
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
export const onCreateSchedule = `subscription OnCreateSchedule {
  onCreateSchedule {
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
export const onUpdateSchedule = `subscription OnUpdateSchedule {
  onUpdateSchedule {
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
export const onDeleteSchedule = `subscription OnDeleteSchedule {
  onDeleteSchedule {
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
export const onCreateTrip = `subscription OnCreateTrip {
  onCreateTrip {
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
export const onUpdateTrip = `subscription OnUpdateTrip {
  onUpdateTrip {
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
export const onDeleteTrip = `subscription OnDeleteTrip {
  onDeleteTrip {
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
export const onCreatePassenger = `subscription OnCreatePassenger {
  onCreatePassenger {
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
export const onUpdatePassenger = `subscription OnUpdatePassenger {
  onUpdatePassenger {
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
export const onDeletePassenger = `subscription OnDeletePassenger {
  onDeletePassenger {
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
export const onCreateStop = `subscription OnCreateStop {
  onCreateStop {
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
export const onUpdateStop = `subscription OnUpdateStop {
  onUpdateStop {
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
export const onDeleteStop = `subscription OnDeleteStop {
  onDeleteStop {
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
