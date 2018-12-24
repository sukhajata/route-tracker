// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateJourney = `subscription OnCreateJourney {
  onCreateJourney {
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
export const onUpdateJourney = `subscription OnUpdateJourney {
  onUpdateJourney {
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
export const onDeleteJourney = `subscription OnDeleteJourney {
  onDeleteJourney {
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
export const onCreateSchedule = `subscription OnCreateSchedule {
  onCreateSchedule {
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
export const onUpdateSchedule = `subscription OnUpdateSchedule {
  onUpdateSchedule {
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
export const onDeleteSchedule = `subscription OnDeleteSchedule {
  onDeleteSchedule {
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
export const onCreateTrip = `subscription OnCreateTrip {
  onCreateTrip {
    id
    date
    schedule {
      id
      day
      time
    }
    passengers {
      items {
        id
        name
        seat
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
    schedule {
      id
      day
      time
    }
    passengers {
      items {
        id
        name
        seat
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
    schedule {
      id
      day
      time
    }
    passengers {
      items {
        id
        name
        seat
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
    }
    name
    seat
    stop {
      id
      name
      latitude
      longitude
      address
    }
  }
}
`;
export const onUpdatePassenger = `subscription OnUpdatePassenger {
  onUpdatePassenger {
    id
    trip {
      id
      date
    }
    name
    seat
    stop {
      id
      name
      latitude
      longitude
      address
    }
  }
}
`;
export const onDeletePassenger = `subscription OnDeletePassenger {
  onDeletePassenger {
    id
    trip {
      id
      date
    }
    name
    seat
    stop {
      id
      name
      latitude
      longitude
      address
    }
  }
}
`;
export const onCreateStop = `subscription OnCreateStop {
  onCreateStop {
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
export const onUpdateStop = `subscription OnUpdateStop {
  onUpdateStop {
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
export const onDeleteStop = `subscription OnDeleteStop {
  onDeleteStop {
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
